import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import * as utils from './utils';
import CastList from './CastList';

function ShowDetail() {
    const { id } = useParams();

    const [show, setShow] = useState(null);
    const [status, setStatus] = useState("loading");
    const [cast, setCast] = useState([]);
    const [castStatus, setCastStatus] = useState("loading");

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    useEffect(() => {
        let ignore = false;

        async function loadShow() {
            setStatus("loading");
            setCastStatus("loading");

            try {
                const data = await utils.fetchJson(`https://api.tvmaze.com/shows/${id}`);
                if (ignore) return;
                setShow(data);
                setStatus("success");
            } catch (error) {
                if (!ignore) {
                    if (error.status === 404) {
                        setStatus("not-found");
                    } else if (error.status === 429) {
                        setStatus("rate-limited");
                    } else {
                        setStatus("error");
                    }
                }
                return;
            }

            try {
                const castData = await utils.fetchJson(`https://api.tvmaze.com/shows/${id}/cast`);
                if (!ignore) {
                    setCast(castData);
                    setCastStatus("success");
                }
            } catch (error) {
                if (!ignore) {
                    setCastStatus(error.status === 429 ? "rate-limited" : "error");
                }
            }
        }
        loadShow();
        return () => {
            ignore = true;
        };
    }, [id]);
    
    let content;
    if (status === "loading") {
        content = <p className="status-message">Loading show…</p>;
    } else if (status === "not-found") {
        content = (
            <p className="status-message">
                We couldn't find a show with the ID "{id}". The link may be wrong or the show may have been removed.
            </p>
        );
    } else if (status === "rate-limited") {
        content = (
            <p className="status-message">
                Too many requests to TVmaze. Please wait a few seconds and refresh the page.
            </p>
        );
    } else if (status === "error") {
        content = (
            <p className="status-message">
                Couldn't reach TVmaze. Check your connection and refresh the page.
            </p>
        );
    } else {
        const showSummary = utils.stripHtmlTags(show.summary);
        const premiereDate = utils.formatDate(show.premiered);
        const updatedDate = utils.formatDateTime(show.updated);
        const genreText = show.genres.length > 0 ? show.genres.join(", ") : "Not Available";
        const ratingText = show.rating?.average ?? "Not Available";
        const showStatus = show.status || "Not Available";
        const channel = utils.getChannel(show);

        let castContent;
        if (castStatus === "loading") {
            castContent = <p>Loading cast…</p>;
        } else if (castStatus === "rate-limited") {
            castContent = <p>Cast temporarily unavailable</p>;
        } else if (castStatus === "error") {
            castContent = <p>Cast not available</p>;
        } else {
            castContent = <CastList cast={cast} limit={15} />;
        }

        content = (
            <article className="show-detail">
                {show.image ? (
                    <img src={show.image.original || show.image.medium} alt={`${show.name} Poster`} />
                ) : (
                    <div className="no-image">No Image Available</div>
                )}
                <div className="show-detail-info">
                    <h2>{show.name}</h2>
                    <p className="summary">{showSummary}</p>
                    <p>Status: {showStatus}</p>
                    <p>Network / Streaming: {channel}</p>
                    <p>Premiere Date: {premiereDate}</p>
                    <p>Updated Date: {updatedDate}</p>
                    <p>Genres: {genreText}</p>
                    <p>Rating: {ratingText}</p>
                    <h3>Cast</h3>
                    {castContent}
                    {show.url ? (
                        <p>More Info: <a href={show.url} target="_blank" rel="noopener noreferrer">View {show.name} on TVmaze</a></p>
                    ) : (
                        <p>TVmaze page not available</p>
                    )}
                </div>
            </article>
        );
    }

    return (
        <section className="show-detail-page">
            <Link to="/" className="back-link">← Back to gallery</Link>
            {content}
        </section>
    ); 
}

export default ShowDetail;