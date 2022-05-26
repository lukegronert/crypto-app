import {useEffect} from 'react';

export default function PurchasesTab({userPurchases}) {

    useEffect(() => {
        console.log(userPurchases)
    }, [])
    return (
        <>
            {userPurchases.map((purchase, index) => {
                return (
                    <div key={index}>
                        <p>{purchase.coin} {purchase.price}</p>
                        <p>{purchase.amount} {purchase.total}</p>
                    </div>
                )
            })}
        </>
    )
}