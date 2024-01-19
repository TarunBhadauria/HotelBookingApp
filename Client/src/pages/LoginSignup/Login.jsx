import React, { useState } from 'react'
import style from './LoginSignup.module.css'
import { useNavigate } from 'react-router-dom'
import { signIn } from '../../services/operations/userAPI';
import { useDispatch } from 'react-redux';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        deviceId: 'Redmi-9-Power'
    })

    const handleOnChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    const handleOnSubmit = (e)=>{
        e.preventDefault();
        signIn(formData)(dispatch);
    }

    return (
        <div className={`${style.Login} ${style.LoginSignup}`}>
            <h1>
                Login
            </h1>
            <form onSubmit={handleOnSubmit}>
                <div>
                    <p>Enter your email: </p>
                    <input type='email' value={formData.email} name='email' onChange={handleOnChange} />
                </div>
                <div>
                    <p>Enter your email: </p>
                    <input type='password' value={formData.password} name='password' onChange={handleOnChange} />
                </div>
                <div>
                    <button type='submit'>Login</button>
                    <button onClick={() => navigate('/signup')}>Signup</button>
                </div>
            </form>
            <button onClick={()=>navigate('/')}>Go Home</button>
        </div>
    )
}

export default Login