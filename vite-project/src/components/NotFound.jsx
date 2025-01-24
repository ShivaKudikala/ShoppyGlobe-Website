import { useRouteError } from "react-router-dom";
import "./styles/NotFound.css";
import { Link } from "react-router-dom";

function NotFound() {
    const error = useRouteError(); // for error routes to find error details
    console.log(error);

    return (
        <div className="notFound-div">
            {/* Showing error details */}
            <h1 className="err-status">{error.status}</h1>
            <h2>{error.statusText}</h2>
            <h4 className="err-data">{error.data}</h4>
            <Link to={"/"}><button className="backtohome-btn">Back to home</button></Link>
        </div>
    )
}

export default NotFound;