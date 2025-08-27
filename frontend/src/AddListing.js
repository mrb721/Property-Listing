import axios from "axios";
import { useState } from "react";

function AddListing({ onAddSuccess }) {
  const [form, setForm] = useState({
    title: "",
    price: "",
    location: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:9000/listings", form);
      if (res.data.Status) {
        setForm({ title: "", price: "", location: "", description: "" });
        if (onAddSuccess) onAddSuccess(); // Refresh list in parent
      } else {
        console.error("Failed to create listing");
      }
    } catch (err) {
      console.error("Error adding listing:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add New Listing</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", maxWidth: "400px" }}>
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
        <input name="price" placeholder="Price" value={form.price} onChange={handleChange} type="number" step="0.01" required />
        <input name="location" placeholder="Location" value={form.location} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
        <button type="submit" disabled={loading} style={{ marginTop: "10px" }}>
          {loading ? "Adding..." : "Add Listing"}
        </button>
      </form>
    </div>
  );
}

export default AddListing;
