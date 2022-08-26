export const useFinder = () => {
    const finder = async (query) => {
        const response = await fetch('https://www.dnd5eapi.co/api/' + query)
        const data = await response.json()
        return data.results
    }
    return {finder}
}