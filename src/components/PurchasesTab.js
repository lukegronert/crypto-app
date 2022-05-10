import {useEffect} from 'react';

export default function PurchasesTab({userPurchases}) {

    useEffect(() => {
        console.log(userPurchases)
    }, [])
    return (
        <>
            {userPurchases.map(purchase => {
                return (
                    <p>
                        {purchase.coin} - price: {purchase.price} - amount: {purchase.amount}- total: {purchase.total}
                    </p>
                )
            })}
        </>
    )
}