import {useEffect} from 'react';
import CoinCard from './CoinCard.js';

export default function SalesTab({userSales}) {

    useEffect(() => {
        console.log(userSales)
    }, [])
    return (
        <section className="cardContainer">
            {userSales.map((sale, index) => {
                return (
                    <CoinCard key={index} coin={sale.coin} amount={sale.amount} total={sale.total} />
                )
            })}
        </section>
    )
}