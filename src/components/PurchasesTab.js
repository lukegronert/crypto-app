import CoinCard from './CoinCard.js';

export default function PurchasesTab({userPurchases}) {
    const lastTenPurchases = userPurchases.slice(0,10)
    return (
        <section className="cardContainer">
            {lastTenPurchases.map((purchase, index) => {
                    return (
                        <CoinCard key={index} coin={purchase.coin} amount={purchase.amount} total={purchase.total} />
                    )
            })}
        </section>
    )
}