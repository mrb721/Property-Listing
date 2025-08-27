import { useState } from "react";
import axios from "axios";

function AddListingModal({ isOpen, onClose, onAddSuccess }) {
  const [form, setForm] = useState({
    title: "",
    price: "",
    location: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null; // don't render anything if modal is closed

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
        onAddSuccess(); // refresh listings
        onClose(); // close modal
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
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100%", height: "50%",
      backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center",
      zIndex: 1000
    }}>
      <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "8px", minWidth: "300px" }}>
        <h2>Add New Listing</h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
          <input name="price" placeholder="Price" value={form.price} onChange={handleChange} type="number" step="0.01" required />
          <input name="location" placeholder="Location" value={form.location} onChange={handleChange} required />
          <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="submit" disabled={loading}>{loading ? "Adding..." : "Add Listing"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddListingModal;
