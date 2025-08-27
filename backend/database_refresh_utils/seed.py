from database_utils import view_all
from writes.listings import create_listing

# Sample listings to seed
test_listings = [
    {"title": "Cozy Apartment", "price": 1200.0, "location": "New York", "description": "A cozy 1BR apartment"},
    {"title": "Beach House", "price": 3500.0, "location": "Miami", "description": "Oceanfront property with 3 bedrooms"},
    {"title": "Mountain Cabin", "price": 900.0, "location": "Denver", "description": "Rustic cabin near ski resorts"},
]

def seed_database():   
    for listing in test_listings:
        create_listing(listing)
    print(f"Added {len(test_listings)} test listings")
 
