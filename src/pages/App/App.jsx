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
import WateringSchedule from '../WateringSchedule/WateringSchedule';
import * as plantsAPI from '../../utilities/plant-api'
import { useEffect } from 'react'

export default function App() {
  const [ user, setUser ] = useState(getUser())
  const [ plant, setPlant ] = useState(getCurPlant())
  const [ userPlants, setUserPlants ] = useState([])
  const [ editInventory, setEditInventory ] = useState(false)

  useEffect(function() {
    getUserPlants()
  }, [user])

  function getCurPlant() {
    const storedPlant = localStorage.getItem('plant');
    return (JSON.parse(storedPlant) || '')
  }

  async function getUserPlants() {
    const plants = await plantsAPI.yourPlants()
    setUserPlants(plants)
  }

  async function removePlant(id) {
    await plantsAPI.deletePlant(id)
    getUserPlants()
  }

  return (
    <main className="App">
        <>
          <NavBar user={user} setUser={setUser} setEditInventory={setEditInventory}/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/plants" element={<PlantsIndex userPlants={userPlants} editInventory={editInventory} setEditInventory={setEditInventory} removePlant={removePlant}/>}></Route>
            <Route path="/plants/schedule" element={<WateringSchedule userPlants={userPlants} getUserPlants={getUserPlants}/>}></Route>
            <Route path="/search" element={<Search user={user} setPlant={setPlant} getUserPlants={getUserPlants} />}></Route>
            <Route path="/login" element={<LoginForm setUser={setUser} />} />
            <Route path="/signup" element={<SignUpForm setUser={setUser} />} />
            <Route path="/details" element={<Detail user={user} plant={plant} getUserPlants={getUserPlants}/>} />
            <Route path="/*" element={<Navigate to="/" />}></Route>
          </Routes>
        </>
    </main>
  );
}


