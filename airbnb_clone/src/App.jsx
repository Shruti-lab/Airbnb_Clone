import {Route, Routes} from 'react-router-dom';
import './App.css'
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import Layout from './pages/Layout';
import RegisterPage from './pages/RegisterPage';
import UserContextProvider from './UserContext'

import axios from "axios";
axios.defaults.baseURL = 'http//127.0.0.1:4000';
axios.defaults.withCredentials = true;


function App() {

  return (
    <UserContextProvider>
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<IndexPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
      </Route>
    </Routes>
    </UserContextProvider>
  )
}

export default App
