import React,{useRef} from 'react'
import classes from './auth.module.css'

const Login = () => {
    const emailInputRef = useRef('');
    const passwordInputRef = useRef('')
  
    const submitHandler=(event)=>{
      event.preventDefault();
      const enteredEmail = emailInputRef.current.value;
      const enteredPassword = passwordInputRef.current.value;
      fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCh6JzuNPN1qeoGsEWPqsl3z1VpTccugWA",{
        method:"POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers:{ "content-type": "authentication/json",}
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
       
  
      }).catch(err=>{
        alert(err.message);
      })
    }
  
  
  
  
    return (
      <section className={classes.auth}>
        <h1>Login</h1>
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
          
              <button>Login</button>
          
          </div>
        </form>
      </section>
    );
}

export default Login
