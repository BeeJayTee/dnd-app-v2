const DisplaySpell = ({data}) => {
    return (
        <div className="spell">
            <h1>{data.name}</h1>
            {data.level ? <p>Level {data.level} spell</p> : null}
            <div className="spell-container">
                <div className="spell-column-1">
                    {data.range ? <p><span>Range:</span> {data.range}</p> : null}
                    {data.casting_time ? <p><span>Casting Time:</span> {data.casting_time}</p> : null}
                    {data.area_of_effect ? <p><span>Area of Effect:</span> {data.area_of_effect.type} {data.area_of_effect.size} feet</p> : null}
                    {data.attack_type ? <p><span>Attack Type:</span> {data.attack_type}</p> : null}
                    {data.concentration ? <p><span>Concentration:</span> {data.concentration ? 'yes' : 'no'}</p> : null}
                    {data.ritual ? <p><span>Ritual:</span> {data.ritual ? 'yes' : 'no'}</p> : null}
                    {data.duration ? <p><span>Duration:</span> {data.duration}</p> : null}
                    {data.damage ? <p><span>Damage Type:</span> {data.damage.damage_type.name}</p> : null}
                    
                </div>
                {!data.damage ? null : (
                    <div className="spell-column-two">
                    <p><span>Damage:</span></p>
                    <ul className="spell-damage">
                        {data.damage.damage_at_character_level && Object.keys(data.damage.damage_at_character_level).map((key, i) => {
                            return (
                                <li key={i}>Character Level {key}: {data.damage.damage_at_character_level[key]}</li>
                            )
                        })}
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
                                        // <li key={i} className={i % 2 === 0 ? 'dark' : ''}>Slot Level {key}: {data.damage.damage_at_slot_level[key]}</li>
                                        <tr key={i} className={i % 2 === 0 ? 'dark' : ''}>
                                            <td>{key}</td>
                                            <td>{data.damage.damage_at_slot_level[key]}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </ul>
                </div>
                )}
            </div>
        </div>
    )
}

export default DisplaySpell