import PlantCard from './PlantCard'
import './PlantsIndex.css'

export default function PlantsIndex({userPlants}) {
    return (
        <div className='your-plant-container'>
            {userPlants.map((plant, idx) => <PlantCard key={idx} plant={plant} />)}
        </div>
    )
}