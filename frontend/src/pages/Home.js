import SearchBar from '../components/SearchBar'
import '../styles/home.css'

const Home = () => {
    return (
        <div className="home">
            <div className="main">
                <div className="search">
                    <h1>Search for Something</h1>
                    <SearchBar />
                </div>
                <div>
                    <div className="content-box">
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home