const SearchList = ({categoryItems, searchQuery}) => {
    let matchingCategoryItems

    if (searchQuery.length > 0) {
        matchingCategoryItems = categoryItems.filter(item => {
            return item.index.startsWith(searchQuery)
        })
    }

    return (
        <ul className="search-list">
            {matchingCategoryItems && matchingCategoryItems.slice(0,5).map((item, index) => (
                    <li key={index}>{item.index}</li>
            ))}
        </ul>
    )
}

export default SearchList