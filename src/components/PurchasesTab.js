import CoinCard from './CoinCard.js';

export default function PurchasesTab({userPurchases}) {
    const lastTenPurchases = userPurchases.slice(0,10)
    return (
        <section>
            <section className="cardContainer">
                <span>(last 10)</span>
                {lastTenPurchases.map((purchase, index) => {
                        return (
                            <CoinCard key={index} coin={purchase.coin} amount={Math.round(purchase.amount*100)/100} total={purchase.total} />
                        )
                })}
            </section>

        </section>
    )
}