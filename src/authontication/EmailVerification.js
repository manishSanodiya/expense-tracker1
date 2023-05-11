import React from 'react'

const EmailVerification = () => {
    const verifyEmail= async() =>{
        try {
            const res = await fetch(
              'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCh6JzuNPN1qeoGsEWPqsl3z1VpTccugWA',
              {
                method: 'POST',
                body: JSON.stringify({
                  requestType: 'VERIFY_EMAIL',
                  idToken: localStorage.getItem('token'),
                }),
                headers: {
                  'Content-Type': 'application/json',
                },
              }
            );
      
            const data = await res.json();
      
            if (res.ok) {
              console.log(data.email);
            } else {
              throw data.error;
            }
          } catch (err) {
            console.log(err.message);
          }
        };
    
  return (
    <div>
      <button onClick={verifyEmail}>Verify email</button>
    </div>
  )
}

export default EmailVerification
