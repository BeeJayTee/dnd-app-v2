// display components
import DisplayEquipment from "./displays/DisplayEquipment"
import DisplaySpell from "./displays/DisplaySpell"

const DisplayContent = ({searchResult}) => {
    const {category, data} = searchResult

    switch (category) {
        case 'spells':
            return <DisplaySpell data={data}/>
        case 'equipment':
            return <DisplayEquipment data={data}/>
        default:
            return null
    }
}

export default DisplayContent