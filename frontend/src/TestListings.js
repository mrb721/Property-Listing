import axios from "axios";

const testListings = [
  {
    title: "Cozy Studio Apartment",
    price: 1200,
    location: "Downtown",
    description: "Perfect for students or professionals!"
  },
  {
    title: "Spacious 2-Bedroom Condo",
    price: 2200,
    location: "Midtown",
    description: "Modern amenities, great view."
  },
  {
    title: "Charming Cottage",
    price: 1500,
    location: "Suburbs",
    description: "Quiet neighborhood with garden."
  },
  {
    title: "Luxury Penthouse",
    price: 4500,
    location: "City Center",
    description: "Top-floor with skyline views."
  },
  {
    title: "Budget Room",
    price: 800,
    location: "Near University",
    description: "Affordable and cozy for students."
  }
];

function TestListings() {
  const addTestListings = () => {
    testListings.forEach(listing => {
      axios.post("http://localhost:9000/listings", listing)
        .then(res => console.log(`Added: ${listing.title}`))
        .catch(err => console.error(err));
    });
  };

  return (
    <div>
      <h2>Add Test Listings</h2>
      <button onClick={addTestListings}>Populate Test Listings</button>
    </div>
  );
}

export default TestListings;
