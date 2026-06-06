function SearchFilterBar({
  search,
  setSearch,
  gender,
  setGender,
  sortName,
  setSortName,
  sortAge,
  setSortAge
}) {
  return (
    <div className="filter-container">
      <input
        type="text"
        placeholder="Search by name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      <select
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        className="filter-select"
      >
        <option value="">All Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>

      <select
        value={sortName}
        onChange={(e) => setSortName(e.target.value)}
        className="filter-select"
      >
        <option value="">Sort Name</option>
        <option value="asc">A-Z</option>
        <option value="desc">Z-A</option>
      </select>

      <select
        value={sortAge}
        onChange={(e) => setSortAge(e.target.value)}
        className="filter-select"
      >
        <option value="">Sort Age</option>
        <option value="low">Low to High</option>
        <option value="high">High to Low</option>
      </select>
    </div>
  );
}

export default SearchFilterBar;
