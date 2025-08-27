import axios from "axios";

function DataActions({ onRefresh }) {

  const handlePopulate = async () => {
    try {
      await axios.post("http://localhost:9000/populate");
      onRefresh(); // refresh listings after seeding
    } catch (err) {
      console.error("Failed to populate database with test data:", err);
    }
  };

  const handleClear = async () => {
    try {
      await axios.post("http://localhost:9000/clear");
      onRefresh(); // refresh listings after clearing
    } catch (err) {
      console.error("Failed to clear database:", err);
    }
  };

  return (
    <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <button onClick={handlePopulate}>Populate With Test Data</button>
        <button onClick={handleClear}>Clear Entries</button>
    </div>
  );
}

export default DataActions;
