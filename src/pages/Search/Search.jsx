import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import SearchResults from '../SearchResults/SearchResults'
import { useState } from "react";
import './Search.css'
import * as plantsAPI from '../../utilities/plant-api'

export default function Search({user, setPlant}) {
    const [searchTerm, setSearchTerm] = useState("");
    const [curData, setCurData] = useState([])
    const [pagination, setPagination] = useState({})
    const [curSearch, setCurSearch] = useState('')


    function handleSubmit(e) {
        e.preventDefault()
        handleSearch(searchTerm, 1)
    }

    function handleKeyDown(e) {
        if (e.keyCode === 13) {
            e.preventDefault()
            handleSearch(searchTerm, 1)
        }
    }
    
    async function handleSearch(term, pg) {
        const res = await plantsAPI.search(term, pg)
        setCurSearch(term)
        setCurData(res.data)
        setPagination(res.pagination)
        setSearchTerm('')
    }

    function handleChange(e) {
        setSearchTerm(e.target.value);
    };

    return (
        <>
        <div className="search-container">
            <Paper
                className='search-form'
                component="form"
                onSubmit={handleSubmit}
            >
                <InputBase
                    value={searchTerm} 
                    onChange={handleChange}
                    sx={{ ml: 1, flex: 1 }}
                    onKeyDown={handleKeyDown}
                    placeholder="Search Plants"
                />
                <IconButton type="submit" style={{ padding: '10px' }}>
                    <SearchIcon />
                </IconButton>
            </Paper>
        </div>
        {curSearch && 
            <>
            {curData.length > 0 ? <SearchResults user={user} curSearch={curSearch} setCurData={setCurData} curData={curData} pagination={pagination} setPagination={setPagination} handleSearch={handleSearch} setPlant={setPlant} /> : <div className='cur-search'>loading...</div>}
            </>
        }
        </>
    )
}