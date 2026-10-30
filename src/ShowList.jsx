import ShowCard from './ShowCard'

function ShowList({ shows, searchTerm }) {
    if (!shows || shows.length === 0) {
        return <p>No shows found for {searchTerm}</p>;
    }
    return  (
        <section className="show-list-container">
            <h2>{shows.length} Results for "{searchTerm}"</h2>
            <ul className="show-list">
                {shows.map((show) => (
                    <li key={show.id}>
                        <ShowCard show={show}/>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default ShowList;