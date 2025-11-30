export default function ListingsTable({ searchQuery }) {

  const listings = [
    { name: "Antique Wooden Chair", price: "$120", status: "Active" },
    { name: "Vintage Oak Planks", price: "$80", status: "Active" },
    { name: "Reclaimed Metal Pipes", price: "$60", status: "Sold" },
  ];

  // STEP 3 — apply search filter
  const filtered = listings.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="listings">
      <h2>Latest Listings</h2>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((item, i) => (
            <tr key={i}>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}
