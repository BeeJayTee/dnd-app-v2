// hooks
import { useEffect, useState } from 'react'

// components
import QueryList from '../components/QueryList'

const SearchBar = ({setSearchResult}) => {
    // category is what the user selects as the main category filter
    const [category, setCategory] = useState('spells')
    // set categoryItems
    const [categoryItems, setCategoryItems] = useState([])
    // set state for active category item
    const [search, setSearch] = useState('')
    // set boolean state for search is active
    const [searchIsActive, setSearchIsActive] = useState(false)
    // set cursor state for choosing item using arrow keys
    const [cursor, setCursor] = useState(0)
    // set matching category items
    const [matchingCategoryItems, setMatchingCategoryItems] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        const getCategoryItems = async () => {
            const response = await fetch('https://www.dnd5eapi.co/api/' + category)
            const data = await response.json()
            setCategoryItems(data.results)
        }
        getCategoryItems()
    }, [category])

    const handleFocus = (e) => {
        setSearchIsActive(true)
    }

    const handleBlur = (e) => {
        setSearchIsActive(false)
    }

    const handleChange = (e) => {
        setSearch(e.target.value)
        if (search.length > 0) {
            setMatchingCategoryItems(categoryItems.filter(item => {
                return item.index.startsWith(search)
            }))
        }
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

    const handleClick = (e) => {
        handleSubmit(e, e.target.getAttribute('value'))
        setSearch('')
        setMatchingCategoryItems([])
    }

    const handleKeyDown = (e) => {
        console.log(e.key)
    }

    return (
        <div className="search-bar">
            <QueryList setCategory={setCategory}/>
            {error && <span>{error}</span>}
            <form onSubmit={handleSubmit}>
                <input
                    autoFocus
                    type="text"
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    value={search}
            />
            <button><span className="material-symbols-outlined">search</span></button>
            <ul className="search-list">
            {matchingCategoryItems && matchingCategoryItems.slice(0,5).map((item, index) => (
                    <li key={index} onClick={handleClick} value={item.index}>{item.index}</li>
            ))}
        </ul>
        </form>

    </div>
    )
}

export default SearchBar