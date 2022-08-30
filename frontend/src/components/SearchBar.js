// hooks
import { useEffect, useState, useRef } from 'react'

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
    const [matchingCategoryItems, setMatchingCategoryItems] = useState(null)
    const focus = useRef()
    const [error, setError] = useState(null)

    useEffect(() => {
        const getCategoryItems = async () => {
            const response = await fetch('https://www.dnd5eapi.co/api/' + category)
            const data = await response.json()
            setCategoryItems(data.results)
        }
        getCategoryItems()
        focus.current.focus()

        const getDropdownItems = () => {
            if (search.length === 0) {
                setMatchingCategoryItems(null)
                setCursor(0)
                document.querySelector('.search-list').style.display = 'none'
            }
            if (search.length > 0) {
                setMatchingCategoryItems(categoryItems.filter(item => {
                    return item.index.startsWith(search)
                }))
                document.querySelector('.search-list').style.display = 'block'
            }
        }
        getDropdownItems()

    }, [category, search, categoryItems, focus])

    const handleFocus = (e) => {
        setSearchIsActive(true)
    }

    const handleBlur = (e) => {
        setSearchIsActive(false)
    }

    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    const handleSubmit = async (e, searchClick=null) => {
        e.preventDefault()
        if (searchClick) {
            const response = await fetch(`https://www.dnd5eapi.co/api/${category}/${searchClick}`)
            const data = await response.json()
            setError(null)
            return setSearchResult({category: category, data: data})
        }
        const searchItem = matchingCategoryItems[cursor].index
        const response = await fetch(`https://www.dnd5eapi.co/api/${category}/${searchItem}`)
        if (!response.ok) {
            return setError('does not match')
        }
        if (response.ok) {
            const data = await response.json()
            setSearch('')
            setError(null)
            return setSearchResult({category: category, data: data})
        }
    }

    const handleClick = (e) => {
        handleSubmit(e, e.target.getAttribute('value'))
        setSearch('')
        setMatchingCategoryItems([])
    }

    const handleKeyDown = (e) => {
        if (searchIsActive && e.key === 'ArrowDown' && cursor < matchingCategoryItems.length - 1) {
            setCursor(cursor + 1)
        } else if (searchIsActive && e.key === 'ArrowUp' && cursor > 0) {
            setCursor(cursor - 1)
            e.preventDefault()
        }
    }


    return (
        <div className="search-bar">
            <QueryList setCategory={setCategory}/>
            {error && <span>{error}</span>}
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <input
                        autoFocus
                        placeholder='enter to submit'
                        type="text"
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onKeyDown={handleKeyDown}
                        value={search}
                        ref={focus}
                    />
                <div className='icon-container'>
                    <div className='icon'><span className="material-symbols-outlined">keyboard_arrow_up</span><span>Go Up</span></div>
                    <div className='icon'><span className="material-symbols-outlined">keyboard_arrow_down</span><span>Go Down</span></div>
                    <div className='icon'><span className="material-symbols-outlined">login</span><span>Enter</span></div>
                </div>
            </div>
            <ul className="search-list">
            {matchingCategoryItems && matchingCategoryItems.slice(0,5).map((item, index) => (
                    <li
                        className={cursor === index ? 'item-focus' : ''}
                        key={index}
                        onClick={handleClick}
                        onMouseOverCapture={(e) => {setCursor(index)}}
                        value={item.index}>
                            {item.index}
                    </li>
            ))}
        </ul>
        </form>

    </div>
    )
}

export default SearchBar