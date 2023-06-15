import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SearchResultCard from '../SearchResultCard/SearchResultCard'
import './SearchResults.css'

export default function SearchResults({user, curSearch, curData, setCurData, pagination, setPagination, handleSearch, setPlant}) {

    async function handleChange(event, page) {
        setCurData([])
        setPagination((pagination) => ({
            ...pagination,
            curPg: page,
        }));
        await handleSearch(curSearch, page)
    }

    return (
        <div className='results-container'>
            <div className='cur-search'>showing results for: {curSearch}</div>
            <div className='results-masonry'>
                {curData.map((item, idx) => 
                    <SearchResultCard key={idx} user={user} item={item} setPlant={setPlant} />
                )}
            </div>
            <Stack spacing={2} className='pagination-container'>
                <Pagination
                    className='pagination'
                    count={pagination.pgCount}
                    page={pagination.curPg}
                    renderItem={(item) => (
                    <PaginationItem
                        slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                        {...item}
                    />
                    )}
                    onChange={handleChange}
                />
            </Stack>
            <div style={{marginBottom: '20px'}}>({pagination.totalResults} total results)</div>
        </div>
    )
}