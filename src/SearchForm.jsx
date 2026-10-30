function SearchForm({ onSearch, query, onQueryChange, formError }) {
    return (
        <>
            <form onSubmit={onSearch}>
                <input type="text" placeholder="Enter a search term..." value={query} onChange={(e) => onQueryChange(e.target.value)} />
                <button type="submit">Search</button>
            </form>
            {formError && <p className="form-error">{formError}</p>}
        </>
    )
}

export default SearchForm