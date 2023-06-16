import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';
import * as plantsAPI from '../../utilities/plant-api'

export default function SearchResultCard({user, item, setPlant, getUserPlants}) {
    const [showBtn, setShowBtn] = useState(false)
    const [noInfo, setNoInfo] = useState(false)
    const [imgContainer, setImgContainer] = useState({})
    const [added, setAdded] = useState(false)

    const navigate = useNavigate()

    function handleMouseEnter() {
        setShowBtn(true);
        setImgContainer({opacity: '.5'})
      };

    function handleMouseLeave() {
        setShowBtn(false);
        setImgContainer({opacity: '1'})
    };

    async function addPlant() {
        try {
            const data = await plantsAPI.getDetails(item.apiID);
            data.user = user
            const res = await plantsAPI.addPlant(data)
            await getUserPlants() 
            setAdded(true)
        } catch (error) {
            console.log(error)
            setNoInfo(true)
        }
    };

    async function plantDetails() {
        try {
            const data = await plantsAPI.getDetails(item.apiID);
            localStorage.setItem('plant', JSON.stringify(data));
            setPlant(data);
            navigate('/details');
        } catch (error) {
            console.log(error)
            setNoInfo(true)
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
                    { added && <div className="added">ADDED!</div>}
                    { user && !noInfo && !added && <Button variant="contained" onClick={addPlant}>Add Plant</Button>}
                    {!noInfo && <Button variant="contained" onClick={plantDetails}>See Details</Button>}
                    {noInfo && <div className="info-error-msg">there was an error getting info on this plant, please try another</div>}
                </div>
                )}
            </div>
        </div>
    )
}