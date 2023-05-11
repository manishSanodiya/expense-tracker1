import classes from "./profile.module.css";
import { useRef, useContext } from "react";
import AuthContext from "../../store/auth-context";
// import {useHistory} from "react-router-dom";
import {useHistory} from 'react-router-dom'

const ProfileForm = () => {
  const nameInputRef = useRef('');
  const addressInputRef = useRef('');
  const authCtx = useContext(AuthContext);
  let gotName;
  let gotAddress;
  


  const history = useHistory()

  const editPrefill = () =>{
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCh6JzuNPN1qeoGsEWPqsl3z1VpTccugWA',{
      method:"POST",
      body:JSON.stringify({
        idToken:authCtx.token,
      }),
      headers:{
        "content-type": "application/json",
      }
    }).then(data=>{
      console.log(data.user[0]);
    })
  }

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredNewName = nameInputRef.current.value;
    const enteredNewAddress = addressInputRef.current.value;
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCh6JzuNPN1qeoGsEWPqsl3z1VpTccugWA",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          displayName: enteredNewName,
          photoUrl: enteredNewAddress,
          returnSecureToken: false,
        }),
        headers: {
          "content-type": "application/json",
        },
      }
    ).then((res) => {
  
       
      editPrefill();
      
    });

  
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="name" value={gotName}>Full Name</label>
        <input
          type="text"
          id="full-name"
        
          ref={nameInputRef}
        />
      </div>
      <div className={classes.control}>
        <label htmlFor="Address" value={gotAddress}>Photo url</label>
        <input
          type="url"
          id="address"
        
          ref={addressInputRef}
        />
      </div>
      <div className={classes.action}>
        <button>update</button>
      </div>
    </form>
  );
};

export default ProfileForm;
