import MainNav from '../components/MainNav';
import DashboardNav from '../components/DashboardNav';

export default function Dashboard({coinData, setCoinData, getCoinData}) {
    return (
        <section>
            <MainNav />
            <DashboardNav />
            <button onClick={() => getCoinData()}>GetCoinData</button>
        </section>
    )
}