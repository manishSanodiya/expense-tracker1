import { Switch, Route,Redirect} from 'react-router-dom';
import './App.css';

import Login from './authontication/Login';
import { Fragment } from 'react';
import ProfileButton from './components/profile/ProfileButton';
import ProfileForm from './components/profile/ProfileForm';
import Layout from './components/Layout/Layout';


function App() {
  return (
    
    <Layout>
    <Switch>
    <Route path='/' exact>
          <Login />
        </Route>
        <Route path='/profile-button' exact>
          <ProfileButton />
        </Route>
      
        <Route path='/profile' exact>
          <ProfileForm />
        </Route>
    
    </Switch>
    </Layout>
   


  );
}

export default App;
