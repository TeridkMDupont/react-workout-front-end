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
import ExerciseDetails from './components/ExerciseDetails/ExerciseDetails';

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

  const handleDeleteWorkout = async (workoutId) => {
    const deletedWorkout = await workoutService.deleteWorkout(workoutId)
    setWorkouts(workouts.filter((workout) => workout._id !== deletedWorkout._id ));
    navigate('/workouts')
  };

  const handleUpdateWorkout = async (workoutId, workoutFormData) => {
    const updatedWorkout = await workoutService.update(workoutId, workoutFormData);
    setWorkouts(workouts.map((workout) => (workoutId === workout._id ? updatedWorkout : workout)))
    navigate(`/workouts/${workoutId}`)
  }

  const handleDeleteExercise = async (exerciseId) => {
    const deletedExercise = await exerciseService.deleteExercise(exerciseId)
    setExercises(exercises.filter((exercise) => exercise._id !== deletedExercise._id));
    navigate('/exercises');
  }

  const handleUpdateExercise = async (exerciseId, exerciseFormData) => {
    const updatedExercise = await exerciseService.update(exerciseId, exerciseFormData);
    setExercises(exercises.map((exercise) => (exerciseId === exercise._id ? updatedExercise : exercise)))
    navigate(`/exercises/${exerciseId}`);
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
            <Route path='/exercises/:exerciseId' element={<ExerciseDetails handleDeleteExercise={handleDeleteExercise}/>} />
            <Route path='/exercises/:exerciseId/edit' element={<ExerciseForm handleUpdateExercise={handleUpdateExercise}/>} />
            <Route path='/workouts/new' element={<WorkoutForm handleAddWorkout={handleAddWorkout}/>} />
            <Route path='/workouts/:workoutId' element={<WorkoutDetails handleDeleteWorkout={handleDeleteWorkout}/>} />
            <Route path='/workouts/:workoutId/edit' element={<WorkoutForm handleUpdateWorkout={handleUpdateWorkout}/>} />
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
