import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';
import * as plantsAPI from '../../utilities/plant-api'

export default function SearchResultCard({user, item, setPlant}) {
    const [showBtn, setShowBtn] = useState(false)
    const [noInfo, setNoInfo] = useState(false)
    const [imgContainer, setImgContainer] = useState({})

    const navigate = useNavigate()

    function handleMouseEnter() {
        setShowBtn(true);
        setImgContainer({opacity: '.5'})
      };

    function handleMouseLeave() {
        setShowBtn(false);
        setImgContainer({opacity: '1'})
    };

    function addPlant() {
        console.log('add plant');
    };

    async function plantDetails() {
        try {
            const data = await plantsAPI.getDetails(item.apiID);
            localStorage.setItem('plant', JSON.stringify(data));
            setPlant(data);
            navigate('/details');
        } catch (error) {
            console.log(error)
        }
    }
    

    return (
        <div className="result-card">
            <div className="result-title">{item.common_name}</div>
            <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <img style={imgContainer} 
                src={item.img.regular_url ? (item.img.regular_url === 'https://perenual.com/storage/species_image/2_abies_alba_pyramidalis/regular/49255769768_df55596553_b.jpg' ?  'https://t4.ftcdn.net/jpg/04/99/93/31/360_F_499933117_ZAUBfv3P1HEOsZDrnkbNCt4jc3AodArl.jpg' : item.img.regular_url) : 
                'https://t4.ftcdn.net/jpg/04/99/93/31/360_F_499933117_ZAUBfv3P1HEOsZDrnkbNCt4jc3AodArl.jpg'} alt={item.common_name} />
                {showBtn && (
                <div className="btn-container overlay">
                    { user && <Button variant="contained" onClick={addPlant}>Add Plant</Button>}
                    <Button variant="contained" onClick={plantDetails}>See Details</Button>
                </div>
                )}
            </div>
        </div>
    )
}