import { Switch, Route,Redirect} from 'react-router-dom';
import './App.css';

import Login from './authontication/Login';

import ProfileButton from './components/profile/ProfileButton';
import ProfileForm from './components/profile/ProfileForm';
import Layout from './components/Layout/Layout';
import ForgotPassword from './authontication/ForgotPassword';
import Expenses from './components/Expenses';
import EmailVerification from './authontication/EmailVerification';
import { useSelector} from 'react-redux';


function App() {
  const isLoggedIn = useSelector((state) => state.login.isloggedIn);
  const themeMode = useSelector((state)=> state.theme.theme)
  return (
    <div className={themeMode === 'dark' ? 'dark' : ''}>
    <Layout>
    <Switch>
    <Route path='/' exact>
          <Login />
        </Route>
        <Route path='/profile-button' exact>
          {isLoggedIn && <ProfileButton />}
          {!isLoggedIn && <Login />}
        </Route>
      
        <Route path='/profile' exact>
          {isLoggedIn && <ProfileForm />}
          {!isLoggedIn && <Login />}
        </Route>
        <Route path='/forgot-password' exact>
         <ForgotPassword/>
        </Route>
    
        <Route path='/expenses' exact>
         {isLoggedIn && <Expenses/>}
         {!isLoggedIn && <Login />}
        </Route>
        <Route path='/Everification' exact>
        {isLoggedIn && <EmailVerification/>}
        {!isLoggedIn && <Login />}
        </Route>
    
    </Switch>
    </Layout>
    </div>


  );
}

export default App;
