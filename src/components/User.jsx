import {useNavigate} from "react-router-dom";
import {useAuth} from "../contexts/AuthContext";
import styles from "./User.module.css";
import Button from "./Button";
import Guest_User from "../assets/Guest_User.png";
import profile_pic from "../assets/profile_pic.png";

function User() {
    const {user, logout} = useAuth();
    const navigate = useNavigate();

    function handleClick(e) {
        e.preventDefault();

        logout();
        navigate("/app");
    }

    function handleLogin(e) {
        e.preventDefault();
        navigate("/login");
    }

    return (
        <>
            {user !== null ? (
                <div className={styles.user}>
                    <img src={profile_pic} alt={user.name} />
                    <span>Welcome, {user.name}</span>
                    <button onClick={handleClick}>Logout</button>
                </div>
            ) : (
                <div className={styles.user}>
                    <img src={Guest_User} alt={"Guest"} />
                    <span>Welcome, Guest</span>
                    <Button type="primary" onClick={handleLogin}>
                        Login
                    </Button>
                </div>
            )}
        </>
    );
}

export default User;
