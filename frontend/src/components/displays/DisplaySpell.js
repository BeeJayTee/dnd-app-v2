const DisplaySpell = ({data}) => {
    return (
        <div className="spell">
            <h1>{data.name}</h1>
            <div className="spell-container">
                <div className="spell-column-1">
                    {data.range && <p>Range: {data.range}</p>}
                    {data.area_of_effect && <p>Area of Effect: {data.area_of_effect.type} {data.area_of_effect.size} feet</p>}
                    {data.concentration && <p>Concentration: {data.concentration ? 'yes' : 'no'}</p>}
                    {data.ritual && <p>Ritual: {data.ritual ? 'yes' : 'no'}</p>}
                    {data.duration && <p>Duration: {data.duration}</p>}
                    {data.damage.damage_type && <p>Damage Type: {data.damage.damage_type.name}</p>}
                    {data.dc.dc_type && <p>DC: {data.dc.dc_type.name}</p>}
                </div>
                <div className="spell-column-two">
                    <p>Damage:</p>
                    <ul className="spellDamage">
                        {data.damage.damage_at_character_level && Object.keys(data.damage.damage_at_character_level).map((key, i) => {
                            return (
                                <li key={i}>Character Level {key}: {data.damage.damage_at_character_level[key]}</li>
                            )
                        })}
                        {data.damage.damage_at_slot_level && Object.keys(data.damage.damage_at_slot_level).map((key, i) => {
                            return (
                                <li key={i}>Slot Level {key}: {data.damage.damage_at_slot_level[key]}</li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default DisplaySpell