export default function Header({ setSearchQuery }) {
  return (
    <div className="header">
      <div>
        <h1>Dashboard</h1>
        <p className="subtitle">Overview of your marketplace</p>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search listings…"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );
}
