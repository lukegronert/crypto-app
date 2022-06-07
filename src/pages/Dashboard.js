import {useEffect} from 'react';
import MainNav from '../components/MainNav';
import DashboardNav from '../components/DashboardNav';

export default function Dashboard({coinData, setCoinData, user, doc}) {
    useEffect(() => {
        fetch('https://api.coincap.io/v2/assets?limit=15')
            .then(response => response.json())
            .then(data => {
            setCoinData(data.data)
            console.log(data.data)
            })
            doc.loadInfo()
    }, []);

    return (
        <section>
            <MainNav user={user} />
            <DashboardNav coinData={coinData} setCoinData={setCoinData} user={user} doc={doc} />
        </section>
    )
}