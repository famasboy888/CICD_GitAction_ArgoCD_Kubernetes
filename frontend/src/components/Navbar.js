import { Link } from "react-router-dom";

const Navbar = () => {
    return ( 
        <header>
            <div className="container">
                <Link to="/">
                    <h1>End-to-End CICD</h1>
                    <h2>with NGINX</h2>
                </Link>
            </div>
        </header>
     );
}
 
export default Navbar;