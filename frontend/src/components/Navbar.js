import { Link } from "react-router-dom";

const Navbar = () => {
    return ( 
        <header>
            <div className="container">
                <Link to="/">
                    <h1>End-to-End CICD + Talos Kubernetes (10 node-backend pods, 10 react-front end pods)</h1>
                    <h2>with NGINX</h2>
                </Link>
            </div>
        </header>
     );
}
 
export default Navbar;