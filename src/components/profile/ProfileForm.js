import classes from "./profile.module.css";
import { useRef, useContext } from "react";
import AuthContext from "../../store/auth-context";
// import {useHistory} from "react-router-dom";
import {useHistory} from 'react-router-dom'

const ProfileForm = () => {
  const nameInputRef = useRef('');
  const addressInputRef = useRef('');
  const authCtx = useContext(AuthContext);

  const history = useHistory()

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
          password: enteredNewName,
          address: enteredNewAddress,
          returnSecureToken: false,
        }),
        headers: {
          "content-type": "application/json",
        },
      }
    ).then((res) => {
      history.replace('/');
    });
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="name">Full Name</label>
        <input
          type="text"
          id="full-name"
        
          ref={nameInputRef}
        />
      </div>
      <div className={classes.control}>
        <label htmlFor="Address">Address</label>
        <input
          type="text"
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
