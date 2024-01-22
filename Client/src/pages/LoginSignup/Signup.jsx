import React, { useState } from 'react'
import style from './LoginSignup.module.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { signup } from '../../services/operations/userAPI';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import TextField from '@mui/material/TextField';

const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        accountType: 'user',
    })
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const onChangeHandler = (e) => {
        console.log(e);
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        signup(formData)(dispatch);
    }

    return (
        <div className={`${style.LoginSignup} ${style.signup}`}>
            <h1>Signup</h1>
            <form onSubmit={onSubmitHandler}>
                <div className={style.accountSelector}>
                    <label>
                        <input type='radio' name='accountType' onChange={onChangeHandler} checked={formData.accountType === 'user'} value='user' id='user' />
                        <p>User</p>
                    </label>
                    <label>
                        <input type='radio' name='accountType' onChange={onChangeHandler} checked={formData.accountType === 'owner'} value='owner' id='owner' />
                        <p>Owner</p>
                    </label>
                    <label>
                        <input type='radio' name='accountType' onChange={onChangeHandler} checked={formData.accountType === 'admin'} value='admin' id='admin' />
                        <p>Admin</p>
                    </label>
                </div>
                <div className={style.mainForm}>
                    <div className={style.multiField}>
                        <TextField required label="First Name" type='text' onChange={onChangeHandler} name='firstName' value={formData.firstName} />
                        <TextField required label="Last Name" name='lastName' onChange={onChangeHandler} type='text' value={formData.lastName} />
                    </div>
                    <TextField required label="Email" name='email' onChange={onChangeHandler} type='email' value={formData.email} />
                    <div className={style.multiField}>
                        <div>
                            <TextField required label='Password' name='password' onChange={onChangeHandler} type={showPassword ? 'text' : 'password'} value={formData.password} />
                            {
                                showPassword ? <FaEyeSlash onClick={() => setShowPassword(false)} /> : <FaEye onClick={() => setShowPassword(true)} />
                            }
                        </div>
                        <div>
                            <TextField required error={formData.password === formData.confirmPassword ? false : true} label='Confirm Password' name='confirmPassword' onChange={onChangeHandler} type={showConfirmPassword ? 'text' : 'password'} value={formData.confirmPassword} />
                            {
                                showConfirmPassword ? <FaEyeSlash onClick={() => setShowConfirmPassword(false)} /> : <FaEye onClick={() => setShowConfirmPassword(true)} />
                            }
                        </div>
                    </div>
                </div>
                <button type='submit'> Sign Up </button>
            </form>
            <div className={style.otherButtons}>
                <button onClick={() => navigate('/login')} > Login</button>
                <button onClick={() => navigate('/')}>Go Home</button>
            </div>
        </div>
    )
}

export default Signup