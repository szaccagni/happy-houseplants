import './WateringSchedule.css'
import { useState, useEffect } from 'react'
import Suggested from './Suggested'
import Watered from './Watered'
import dayjs from 'dayjs';
import Button from '@mui/material/Button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import * as plantsAPI from '../../utilities/plant-api'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



export default function WateringSchedule({userPlants, getUserPlants}) {
    const [suggestions, setSuggestions] = useState(getSuggestions(dayjs(new Date())))
    const [watered, setWatered] = useState([])
    const [calendarDate, setCalendarDate] = useState(dayjs(new Date()))
    const [selectedPlant, setSelectedPlant] = useState('');

    useEffect(function() {
        updateLists(calendarDate)
    }, [userPlants])

    function updateLists(date) {
        const updateSuggestions = getSuggestions(date)
        setSuggestions(updateSuggestions)
        const watered = wateredToday(date)
        setWatered(watered)
    }

    function getSuggestions(date) {
        const formSuggestions = userPlants.filter(el => {
            const wateredOnDate = el.wateredOn.reduce((acc, checkDate) => {
                const formattedDate = new Date(checkDate)
                if (isSameDate(formattedDate, date)) acc.push(date)
                return acc
            }, [])
            return el.watering === 'Frequent' && wateredOnDate.length === 0
        })
        return formSuggestions
    }

    function wateredToday(date) {
        const watered = userPlants.filter(el => {
            const wateredOnDate = el.wateredOn.reduce((acc, checkDate) => {
                const formattedDate = new Date(checkDate)
                if (isSameDate(formattedDate, date)) acc.push(date)
                return acc
            }, [])
            return wateredOnDate.length > 0
        })
        return watered
    }

    function isSameDate(date1, date2) {
        const d1 = new Date(date1);
        const d2 = new Date(date2);
        
        return (
          d1.getFullYear() === d2.getFullYear() &&
          d1.getMonth() === d2.getMonth() &&
          d1.getDate() === d2.getDate()
        );
    }

    function calendarChange(newDate) {
        setCalendarDate(newDate)
        updateLists(newDate)
    }

    function handlePlantChange(e) {
        setSelectedPlant(e.target.value);
    }
    
    async function handleConfirm() {
        await waterPlant(selectedPlant);
        setSelectedPlant('');
    }

    async function waterPlant(id) {
        await plantsAPI.recordWatering(id, calendarDate)
        await getUserPlants()
    }

    const isToday = isSameDate(dayjs(new Date()), calendarDate);

    return (
        <div className='watering-container'>
        {isToday && (
            <div className="watering-card yellow-shadow">
                <div className='watering-card-title'>Today's Watering Suggestions</div>
                {suggestions.length > 0 ? (
                    <>
                    {suggestions.map((suggestion, idx) => (
                        <Suggested key={idx} suggestion={suggestion} getUserPlants={getUserPlants} />
                    ))}
                    </>
                ) : (
                    <div>no suggestions at the moment</div>
                )}
            </div>
        )}
            <div className="watering-card yellow-shadow">
                <div className='watering-card-title'>Record Watering</div>
                <div style={{display:'flex', justifyContent: 'space-around'}}>
                    {/* <select value={selectedPlant} onChange={handlePlantChange}>
                        <option value="">Which Plant Was Watered?</option>
                        {userPlants.map((plant, index) => (
                        <option key={index} value={plant._id}>
                            {plant.common_name}
                        </option>
                        ))}
                    </select> */}
                    <FormControl style={{width: '80%'}}>
                        <InputLabel id="demo-simple-select-label">Which Plant Was Watered?</InputLabel>
                        <Select
                        id="water-plant-at-will"
                        value={selectedPlant}
                        label="Which Plant Was Watered?"
                        onChange={handlePlantChange}
                        >
                            {userPlants.map((plant, index) => (
                                <MenuItem value={plant._id} key={index}>{plant.common_name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <div className='btn-container'>
                        <Button onClick={handleConfirm} variant="contained" >Confirm</Button>
                    </div>
                </div>
            </div>
            <div className="watering-card blue-shadow">
                <div className='watering-card-title'>Watered {calendarDate.format('MM/DD/YYYY')}</div>
                {
                    watered.length > 0 ?
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        {watered.map((plant, idx) => 
                            <Watered key={idx} plant={plant} />
                        )}
                    </div>
                    :
                    <div>no plants watered</div>
                }
            </div>
            <div style={{marginTop: '25px'}}>
                <div className='watering-card-title'>Check Another Date</div>
                <div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateCalendar value={calendarDate} onChange={(newDate) => calendarChange(newDate)} />
                    </LocalizationProvider>
                </div>
            </div>
        </div>
    )
}