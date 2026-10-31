import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { fetchJson } from './utils'
import ShowList from './ShowList'
import SearchForm from './SearchForm'
import ShowDetail from './ShowDetail'
import Footer from './Footer'

function App() {
  const [query, setQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("Pokemon");
  const [shows, setShows] = useState([]);
  const [status, setStatus] = useState("loading");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    let ignore = false;
    async function fetchData() {
      setStatus("loading");
      try {
        const data = await fetchJson(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(searchTerm)}`);
        if (!ignore) {
          setShows(data.map(r => r.show).slice(0, 10));
          setStatus("success");
        }
      } catch (error) {
        if (!ignore) {
          if (error.status === 429) {
            setStatus("rate-limited");
          } else {
            setStatus("error");
          }
        }
      }
    }
    fetchData();
    return () => {
      ignore = true;
    };
  }, [searchTerm]);

  function handleSubmit(event) {
    event.preventDefault();
    if (query.trim() === "") {
      setFormError("Please enter a search term.");
      return;
    }
    setFormError("");
    setSearchTerm(query.trim());
  }
  
  let content;
  if (status === "loading") {
    content = <p className="status-message">Loading shows…</p>;
  } else if (status === "rate-limited") {
    content = (
      <p className="status-message">
        Too many requests to TVmaze. Please wait a few seconds and try again.
      </p>
    );
  } else if (status === "error") {
    content = (
      <p className="status-message">
        Couldn't reach TVmaze. Check your connection and try again.
      </p>
    );
  } else {
    content = <ShowList shows={shows} searchTerm={searchTerm} />;
  }

  return (
    <>
      <header>
        <h1>TV Shows</h1>
      </header>
      <Routes>
          <Route
            path="/"
            element={
              <>
                <SearchForm onSearch={handleSubmit} query={query} onQueryChange={setQuery} formError={formError} />
                {content}
              </>
            }
          />
          <Route path="/shows/:id" element={<ShowDetail />} />
          <Route
            path="*"
            element={
              <p className="status-message">
                Page not found. <Link to="/">Back to the gallery</Link>
              </p>
            }
          />
        </Routes>
      <Footer />
    </>
  )
}

export default App
