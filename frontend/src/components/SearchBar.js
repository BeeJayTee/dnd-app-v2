// hooks
import { useEffect, useState } from 'react'

// components
import QueryList from '../components/QueryList'
import SearchList from '../components/SearchList'

const SearchBar = () => {
    // category is what the user selects as the main category filter
    const [category, setCategory] = useState('spells')
    // set categoryItems
    const [categoryItems, setCategoryItems] = useState([])
    // this is what the user types into the search bar
    const [search, setSearch] = useState('')

    useEffect(  () => {
        const getCategoryItems = async () => {
            const response = await fetch('https://www.dnd5eapi.co/api/' + category)
            const data = await response.json()
            setCategoryItems(data.results)
        }
        getCategoryItems()
    }, [category])


    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <div className="search-bar">
            <QueryList setCategory={setCategory} category={category}/>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    onChange={handleChange}
                    value={search}
            />
            <button>Search</button>
            <SearchList categoryItems={categoryItems} searchQuery={search}/>
        </form>

    </div>
    )
}

export default SearchBar