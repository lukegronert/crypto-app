import {useEffect} from 'react';
import MainNav from '../components/MainNav';
import DashboardNav from '../components/DashboardNav';


export default function Dashboard({coinData, setCoinData, user, doc}) {
    // Check if coinData exists in local storage or if it is older than 2 minutes (120,000ms)
    useEffect(() => {
        if(localStorage.getItem('coinData') === null || (new Date().getTime() - JSON.parse(localStorage.getItem('coinData')).timestamp) > 120000) {
            fetch('https://api.coincap.io/v2/assets')
                .then(response => response.json())
                .then(data => {
                localStorage.setItem('coinData', JSON.stringify(data))
                setCoinData(data)
                console.log('fetched')
                })
        } else {
            console.log(JSON.parse(localStorage.getItem('coinData')))
            setCoinData(JSON.parse(localStorage.getItem('coinData')))
            console.log('localStorage')
        }
    }, []);

    return (
        <section>
            <MainNav user={user} />
            <DashboardNav coinData={coinData} user={user} doc={doc} />
        </section>
    )
}