import CoinCard from './CoinCard.js';

export default function SalesTab({userSales}) {
    const lastTenSales = userSales.slice(0,10);
    return (
        <section>
            <section className="cardContainer">
                <span>(last 10)</span>
                {userSales.map((sale, index) => {
                    return (
                        <CoinCard key={index} coin={sale.coin} amount={Math.round(sale.amount*100)/100} total={sale.total} />
                    )
                })}
            </section>
        </section>
    )
}