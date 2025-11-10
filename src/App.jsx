import { useContext, useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router';

import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import CommunityPage from './components/CommunityPage/CommunityPage';
import WorkoutDetails from './components/WorkoutDetails/WorkoutDetails';
import WorkoutForm from './components/WorkoutForm/WorkoutForm';
import ExerciseForm from './components/ExerciseForm/ExerciseForm';

import { UserContext } from './contexts/UserContext';
import * as workoutService from './services/workoutService';
import * as exerciseService from './services/exerciseService'

const App = () => {
  const { user } = useContext(UserContext);
  const [workouts, setWorkouts] =useState([]);
  const [exercises, setExercises] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllWorkouts = async () => {
      const workoutData = await workoutService.index();
      setWorkouts(workoutData)
    };
    if (user) fetchAllWorkouts()
  }, [user])

  const handleAddWorkout = async (workoutFormData) => {
    const newWorkout = await workoutService.create(workoutFormData);
    setWorkouts([newWorkout, ...workouts]);
    navigate('/workouts')
  };

  const handleAddExercise = async (exerciseFormData) => {
    const newExercise = await exerciseService.create(exerciseFormData);
    setExercises([newExercise, ...exercises]);
    navigate('/exercises');
  }
  
  return (
    <>
      <NavBar/>
      <Routes>
        <Route path='/' element={user ? <Dashboard /> : <Landing />} />
        {user ? (
          <>
            <Route path='/workouts' element={<CommunityPage workouts={workouts}/>} />
            <Route path='/exercises' element={<ExerciseForm exercises={exercises}/>} />
            <Route path='/exercises/new' element={<ExerciseForm handleAddExercise={handleAddExercise}/>} />
            <Route path='/workouts/new' element={<WorkoutForm handleAddWorkout={handleAddWorkout}/>} />
            <Route path='/workouts/:workoutId' element={<WorkoutDetails/>} />
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
