import React, { useState } from 'react'
import style from './LoginSignup.module.css'
import { useNavigate } from 'react-router-dom'
import { signIn } from '../../services/operations/userAPI';
import { useDispatch } from 'react-redux';
import { TextField } from '@mui/material';

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

    const handleOnSubmit = (e) => {
        e.preventDefault();
        signIn(formData)(dispatch);
    }

    return (
        <div className={`${style.Login} ${style.LoginSignup}`}>
            <h1>
                Login
            </h1>
            <form className={style.mainForm} onSubmit={handleOnSubmit}>
                <TextField required label='Email' type='email' value={formData.email} name='email' onChange={handleOnChange} />
                <TextField required label='Password' type='password' value={formData.password} name='password' onChange={handleOnChange} />
                <button type='submit'>Login</button>
            </form>
            <div className={style.otherButtons}>
                <button onClick={() => navigate('/signup')}>Signup</button>
                <button onClick={() => navigate('/')}>Go Home</button>
            </div>
        </div>
    )
}

export default Login