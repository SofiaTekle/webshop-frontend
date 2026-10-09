import { useSearchParams } from "react-router-dom";


export const PaymentSuccessPage = () => {
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get("orderId");
    
    return (
        <main>
            <h1>Kontrollerar betalning...</h1>
            <h3>{orderId}</h3>
        </main>
    )
}