import WaterNeeds from './WaterNeeds'
import SunNeeds from './SunNeeds'

export default function PlantCard({plant, editInventory, removePlant}) {

    function removePlantCard() {
        const confirmDelete = window.confirm('are you sure you want to remove this plant from your inventory?')
        if (confirmDelete) removePlant(plant._id)
    }
    return (
        <div className="plant-card-container">
            <div className='card-title-container'>
                <div className="plant-title">{plant.common_name}</div>
                {editInventory && <button onClick={removePlantCard}>x</button>}
            </div>
            <img src={plant.img.regular_url ? (plant.img.regular_url === 'https://perenual.com/storage/species_image/2_abies_alba_pyramidalis/regular/49255769768_df55596553_b.jpg' ?  'https://t4.ftcdn.net/jpg/04/99/93/31/360_F_499933117_ZAUBfv3P1HEOsZDrnkbNCt4jc3AodArl.jpg' : plant.img.regular_url) : 
                'https://t4.ftcdn.net/jpg/04/99/93/31/360_F_499933117_ZAUBfv3P1HEOsZDrnkbNCt4jc3AodArl.jpg'}></img>
            <div>
                <WaterNeeds needs={plant.watering} />
                <SunNeeds needs={plant.sunlight.join(', ')}/>
            </div>
        </div>
    )
}