import { useState } from 'react'

import SearchBar from '../components/SearchBar'
import DisplayContent from '../components/DisplayContent'
import '../styles/home.css'

const Home = () => {
     const [searchResult, setSearchResult] = useState({})


    return (
        <div className="home">
            <div className="main">
                <div className="search">
                    <h1>Search for Something</h1>
                    <SearchBar setSearchResult={setSearchResult}/>
                </div>
                <div>
                    <div className="content-box">
                        {searchResult && <DisplayContent searchResult={searchResult}/>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home