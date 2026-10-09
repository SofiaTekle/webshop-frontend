import { Link } from "react-router";

export const PaymentCancelPage = () => {
  return (
    <main>
      <div className="center-text">
        <h1>Betalningen avbröts!</h1>
        <p>Dina produkter finns kvar i kundvagnen.</p>
        <Link to="/cart">Kundvagn</Link>
      </div>
    </main>
  );
};
