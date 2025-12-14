const STORAGE_KEY = 'waste_to_value_listings';
const ACTIVITY_KEY = 'waste_to_value_activities';

function nowISO() {
  return new Date().toISOString();
}

function loadListings() {
  try {
    const items = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    return items;
  } catch {
    return [];
  }
}

function saveListings(listings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(listings));
}

function ensureSeeded() {
  const existing = loadListings();
  if (!existing || existing.length === 0) {
    const seed = [
      { id: 1, name: 'Reclaimed Oak Beams', category: 'Wood', price: 250, status: 'active', description: 'Beautiful reclaimed beams', created_at: nowISO(), images: [] },
      { id: 2, name: 'Vintage Camera', category: 'Electronics', price: 120, status: 'active', description: 'Classic film camera', created_at: nowISO(), images: [] },
    ];
    saveListings(seed);
    localStorage.setItem(ACTIVITY_KEY, JSON.stringify([
      { id: 1, title: 'Seed data created', created_at: nowISO() }
    ]));
  }
}

ensureSeeded();

export const apiService = {
  async getListings() {
    await new Promise(r => setTimeout(r, 50));
    return loadListings();
  },

  async getListing(id) {
    await new Promise(r => setTimeout(r, 20));
    const listings = loadListings();
    return listings.find(l => String(l.id) === String(id)) || null;
  },

  async createListing(listingData) {
    await new Promise(r => setTimeout(r, 20));
    const listings = loadListings();
    const id = listings.length ? Math.max(...listings.map(l => l.id)) + 1 : 1;
    const newListing = {
      id,
      name: listingData.name || 'Untitled',
      category: listingData.category || '',
      description: listingData.description || '',
      price: Number(listingData.price) || 0,
      status: 'active',
      created_at: nowISO(),
      images: listingData.images || [],
    };
    listings.push(newListing);
    saveListings(listings);
    return newListing;
  },

  async updateListing(id, updatedData) {
    await new Promise(r => setTimeout(r, 20));
    const listings = loadListings();
    const idx = listings.findIndex(l => String(l.id) === String(id));
    if (idx === -1) return null;
    listings[idx] = { ...listings[idx], ...updatedData };
    saveListings(listings);
    return listings[idx];
  },

  async deleteListing(id) {
    await new Promise(r => setTimeout(r, 20));
    let listings = loadListings();
    listings = listings.filter(l => String(l.id) !== String(id));
    saveListings(listings);
    return true;
  },

  async getActivities() {
    await new Promise(r => setTimeout(r, 30));
    try {
      const items = JSON.parse(localStorage.getItem(ACTIVITY_KEY)) || [];
      return items;
    } catch {
      return [];
    }
  }
};
