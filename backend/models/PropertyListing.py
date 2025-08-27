class PropertyListing:
    def __init__(self, title: str, price: float, location: str, description: str) -> None:
        self.title = title
        self.price = price
        self.location = location
        self.description = description
        self.id = None
    
    # def set_listing_id(self, id: int) -> bool:
    #     if self.id is not None: return False
    #     self.id = id
    #     return True
    
    def update(self, field: str, newVal: object) -> bool:
        if field.lower() == 'id':
            return False
        elif field.lower() == 'price':
            try:
                self.price = float(newVal)
                return True
            except ValueError:
                return False
        elif field.lower() in {"title", "location", "description"}:
            if not isinstance(newVal, str):
                return False
            setattr(self, field.lower(), newVal)
            return True
        
        return False

    def to_dict(self) -> dict[str, object]:
        return {
            'id': self.id,
            'title': self.title,
            'price': self.price,
            'location': self.location,
            'description': self.description
        }

    