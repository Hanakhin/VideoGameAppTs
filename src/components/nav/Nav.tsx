import "./nav.css"
import {Link} from "react-router-dom";
import {useAuth} from "../../contexts/authContext.tsx";
import {auth} from "../../../server/firebase/firebaseConfig.ts";

const Nav=()=>{
    const currentUser = useAuth();
    const handleLogOut=()=>{
        return auth.signOut()
    }
    return(
        <nav>
            <div className="custom-nav-container">
                <div className={"nav-div"}></div>
                <div className={"nav-div"}>
                    <Link to="/" className={'custom-link'}>Home</Link>
                    <Link to="/contact" className={'custom-link'}>Contact</Link>
                    <Link to="#" className={'custom-link'}>About</Link>
                </div>
                <div className={"nav-div"}>
                    {
                        currentUser.userLogged ? (
                            <>
                                <span>you are logged as : {currentUser.currentUser?.displayName}</span>
                                <button onClick={handleLogOut} className={"text-red-600 hover:text-red-800"}>Logout</button>
                            </>
                        ) : (
                            <>
                                <Link to="/register" className={"nav-link"}>Register</Link>
                                <Link to="/login" className={"nav-link"}>Login</Link>
                            </>
                        )}
                </div>
            </div>
        </nav>
    )
}


export default Nav;