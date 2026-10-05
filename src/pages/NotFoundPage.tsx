import {Link} from "react-router-dom";

export default function NotFoundPage(){
    return (
        <main className="center-text">
            <h1>404</h1>
            <p>Sidan hittades inte</p>
            <Link to="/">Till Startsidan</Link>
        </main>
    );
};