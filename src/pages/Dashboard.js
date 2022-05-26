import {useEffect} from 'react';
import MainNav from '../components/MainNav';
import DashboardNav from '../components/DashboardNav';


export default function Dashboard({coinData, setCoinData, user, doc}) {
    // Check if coinData exists in local storage or if it is older than 2 minutes (120,000ms)
    useEffect(() => {
        fetch('https://api.coincap.io/v2/assets?limit=20')
            .then(response => response.json())
            .then(data => {
            setCoinData(data)
            })
    }, []);

    return (
        <section>
            <MainNav user={user} />
            <DashboardNav coinData={coinData} user={user} doc={doc} />
        </section>
    )
}