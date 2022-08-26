const QueryList = ({setCategory, category}) => {

    const handleClick = async (e) => {
        setCategory(e.target.innerText)
        e.target.classList.add('active')
        const list = document.querySelectorAll('.query-list-item')
        const arr = [...list]
        arr.forEach(item => {
            if (item.innerText === e.target.innerText) {
                item.classList.add('active')
            } else {
                item.classList.remove('active')
            }
        })
    }

    return (
        <ul className="query-list">
            <li className="query-list-item active" onClick={handleClick}>
                spells
            </li>
            <li className="query-list-item" onClick={handleClick}>
                classes
            </li>
            <li className="query-list-item" onClick={handleClick}>
                monsters
            </li>
        </ul>
    )
}

export default QueryList