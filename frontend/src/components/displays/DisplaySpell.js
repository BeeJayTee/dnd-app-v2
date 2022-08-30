const DisplaySpell = ({data}) => {
    return (
        <div className="spell">
            <h2>{data.name}</h2>
            {data.level ? <p>Level {data.level} spell</p> : null}
            <div className="spell-container">
                <div className="spell-column-1">
                    {data.range && <p><span>Range:</span> {data.range}</p>}
                    {data.casting_time && <p><span>Casting Time:</span> {data.casting_time}</p>}
                    {data.area_of_effect && <p><span>Area of Effect:</span> {data.area_of_effect.type} {data.area_of_effect.size} feet</p>}
                    {data.attack_type && <p><span>Attack Type:</span> {data.attack_type}</p>}
                    {data.concentration && <p><span>Concentration:</span> {data.concentration ? 'yes' : 'no'}</p>}
                    {data.ritual && <p><span>Ritual:</span> {data.ritual ? 'yes' : 'no'}</p>}
                    {data.duration && <p><span>Duration:</span> {data.duration}</p>}
                    {data.damage && <p><span>Damage Type:</span> {data.damage.damage_type.name}</p>}
                    
                </div>
                {data.damage && (
                    <div className="spell-column-two">
                    <p><span>Damage:</span></p>
                    <div className="spell-damage">
                        <table>
                            <thead>
                                <tr>
                                    <th>Level</th>
                                    <th>Dice</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.damage.damage_at_slot_level && Object.keys(data.damage.damage_at_slot_level).map((key, i) => {
                                    return (
                                        <tr key={i} className={i % 2 === 0 ? 'dark' : ''}>
                                            <td>{key}</td>
                                            <td>{data.damage.damage_at_slot_level[key]}</td>
                                        </tr>
                                    )
                                })}
                                {data.damage.damage_at_character_level && Object.keys(data.damage.damage_at_character_level).map((key, i) => {
                                    return (
                                        <tr key={i} className={i % 2 === 0 ? 'dark' : ''}>
                                            <td>{key}</td>
                                            <td>{data.damage.damage_at_character_level[key]}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                )}
            </div>
        </div>
    )
}

export default DisplaySpell