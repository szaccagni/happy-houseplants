import './Home.css'

export default function Home() {
    return (
        <div className="home-container">
            <div className="home-info">
                <div>
                    Happy Houseplants is here to help you keep your leafy roommates healthy and thriving! <br></br>
                    <strong>Log in to catalog your plants, learn about how much sunlight they need, and track how often they recieve water. </strong>
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