import './Home.css'

export default function Home() {
    return (
        <div className="home-container">
            <div className="home-info">
                <div>
                    Happy Houseplants is here to help you keep your leafy roommates healthy and thriving! <br></br>
                    <strong>Log In to catalog your plants to get reminders about how often they need water and sunlight. </strong>
                </div>
            </div>
            <div className="flowers">
                <div><img alt="flowers" src='flowers-short.png'></img></div>
            </div>
            <div className='flowers-mobile'>
                <div><img alt="flowers" src='/flowers-wide.png'></img></div>
            </div>
            <div className="flowers">
                <div><img alt="flowers" src='flowers-short.png'></img></div>
            </div>
            <div className="home-info">
                <div>
                    Let's tend to our leafy friends with care,
                    So their flourishing beauty fills the air.
                </div>
            </div>
        </div>

    )
}