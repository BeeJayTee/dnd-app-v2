// display components
import DisplayClass from "./displays/DisplayClass"
import DisplayMonster from "./displays/DisplayMonster"
import DisplaySpell from "./displays/DisplaySpell"
import DisplayRace from "./displays/DisplayRace"

const DisplayContent = ({searchResult}) => {
    const {category, data} = searchResult

    switch (category) {
        case 'spells':
            return <DisplaySpell data={data}/>
        case 'classes':
            return <DisplayClass data={data}/>
        case 'races':
            return <DisplayRace data={data}/>
        case 'monsters':
            return <DisplayMonster data={data}/>
        default:
            return null
    }
}

export default DisplayContent