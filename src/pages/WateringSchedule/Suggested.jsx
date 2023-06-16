import './WateringSchedule.css'
import { useState } from 'react'
import Checkbox from '@mui/material/Checkbox';
import * as plantsAPI from '../../utilities/plant-api'
import dayjs from 'dayjs';

export default function Suggested({suggestion, getUserPlants}) {
    const [checked, setChecked] = useState(false)

    async function handleChange(e) {
        const today = dayjs(new Date());
        setChecked(e.target.checked);
        await plantsAPI.recordWatering(suggestion._id, today)
        await getUserPlants()
    };

    return (
        <div className='suggestion'>
            <img src={suggestion.img.regular_url}></img>
            <div>{suggestion.common_name} needs {suggestion.watering} watering, {suggestion.wateredOn.length ? ` last watering recorded on ${suggestion.wateredOn.splice(-1)}` : 'no previous watering recorded'} </div>
            <div>
                <div>watered?</div>
                <Checkbox
                checked={checked}
                onChange={(e) => handleChange(e)}
                inputProps={{ 'aria-label': 'controlled' }}
                />
            </div>
        </div>
    )
}