const API_BASE = 'http://localhost:8000/api';

export const apiService = {
  // Get all listings
  async getListings() {
    try {
      const response = await fetch(`${API_BASE}/listings/`);
      return await response.json();
    } catch (error) {
      console.error("Failed to fetch listings:", error);
      return [];
    }
  },

  // Get a single listing
  async getListing(id) {
    try {
      const response = await fetch(`${API_BASE}/listings/${id}/`);
      if (!response.ok) throw new Error('Listing not found');
      return await response.json();
    } catch (error) {
      console.error("Failed to fetch product:", error);
      return null;
    }
  },

  // Create new listing (with FormData for images)
  async createListing(listingData) {
    try {
      const formData = new FormData();
      Object.keys(listingData).forEach(key => {
        if (key === "images") {
          listingData.images.forEach(img => formData.append("images", img.file));
        } else {
          formData.append(key, listingData[key]);
        }
      });

      const response = await fetch(`${API_BASE}/listings/`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to create listing');
      return await response.json();
    } catch (error) {
      console.error("Failed to create listing:", error);
      return null;
    }
  },

  // Update listing
  async updateListing(id, updatedData) {
    try {
      const formData = new FormData();
      Object.keys(updatedData).forEach(key => {
        if (key === "images") {
          updatedData.images.forEach(img => formData.append("images", img.file));
        } else {
          formData.append(key, updatedData[key]);
        }
      });

      const response = await fetch(`${API_BASE}/listings/${id}/`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to update listing');
      return await response.json();
    } catch (error) {
      console.error("Failed to update listing:", error);
      return null;
    }
  },

  // Delete listing
  async deleteListing(id) {
    try {
      await fetch(`${API_BASE}/listings/${id}/`, { method: 'DELETE' });
    } catch (error) {
      console.error("Failed to delete listing:", error);
    }
  },

  // Get all activities
  async getActivities() {
    try {
      const response = await fetch(`${API_BASE}/activities/`);
      return await response.json();
    } catch (error) {
      console.error("Failed to fetch activities:", error);
      return [];
    }
  },
};
