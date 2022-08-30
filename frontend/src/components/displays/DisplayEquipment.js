const DisplayEquipment = ({data}) => {
    return (
        <div className="equipment">
            <div className="name-container">
                <h2>{data.name}</h2>
                <p>{data.equipment_category && data.equipment_category.name}</p>
            </div>
            <div className="equipment-container">
                <div className="equipment-column-1">
                    {data.desc && <p>{data.desc[0]}</p>}
                    {data.damage && <p>Damage: {data.damage.damage_dice} {data.damage.damage_type.index}</p>}
                    {data.weapon_range && <p>Range: {data.weapon_range}</p>}
                    {data.weapon_category && <p>Weapon Type: {data.weapon_category}</p>}
                    {data.armor_category && <p>Armor Type: {data.armor_category}</p>}
                    {data.armor_class && <p>Armor Class: {data.armor_class.base} | DEX Bonus: {data.armor_class.dex_bonus ? 'yes' : 'no'}</p>}
                    {data.gear_category && <p>Gear Type: {data.gear_category}</p>}
                    {data.contents && data.contents.map((item, index) => (
                        <span>{item.name}{index !== data.contents.lenght - 1 ? ', ' : '.'}</span>
                    ))}
                    {data.cost && <p>Cost: {data.cost.quantity}{data.cost.unit}</p>}
                </div>
            </div>
        </div>
    )
}

export default DisplayEquipment