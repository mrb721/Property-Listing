import uvicorn
from openai import OpenAI
from fastapi.responses import JSONResponse
from fastapi import FastAPI, HTTPException, Body, Query, Path
from fastapi.middleware.cors import CORSMiddleware
from reads import retrieve_all_listings, retrieve_listing_by_id, retrieve_listing_by_title
from writes import create_listing
from database_utils import create_table
from database_refresh_utils import seed_database, clear_database
from dotenv import load_dotenv
import os


load_dotenv(override=True)
app = FastAPI()

# init table
create_table()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.get("/")
def root():
    listings = retrieve_all_listings()
    return {"listings": listings}

@app.post("/populate")
def populate():
    try:
        seed_database()
        return JSONResponse({"status": "success", "message": "Database populated"})
    except Exception as e:
        return JSONResponse({"status": "error", "message": str(e)}, status_code=500)

@app.post("/clear")
def clear():
    try:
        clear_database()
        return JSONResponse({"status": "success", "message": "Database cleared"})
    except Exception as e:
        return JSONResponse({"status": "error", "message": str(e)}, status_code=500)

@app.get("/search")
def search_listings(search_string: str = Query(..., min_length=1)):
    try:
        results = retrieve_listing_by_title(search_string)
        return {"listings": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@app.get("/listings")
def display_listings():
    listings = retrieve_all_listings()
    return {"listings": listings}

@app.get("/listings/{listing_id}")
def get_listing(listing_id: int):
    listing = retrieve_listing_by_id(listing_id)
    # if not listing:
    #     raise HTTPException(status_code=404, detail="Listing not found")
    return {"listing": listing} if listing else {"listing": ["Listing ID not found!"]}

@app.post('/listings')
def add_listing(newListing: dict = Body(...)):
    try:
        if "price" in newListing:
            newListing["price"] = float(newListing["price"])
        create_status = create_listing(newListing)
        print("Received new listing:", newListing)
    except Exception as e:
        print(f"Failed to create listing: {e}")
        raise HTTPException(status_code=417, detail="Failed to create listing")

    return {'Status': create_status}

@app.post("/listings/{listing_id}/summary")
def generate_listing_summary(listing_id: int = Path(..., description="ID of the listing to summarize")):
    listing = retrieve_listing_by_id(listing_id)
    if not listing:
        raise HTTPException(status_code=404, detail="Listing not found")

    prompt = (
        f"Create a 3-bullet summary for this property listing:\n"
        f"Title: {listing.title}\n"
        f"Price: ${listing.price}\n"
        f"Location: {listing.location}\n"
        f"Description: {listing.description}\n"
    )
    
    try:
        # client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


        response = client.chat.completions.create(
            model="gpt-3.5-turbo", 
            messages=[
                {"role": "system", "content": "You are a helpful property listing assistant."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=100
            )
        summary_text = response.choices[0].message.content.strip()
        bullets = [line.strip() for line in summary_text.split("\n") if line.strip()]
        return {"summary": bullets}

    except Exception as e:
        # --- Log the actual error in FastAPI console ---
        print("OpenAI request failed:", e)
        raise HTTPException(status_code=500, detail=f"OpenAI error: {e}")
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=9000, reload=True)
