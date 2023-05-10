import React from 'react'
import classes from './profile.module.css'
import { Link } from 'react-router-dom/cjs/react-router-dom'

const ProfileButton = () => {
  return (
    <div className={classes.ProfileButton}>
        <div>Welcome To Expense Tracker
            <span>Your Profile Is Incomplete <Link to="/profile">.complete now</Link></span>
        </div>
      
    </div>
  )
}

export default ProfileButton
