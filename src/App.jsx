import { useState } from 'react'
import ShowList from './ShowList'
import {sample1, sample2, sample3} from './sampleData'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ShowList shows={[sample1, sample2, sample3]} searchTerm="girls" />
      <Footer />
    </>
  )
}

function Footer() {
  return (
    <footer>
      <p>
        Show data provided by <a href="https://www.tvmaze.com/" target="_blank" rel="noopener noreferrer">TVmaze</a> under the <a href="https://www.tvmaze.com/api#licensing" target="_blank" rel="noopener noreferrer">TVmaze API licensing terms</a>.
      </p>
    </footer>
  )
}

export default App
