import MainNav from '../components/MainNav';
import DashboardNav from '../components/DashboardNav';

export default function Dashboard({coinData, setCoinData, getCoinData}) {
    return (
        <section>
            <MainNav />
            <DashboardNav coinData={coinData} getCoinData={getCoinData} />
        </section>
    )
}