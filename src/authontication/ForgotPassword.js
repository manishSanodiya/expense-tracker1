import React,{useRef} from 'react'
import classes from './forgotPassword.module.css'

const ForgotPassword = () => {
    const emailInputRef = useRef('')
    const submitHandler = (event) => {
        event.preventDefault();
        const enteredEmail = emailInputRef.current.value

        fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCh6JzuNPN1qeoGsEWPqsl3z1VpTccugWA',{
            method:"POST",
            body:JSON.stringify({
                requestType: 'PASSWORD_RESET',
                email: enteredEmail,
            }),headers:{
                'Content-Type': 'application/json',
            },
        }).then((res) => {
      
            if (res.ok) {
              return res.json()
            } else {
              return res.json().then((data) => {
                let errorMessage = "forgot password fail failed!";
              
               
                throw new Error(errorMessage)
              });
            }
          }).then(data =>{
            // console.log(data);
            
      
          }).catch(err=>{
            alert(err.message);
          })
    }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
    <div className={classes.control}>
      <label htmlFor="new-password">Enter Email</label>
      <input
        type="email"
        id="new-password"
    
        ref={emailInputRef}
      />
    </div>
    <div className={classes.action}>
      <button>Change Password</button>
    </div>
  </form>
);
};

  


export default ForgotPassword
