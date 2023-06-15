import { useEffect } from 'react';
import './Detail.css'
import Button from '@mui/material/Button';

export default function Deatil({user, plant}) {
    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top of the page when component mounts
    }, []);

    function handleClick() {
        console.log(':)')
    }

    return (
        <>
        <div className='detail-container'>
            <div className='plant-detail-container'>
                <div className='plant-detail-img'>
                    <img src={plant.img.regular_url ? ((plant.img.regular_url === 'https://perenual.com/storage/species_image/2_abies_alba_pyramidalis/regular/49255769768_df55596553_b.jpg' ?  'https://t4.ftcdn.net/jpg/04/99/93/31/360_F_499933117_ZAUBfv3P1HEOsZDrnkbNCt4jc3AodArl.jpg' : plant.img.regular_url)) : 'https://t4.ftcdn.net/jpg/04/99/93/31/360_F_499933117_ZAUBfv3P1HEOsZDrnkbNCt4jc3AodArl.jpg' } alt={plant.common_name}></img>
                </div>
                <div className='plant-details'>
                    <div className='plant-detail-title'>
                        <div>{plant.common_name}</div>
                    </div>
                    <div className='plant-detail-info'>
                        <div className='grid-right'>COMMON NAME</div>
                        <div className='grid-left'>{plant.common_name}</div>
                        <div className='grid-right'>SCIENTIFIC NAME</div>
                        <div className='grid-left'>{plant.scientific_name.join(', ')}</div>
                        <div className='grid-right'>ORIGIN</div>
                        <div className='grid-left'>{plant.origin.join(', ')}</div>
                        <div className='grid-right'>TYPE</div>
                        <div className='grid-left'>{plant.type}</div>
                        <div className='grid-right'>CARE LEVEL</div>
                        <div className='grid-left'>{plant.care_level}</div>
                        <div className='grid-right'>DESCRIPTION</div>
                        <div className='grid-left'>{plant.description}</div>
                        <div className='grid-right'>WATERING</div>
                        <div className='grid-left'>
                            {plant.watering}
                        </div>
                        <div className='grid-right'>SUNLIGHT</div>
                        <div className='grid-left'>
                            {plant.sunlight.join(', ')}
                        </div>
                    </div>
                    <div className='btn-container detail-btn'>
                        {user && <Button variant="contained" onClick={handleClick}>Add Plant to Inventory</Button>}
                    </div>
                </div>
            </div>
        </div>
        {plant.wateringDescription && plant.sunlightDescription && 
        <>
            <div className='care-details'>
            <div className='care-details-title'>
                <div>Care Details</div>
            </div>
            </div>
            <div className='care-grid'>
                <div>
                    <div className='grid-img-container'><img src="/watering-can2.jpeg"></img></div>
                    <div className='grid-text'>{plant.wateringDescription}</div>
                </div>
                <div class='grid-item'>
                    <div className='grid-img-container'><img src="/sunshine.jpeg"></img></div>
                    <div className='grid-text'>{plant.sunlightDescription}</div>
                </div>
            </div>
        </>
        }
        </>
    )
}