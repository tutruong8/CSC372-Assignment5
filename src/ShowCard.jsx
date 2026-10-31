import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as utils from './utils';
import CastList from './CastList';

function ShowCard({ show }) {
    const [cast, setCast] = useState([]);
    const [castStatus, setCastStatus] = useState("loading");

     useEffect(() => {
        let ignore = false;
        async function fetchCast() {
            setCastStatus("loading");
            try {
                const data = await utils.fetchJson(`https://api.tvmaze.com/shows/${show.id}/cast`);
                if (!ignore) {
                    setCast(data);
                    setCastStatus("success");
                }
            } catch (error) {
                if (!ignore) {
                    if (error.status === 429) {
                        setCastStatus("rate-limited");
                    } else {
                        setCastStatus("error");
                    }
                }
            }
        }
        fetchCast();
        return () => {
            ignore = true;
        };
    }, [show.id]);
    
    const showSummary = utils.stripHtmlTags(show.summary);
    const premiereDate = utils.formatDate(show.premiered);
    const updatedDate = utils.formatDateTime(show.updated);
    const genreText = show.genres.length > 0 ? show.genres.join(", ") : "Not Available";
    const ratingText = show.rating?.average ?? "Not Available";
    
    let castContent;
    if (castStatus === "loading") {
        castContent = <p>Loading cast…</p>;
    } else if (castStatus === "rate-limited") {
        castContent = <p>Cast temporarily unavailable</p>;
    } else if (castStatus === "error") {
        castContent = <p>Cast not available</p>;
    } else {
        castContent = <CastList cast={cast} limit={5} />;
    }

    return (
        <article className="show-card">
            <h2>
                <Link to={`/shows/${show.id}`}>{show.name}</Link>
            </h2>
            {show.image ? (
                <img src={show.image.medium} alt={`${show.name} Poster`} />
            ) : (
                <div className="no-image">No Image Available</div>
            )}
            <p>{showSummary}</p>
            <p>Premiere Date: {premiereDate}</p>
            <p>Updated Date: {updatedDate}</p>
            <p>Genres: {genreText}</p>
            <p>Rating: {ratingText}</p>
            <h3>Cast:</h3>
            {castContent}
            {show.url ? (
                <p className="more-info">More Info: <a href={show.url} target="_blank" rel="noopener noreferrer">View {show.name} on TVmaze</a></p>
            ) : (
                <p className="more-info">TVmaze page not available</p>
            )}
        </article>
    );
}

export default ShowCard;