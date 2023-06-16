export default function Watered({plant}) {
    return (
        <div className="watered-today">
            <img src={plant.img.regular_url}></img>
            <div>{plant.common_name}</div>
        </div>
    )
}