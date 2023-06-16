import './WateringSchedule.css'
import { useState, useEffect } from 'react'
import Suggested from './Suggested'
import Watered from './Watered'
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';



export default function WateringSchedule({userPlants, getUserPlants}) {
    const [suggestions, setSuggestions] = useState(getSuggestions(dayjs(new Date())))
    const [watered, setWatered] = useState([])
    const [calendarDate, setCalendarDate] = useState(dayjs(new Date()))

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
            const lastWateredDate = new Date(el.wateredOn.slice(-1)[0])
            return el.watering === 'Frequent' && !isSameDate(lastWateredDate, date)
        })
        return formSuggestions
    }

    function wateredToday(date) {
        const watered = userPlants.filter(el => {
            const lastWateredDate = new Date(el.wateredOn.slice(-1)[0])
            return isSameDate(lastWateredDate, date)
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