import MainNav from '../components/MainNav';
import '../css/landingPage.css'
export default function LandingPage({user}) {
    return (
        <section>
            <MainNav user={user} />
            <div className="h1Container">
                <h1 className='landingPageh1'>CRYPTO</h1>
            </div>
        </section>
    )
}