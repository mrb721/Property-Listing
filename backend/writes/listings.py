from models.PropertyListing import PropertyListing
from database_utils import *

def create_listing(listing_info: dict | PropertyListing) -> bool:
    if not listing_info: return False
    new_listing = listing_info if isinstance(listing_info, PropertyListing) else PropertyListing(**listing_info)
    try: 
        insert_listing(new_listing)
        return True
    except Exception as e:
        print(f"Failed to create new listing: {e}") 
        return False         

def remove_listing(listing_id: int) -> bool:
    try: 
        delete(listing_id)
        return True
    except Exception as e:
        print(f"Failed to remove listing: {e}") 
        return False        

def update_listing(update_listing: dict | PropertyListing) -> bool:
    try: 
        update(update_listing)
        return True
    except Exception as e:
        print(f"Failed to update listing: {e}") 
        return False        

