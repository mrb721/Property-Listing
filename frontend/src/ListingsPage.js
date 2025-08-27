import { useState, useEffect } from "react";
import axios from "axios";
import PropertyListings from "./PropertyListings";
import AddListingModal from "./AddListingModal";
import DataActions from "./DataActions"
import SearchListings from "./SearchListings";
import ListingSummaryModal from "./ListingSummaryModal";

function ListingsPage() {
  const [listings, setListings] = useState([]);
  const [showListings, setShowListings] = useState(true);
  const [selectedListing, setSelectedListing] = useState(null);
  const [isListingModalOpen, setIsListingModalOpen] = useState(false);
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);


  const fetchListings = async () => {
    try {
      const res = await axios.get("http://localhost:9000/");
      const data = res.data.listings || [];
      setListings(data.filter(item => item));
      setShowListings(true);
    } catch (err) {
      console.error("Failed to fetch listings:", err);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const handleRefresh = async () => {
    await fetchListings();
    setShowListings(true);
  };

  const handleSearchResults = (results) => {
    if (results === null) {
      fetchListings(); // reset to all listings
    } else {
      setListings(results);
    }
  };

  const handleOpenSummaryModal = (listing) => {
    setSelectedListing(listing);
    setIsSummaryModalOpen(true);
  };

  const closeSummaryModal = () => {
    setSelectedListing(null);
    setIsSummaryModalOpen(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Property Listings App</h1>    
      <SearchListings onSearchResults={handleSearchResults} />
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <button onClick={() => setIsListingModalOpen(true)}>Add Listing</button>
        <DataActions onRefresh={handleRefresh} />
      </div>
      <AddListingModal 
        isOpen={isListingModalOpen} 
        onClose={() => setIsListingModalOpen(false)} 
        onAddSuccess={handleRefresh} 
        />
      <PropertyListings 
        listings={listings} 
        isVisible={showListings} 
        setIsVisible={setShowListings}
        onCardClick={handleOpenSummaryModal} 
        />

    {selectedListing && (
        <ListingSummaryModal 
            listing={selectedListing} 
            onClose={closeSummaryModal} 
        />
        )}
    </div>
  );
}

export default ListingsPage;
