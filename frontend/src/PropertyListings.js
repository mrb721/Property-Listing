import React from "react";

function PropertyListings({ listings, isVisible, setIsVisible, onCardClick }) {
  const toggleVisibility = () => setIsVisible(prev => !prev);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Property Listings</h1>
      <button onClick={toggleVisibility} style={{ marginBottom: "10px" }}>
        {isVisible ? "Hide Listings" : "Show Listings"}
      </button>
      {isVisible && (
        <>
          {listings.length === 0 ? (
            <p>No listings available.</p>
          ) : (
            listings.map((listing, idx) => (
              <div
                key={listing?.id || idx}
                style={{
                  border: "1px solid #ccc",
                  marginBottom: "10px",
                  padding: "10px",
                  borderRadius: "5px",
                }}
                onClick={() => onCardClick(listing)}
              >
                <h2>{listing?.title || "No title"}</h2>
                <p>Price: ${listing?.price ?? "N/A"}</p>
                <p>Location: {listing?.location || "N/A"}</p>
                <p>{listing?.description || "No description"}</p>
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
}

export default PropertyListings;
