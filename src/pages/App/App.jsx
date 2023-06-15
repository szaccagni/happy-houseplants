import './App.css';
import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { getUser } from '../../utilities/users-service'
import NavBar from '../../components/NavBar/NavBar'
import Home from '../Home/Home';
import LoginForm from '../../components/LoginForm/LoginForm'
import SignUpForm from '../../components/SignUpForm/SignUpForm'
import PlantsIndex from '../PlantsIndex/PlantsIndex';
import Search from '../Search/Search'
import Detail from '../Detail/Detail';

export default function App() {
  const [ user, setUser ] = useState(getUser())
  const [ plant, setPlant ] = useState(getCurPlant())

  function getCurPlant() {
    const storedPlant = localStorage.getItem('plant');
    return (JSON.parse(storedPlant) || '')
  }

  return (
    <main className="App">
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/plants" element={<PlantsIndex />}></Route>
            <Route path="/search" element={<Search user={user} setPlant={setPlant} />}></Route>
            <Route path="/login" element={<LoginForm setUser={setUser} />} />
            <Route path="/signup" element={<SignUpForm setUser={setUser} />} />
            <Route path="/details" element={<Detail user={user} plant={plant}/>} />
            <Route path="/*" element={<Navigate to="/" />}></Route>
          </Routes>
        </>
    </main>
  );
}


