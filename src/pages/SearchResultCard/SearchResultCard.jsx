export default function SearchResultCard({item}) {
    return (
        <div className="result-card">
            <div className="result-title">{item.common_name}</div>
            {item.img.regular_url ? 
            <img src={item.img.regular_url} alt={item.common_name} ></img>
            :
            <img src='https://t4.ftcdn.net/jpg/04/99/93/31/360_F_499933117_ZAUBfv3P1HEOsZDrnkbNCt4jc3AodArl.jpg' alt='none found'></img>}
        </div>
    )
}