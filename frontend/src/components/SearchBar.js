// hooks
import { useEffect, useState } from 'react'

// components
import QueryList from '../components/QueryList'
import SearchList from '../components/SearchList'

const SearchBar = ({setSearchResult}) => {
    // category is what the user selects as the main category filter
    const [category, setCategory] = useState('spells')
    // set categoryItems
    const [categoryItems, setCategoryItems] = useState([])
    // this is what the user types into the search bar
    const [search, setSearch] = useState('')
    const [error, setError] = useState(null)

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

    const handleSubmit = async (e, searchClick=null) => {
        e.preventDefault()
        if (searchClick) {
            const response = await fetch(`https://www.dnd5eapi.co/api/${category}/${searchClick}`)
            const data = await response.json()
            return setSearchResult({category: category, data: data})
        }

        const response = await fetch(`https://www.dnd5eapi.co/api/${category}/${search}`)
        if (!response.ok) {
            return setError('does not match')
        }
        if (response.ok) {
            const data = await response.json()
            setSearch('')
            return setSearchResult({category: category, data: data})
        }
    }

    return (
        <div className="search-bar">
            <QueryList setCategory={setCategory} category={category}/>
            {error && <span>{error}</span>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    onChange={handleChange}
                    value={search}
            />
            <button><span className="material-symbols-outlined">search</span></button>
            <SearchList
                categoryItems={categoryItems}
                setSearchQuery={setSearch}
                searchQuery={search}
                handleSubmit={handleSubmit}/>
        </form>

    </div>
    )
}

export default SearchBar