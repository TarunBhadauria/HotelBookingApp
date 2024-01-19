import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Components/common/Navbar';
import OpenRoutes from './routes/OpenRoutes';
import Login from './pages/LoginSignup/Login';
import Signup from './pages/LoginSignup/Signup';

function App() {
    return (
        <div className='h-full w-full bg-[#ffffff]'>
            <Navbar />

            <Routes>
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
