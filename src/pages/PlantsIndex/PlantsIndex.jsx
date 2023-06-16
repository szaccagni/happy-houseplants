import PlantCard from './PlantCard'
import { Link } from 'react-router-dom'
import './PlantsIndex.css'

export default function PlantsIndex({userPlants, editInventory, setEditInventory, removePlant}) {
    return (
        <>
            {editInventory && 
                <div className='editing-link'>
                    <Link to="/plants" onClick={() => setEditInventory(false)}>Done Editing</Link>
                </div>
            }
            <div className='your-plant-container'>
                {userPlants.map((plant, idx) => 
                    <PlantCard 
                        key={idx} 
                        editInventory={editInventory}
                        plant={plant} 
                        removePlant={removePlant}
                    />
                )}
            </div>
        </>
    )
}