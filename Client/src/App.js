import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/common/Navbar';
import OpenRoutes from './routes/OpenRoutes';
import Login from './pages/LoginSignup/Login';
import Signup from './pages/LoginSignup/Signup';
import Home from './pages/Home/Home';

function App() {
    return (
        <div className='h-full w-full bg-[#ffffff]'>
            <Navbar />

            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/login' element={
                    <OpenRoutes>
                        <Login />
                    </OpenRoutes>
                } />
                <Route path='/signup' element={
                    <OpenRoutes>
                        <Signup />
                    </OpenRoutes>
                } />
            </Routes>
        </div>
    );
}

export default App;
