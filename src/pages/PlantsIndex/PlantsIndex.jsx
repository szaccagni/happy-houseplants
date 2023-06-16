import PlantCard from './PlantCard'
import { Link } from 'react-router-dom'
import './PlantsIndex.css'

export default function PlantsIndex({userPlants, editInventory, setEditInventory, removePlant}) {
    return (
        <>
            {
            userPlants.length > 0 ? 
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
                :
                <div className='no-plants-msg'>
                    <div>No plants have been added to your inventory yet, check out Browse All to add some!</div>
                    <img src='/favicon.ico'></img>
                </div>
            }
        </>
    )
}