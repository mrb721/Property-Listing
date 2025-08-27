import { useState } from "react";
import axios from "axios";

function GenerateListingSummary({ listingId }) {
  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSummary = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`http://localhost:9000/listings/${listingId}/summary`);
      setSummary(res.data.summary);
    } catch (err) {
      console.error("Failed to generate summary:", err);
      setSummary(["Error generating summary"]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={fetchSummary} disabled={loading}>
        {loading ? "Generating Summary..." : "Generate Summary"}
      </button>
      {summary.length > 0 && (
        <ul>
          {summary.map((bullet, i) => <li key={i}>{bullet}</li>)}
        </ul>
      )}
    </div>
  );
}

export default GenerateListingSummary;
