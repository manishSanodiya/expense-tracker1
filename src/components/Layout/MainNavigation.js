import { Link } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";


import classes from "./MainNavigation.module.css";
import EmailVerification from "../../authontication/EmailVerification";
import { loginActions } from "../../store/loginSlice";

const MainNavigation = () => {
 
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.login.isloggedIn);

  const logoutHandler = ()=>{
    dispatch(loginActions.logout());
   localStorage.removeItem("idToken");
  }

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>Expense Tracker</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to="/">Login</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
             <Link to="/expenses">Your Expenses</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <EmailVerification/>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
