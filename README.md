# CSC 372 Assignment 5: TV Show Gallery (but with React)

This is a TV show gallery app using React, Vitem and React Router, using data from [TVmaze API](https://www.tvmaze.com/api).  This is heavily based on [Assignment 4](https://github.com/tutruong8/CSC372-Assignment4), which is basically this assignment, but vanilla javascript instead.

- **Gallery('/'):** Searches TVmaze and shows up to 10 matching shows as cards based on the keyword you typed. Each card displays the name, summary without html elements, premire and updated date, the time it was updated, genre, rating, a poster of the show, and 5 cast members (loaded with its own request), and a link to the show on TVmaze itself. On the first load, it will display results from a default search term (I chose Pokemon).
- **Detail Page('/shows/:id'):** Accessible if you click the name of a show in one of the cards in Gallery. It shows everything including the status of the show along with the network or streaming channel it's on. 15 cast members are also displayed.
- Any missing data is displayed as Not Available
- Errors for loading, an empty search, failed request, rate limiting, and invalid IDs get their own messages

## How to run?

[Node.js](https://nodejs.org/) is required for this app to run. Within the project folder run the following command in a terminal:

```bash
npm install
npm run dev
```

There should be a local address that Vite prints (usually http://localhost:5173). Open it in your browser.

## Required React Concepts

| # | Concept | Where it appears |
|---|---|---|
| 1 | **Components and props** | One component per file: `App.jsx`, `SearchForm.jsx`, `ShowList.jsx`, `ShowCard.jsx`, `CastList.jsx`, `ShowDetail.jsx`, `Footer.jsx`. Props are destructured in each, e.g. `ShowCard({ show })`, `CastList({ cast, limit })`, `ShowList({ shows, searchTerm })`. |
| 2 | **Lists and keys** | `ShowList.jsx` maps shows to cards with `key={show.id}`. `CastList.jsx` maps cast members with a key built from the ID of a person and character (one actor can play 1+ character). |
| 3 | **Conditional rendering** | `App.jsx`: loading, rate-limited, error, and results. `SearchForm.jsx`: empty search message. `ShowList.jsx`: no results message. `ShowCard.jsx` and `ShowDetail.jsx`: poster vs. "No Image Available", and loading/error states for the cast. `ShowDetail.jsx`: show not found. |
| 4 | **Controlled form** | `SearchForm.jsx`: the input uses `value` and `onChange`, and the form uses `onSubmit`. `App.jsx`: `handleSubmit` calls `preventDefault()` and validates the input. |
| 5 | **State** | `App.jsx`: `useState` for the query (`query`), the submitted search term (`searchTerm`), the results (`shows`) and the request status (`status`). `ShowCard.jsx` and `ShowDetail.jsx` keep their own state for cast and loading status. |
| 6 | **Effects and fetch** | `App.jsx`: `useEffect` on `[searchTerm]` runs the default search and every new search. `ShowCard.jsx`: each card's `useEffect` on `[show.id]` fetches that show's cast. `ShowDetail.jsx`: `useEffect` on `[id]` fetches the show and its cast. `utils.js`: `fetchJson` checks `res.ok` (and 429) before calling `res.json()`. |
| 7 | **Lifted state** | `App.jsx` owns the search state and passes it down. `SearchForm.jsx` renders the input but gets its value and handlers as props. `ShowList.jsx` displays the number of results and the current search term, even though it is not the component that owns the input. |
| 8 | **Routing** | `main.jsx`: `BrowserRouter`. `App.jsx`: `Routes` for `/`, `/shows/:id`, and a catch-all `*` page. `ShowCard.jsx`: `Link` from each show name to its detail page. `ShowDetail.jsx`: `useParams` reads the ID, and a `Link` returns to the gallery. |
 
Helper functions (HTML stripping, date formatting, channel fallback, fetching) are in `utils.js`.

# Reflection
I think what made this easier than Javascript was that I didn't have to use createElement, appendChild, and other DOM manipulation concepts. What was harder was memorizing JSX syntax rules, such as putting const and if inside JSX. I also had to keep in mind of imports too because one time I forgot a import and it landed me a blank page. I also had some difficulty on understanding useState and useEffect. App holds query, searchTerm, shows, and status because both components SearchForm and ShowList needs them. Keeping them above the routes makes it so that going to a details page and then going back doesn't reset the search. Each ShowCard keeps its own cast so that one failed request doesn't affect the other cards in any other way. Lastly, SHowDetail gets the show from the URL ID instead of the gallery so that refreshing works. Overall, I do think there's still some points I need to consistently practice on to get a full understanding without the need for official documents, but seeing everything working together in action allows me to grasp how things work and gives me a project I can look back to review on.

# AI Assistance
I used Claude to tutor me on how useState and useEffect works and to guide me on what parts of Assignment 4 would I use for react components. I also used it to review my code to detect any bugs and syntax errors I made (which I made frequently). I also used VSCode's inline tool to reduce typing similar code over and over again. Any fixes they suggested was reviewed, tested, and edited accordingly by me. I also used it to help style my CSS, which I reviewed, tested, and edited to fit what I wanted.

# Credits
Show data is provided by [TVmaze](https://www.tvmaze.com/) under the [CC BY-SA license](https://www.tvmaze.com/api#licensing). The app includes this attribution in its footer.
