import { useContext, useState, useEffect } from 'react';
import { Routes, Route } from 'react-router';

import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import CommunityPage from './components/CommunityPage/CommunityPage';

import { UserContext } from './contexts/UserContext';
import * as workoutService from './services/workoutService';

const App = () => {
  const { user } = useContext(UserContext);
  const [workouts, setWorkouts] =useState([]);

  useEffect(() => {
    const fetchAllWorkouts = async () => {
      const workoutData = await workoutService.index();
      setWorkouts(workoutData)
    };
    if (user) fetchAllWorkouts()
  }, [user])
  
  return (
    <>
      <NavBar/>
      <Routes>
        <Route path='/' element={user ? <Dashboard /> : <Landing />} />
        {user ? (
          <>
            <Route path='/workouts' element={<CommunityPage workouts={workouts}/>} />
          </>
        ) : (
          <>
            <Route path='/sign-up' element={<SignUpForm />} />
            <Route path='/sign-in' element={<SignInForm />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default App;
