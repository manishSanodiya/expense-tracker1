import React, { useRef, useState } from "react";
import classes from "./auth.module.css";
import { useSelector,useDispatch } from "react-redux";
import { loginActions } from "../store/loginSlice";

import { Link } from "react-router-dom/cjs/react-router-dom.min";

import ProfileButton from "../components/profile/ProfileButton";

const Login = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();


const dispatch = useDispatch()
const isLoggedIn = useSelector((state) => state.login.isloggedIn);
 

  const [isLogin, setIsLogin] = useState(true);


  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

   
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCh6JzuNPN1qeoGsEWPqsl3z1VpTccugWA";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCh6JzuNPN1qeoGsEWPqsl3z1VpTccugWA";
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "content-type": "authentication/json",
      },
    }).then((res) => {
     
      if (res.ok) {
        return res.json()
      } else {
        return res.json().then((data) => {
          let errorMessage = "Authentication failed!";
          // if(data && data.error && data.error.message){

          //   errorMessage = data.error.message
          // }
         
          throw new Error(errorMessage)
        });
      }
    }).then(data =>{
      console.log(data);
      // const expirationTime = new Date(new Date().getTime() + (+data.expiresIn * 1000));
      // authCtx.login(data.idToken, expirationTime.toISOString());
      // history.replace('/');
      localStorage.setItem("idToken", JSON.stringify(data.idToken));
      localStorage.setItem("data", JSON.stringify(data));
      setIsLogin(true);
      dispatch(loginActions.login());

    })
      // .then((res) => {
      //   if (res.ok) {
      //     // const data = res.json();
      //     // console.log("User has logged in");
      //     // console.log(data);
      //     // localStorage.setItem("idToken", JSON.stringify(data));
      //     // setIsLogin(true);
      //     // //   emailRef.current.value = '';
      //     // //   passwordRef.current.value = '';
      //     // dispatch(loginActions.login());
     
     
      //   } else {
      //     const data = res.json();
      //     throw data.error;
      //   }
      // })

      .catch((err) => {
        alert(err.message);
      });
  };
  if (isLoggedIn) {
    return <ProfileButton/>
}


  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
       
            <button>{isLogin ? "login" : "create account"}</button>
        
          
          <Link to="/forgot-password">forgot password click here</Link>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Login;
