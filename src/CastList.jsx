function CastList({ cast, limit = 15 }) {
    if (!cast || cast.length === 0) {
        return <p>Not Available</p>;
    }
    const limitedCast = limit ? cast.slice(0, limit) : cast;
    return (
        <ul className="cast-list">
            {limitedCast.map((castMember, index) => (
                <li key={`${castMember.person.id}-${castMember.character.id}`}>
                    {castMember.person.name} as {castMember.character.name}
                </li>
            ))}
        </ul>
    );
}

export default CastList;