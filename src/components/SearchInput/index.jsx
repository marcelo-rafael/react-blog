import './styles.css';
export function SearchInput({ searchValue, handleChange }) {
  return (
    <input
      className="search-input"
      type="search"
      onChange={handleChange}
      value={searchValue}
      placeholder="Type your search"
    />
  )
}