from models.PropertyListing import PropertyListing

def row_to_listing(row: dict) -> PropertyListing:
    listing = PropertyListing(
        title=row["title"],
        price=row["price"],
        location=row["location"],
        description=row["description"]
    )
    listing.id = row["id"]
    return listing