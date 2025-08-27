import { useState, useEffect } from "react";
import axios from "axios";

function ListingSummaryModal({ listing, onClose }) {
  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!listing || !listing.id) return;

    const fetchSummary = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.post(`http://localhost:9000/listings/${listing.id}/summary`, 
        {},
        {
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            }
          });
        setSummary(res?.data?.summary || []);
      } catch (err) {
        console.error("Failed to generate summary:", err);
        setError("Failed to generate summary. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [listing]);

  if (!listing) return null;

  return (
    <div style={{
      position: "fixed",
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "8px",
        width: "400px",
        maxHeight: "80vh",
        overflowY: "auto",
        boxShadow: "0px 0px 10px rgba(0,0,0,0.3)"
      }}>
        <h2>{listing.title} - Summary</h2>
        <button 
          onClick={onClose} 
          style={{ float: "right", marginTop: "-40px", fontSize: "18px", cursor: "pointer" }}
        >
          ✖
        </button>

        {loading && <p>Generating summary...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loading && !error && summary.length > 0 && (
          <ul>
            {summary.map((bullet, idx) => (
              <li key={idx}>{bullet}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ListingSummaryModal;
