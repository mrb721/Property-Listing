from typing import Optional
from models.PropertyListing import PropertyListing
from database_utils import *
from utils.utils import row_to_listing
import json

def search_listing_by_title(title: str) -> list[PropertyListing]:
    try: 
        results = query_rows_by_title(f"%{title}%")
        return [row_to_listing(result) for result in results]
    except Exception as e:
        print(f"Failed to retrieve results: {e}") 
        return []
    
def retrieve_listing_by_id(id: int) -> Optional[PropertyListing]:
    listing_info = query_rows_by_id(id)
    if not listing_info: 
        return None
    return row_to_listing(listing_info)

def retrieve_listing_by_title(search_string: str) -> list[PropertyListing]:
    rows = query_rows_by_title(search_string.lower())
    return [row_to_listing(row) for row in rows]
    

def retrieve_all_listings() -> list[PropertyListing]:
    try: 
        results = view_all()
        return [row_to_listing(result) for result in results]
    except Exception as e:
        print(f"Failed to retrieve listings: {e}") 
        return []


