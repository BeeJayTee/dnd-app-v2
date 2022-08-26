const SearchList = ({categoryItems, setSearchQuery, searchQuery, handleSubmit}) => {
    let matchingCategoryItems

    if (searchQuery.length > 0) {
        matchingCategoryItems = categoryItems.filter(item => {
            return item.index.startsWith(searchQuery)
        })
    }

    const handleClick = (e) => {
        handleSubmit(e, e.target.getAttribute('value'))
        setSearchQuery('')
    }

    return (
        <ul className="search-list">
            {matchingCategoryItems && matchingCategoryItems.slice(0,5).map((item, index) => (
                    <li key={index} onClick={handleClick} value={item.index}>{item.index}</li>
            ))}
        </ul>
    )
}

export default SearchList