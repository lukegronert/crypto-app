import {useEffect} from 'react';

export default function SalesTab({userSales}) {

    useEffect(() => {
        console.log(userSales)
    }, [])
    return (
        <>
            {userSales.map((sale, index) => {
                return (
                    <div key={index}>
                        {sale.coin} - price: {sale.price} - amount: {sale.amount}- total: {sale.total}
                    </div>
                )
            })}
        </>
    )
}