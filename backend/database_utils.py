import sqlite3
from models.PropertyListing import PropertyListing

DATABASE = "property_listings.db"

def handle_db_connection(func):
    def wrapper(*args, **kwargs):
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()
        try:
            result = func(cursor, *args, **kwargs)
            conn.commit()
            return result
        except Exception as e:
            raise RuntimeError(f"Error in {func.__name__}: {e}")
        finally:
            conn.close()
    return wrapper

@handle_db_connection
def create_table(cursor: sqlite3.Cursor) -> None:
    cursor.execute(''' CREATE TABLE IF NOT EXISTS property_listings(
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        title TEXT NOT NULL,
                        price FLOAT NOT NULL,
                        location TEXT NOT NULL,
                        description TEXT NOT NULL) ''')
    
        
@handle_db_connection
def insert_listing(cursor: sqlite3.Cursor, new_listing: PropertyListing) -> int:
    cursor.execute(''' INSERT INTO property_listings (title, price, location, description) VALUES (?, ?, ?, ?) ''', 
                  ( new_listing.title, 
                   new_listing.price, 
                   new_listing.location, 
                   new_listing.description))
    new_listing.id = cursor.lastrowid
    return new_listing.id

@handle_db_connection  
def delete(cursor: sqlite3.Cursor, property_listing_id: int) -> None:
    cursor.execute(""" DELETE FROM property_listings WHERE id = ?""", (property_listing_id,))
    return

@handle_db_connection  
def update(cursor: sqlite3.Cursor, property_listing: PropertyListing) -> None:
    cursor.execute("""
        UPDATE property_listings
        SET title = ?, price = ?, location = ?, description = ?
        WHERE id = ?
    """, (property_listing.title, 
          property_listing.price, 
          property_listing.location, 
          property_listing.description, 
          property_listing.id))
    return

@handle_db_connection
def query_rows_by_id(cursor: sqlite3.Cursor, id: int) -> dict | None:
    cursor.execute('SELECT * FROM property_listings WHERE id = ? LIMIT 1', (id,))
    row = cursor.fetchone()
    if row is None:
        return None
    return dict(id=row[0], title=row[1], price=row[2], location=row[3], description=row[4])


@handle_db_connection
def query_rows_by_title(cursor: sqlite3.Cursor, search_string: str) -> list[dict]:
    search_term = f"%{search_string}%"

    cursor.execute(''' SELECT * FROM property_listings WHERE  title LIKE ? ''', (search_term,))
    rows = cursor.fetchall()
    return [dict(id=row[0], title=row[1], price=row[2], location=row[3], description=row[4]) for row in rows]

@handle_db_connection
def view_all(cursor: sqlite3.Cursor) -> list[dict]:
    cursor.execute(''' SELECT * FROM property_listings ORDER BY ID DESC ''')
    rows = cursor.fetchall()
    return [dict(id=row[0], title=row[1], price=row[2], location=row[3], description=row[4]) for row in rows]

@handle_db_connection
def clear_db(cursor: sqlite3.Cursor) -> None:
    cursor.execute(''' DELETE FROM property_listings ''')
    return
