import { useState } from "react";
import { FiUpload } from "react-icons/fi";

export default function AddListing() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);

  // Handle image upload & preview
  function handleImages(e) {
    const files = Array.from(e.target.files);
    const previews = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    setImages(prev => [...prev, ...previews]);
  }

  function publishListing() {
    const listing = {
      name,
      category,
      description,
      price,
      images
    };

    console.log("Publishing Listing:", listing);
    alert("Listing Published!");
  }

  return (
    <div className="main-area">
      <div className="header">
        <div>
          <h1>Create a New Listing</h1>
        </div>
      </div>

      <div className="form-card">
        {/* Product Name + Category */}
        <div className="form-row">
          <div className="form-group">
            <label>Product Name</label>
            <input
              type="text"
              placeholder="e.g. Reclaimed Oak Beams"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">Select a category</option>
              <option value="wood">Wood</option>
              <option value="metal">Metal</option>
              <option value="furniture">Furniture</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div className="form-group">
          <label>Detailed Description</label>
          <textarea
            placeholder="Describe the product’s condition, dimensions, and origin…"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        {/* Price */}
        <div className="form-group small">
          <label>Price</label>
          <input
            type="number"
            placeholder="$ 0.00"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        {/* Upload Photos */}
        <div className="form-group">
          <label>Product Photos</label>

          <label className="upload-box">
            <FiUpload className="upload-icon" />
            <div>Click to upload or drag and drop</div>
            <small>PNG, JPG, SVG (max 800x400px)</small>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImages}
              hidden
            />
          </label>

          {/* Preview images */}
          <div className="preview-row">
            {images.map((img, index) => (
              <img key={index} src={img.preview} alt="" className="preview-img" />
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="buttons-row">
          <button className="btn-secondary">Save as Draft</button>
          <button className="btn-primary" onClick={publishListing}>
            Publish Listing
          </button>
        </div>
      </div>
    </div>
  );
}
