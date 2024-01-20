import React, { useState } from 'react'
import style from './LoginSignup.module.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { signup } from '../../services/operations/userAPI';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

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
                <div>
                    <div className={`${style.field}`}>
                        <label>First Name:</label>
                        <input name='firstName' onChange={onChangeHandler} placeholder='Enter your first name' type='text' value={formData.firstName} />
                    </div>
                    <div className={`${style.field}`}>
                        <label>Last Name:</label>
                        <input name='lastName' onChange={onChangeHandler} placeholder='Enter your last name' type='text' value={formData.lastName} />
                    </div>
                </div>
                <div className={`${style.field}`}>
                    <label>Email:</label>
                    <input name='email' onChange={onChangeHandler} placeholder='Enter your email Id' type='email' value={formData.email} />
                </div>
                <div>
                    <div className={`${style.field}`}>
                        <label>Password:</label>
                        <input name='password' onChange={onChangeHandler} placeholder='Enter your password' type={showPassword ? 'text' : 'password'} value={formData.password} />
                        {
                            showPassword ? <FaEyeSlash onClick={() => setShowPassword(false)} /> : <FaEye onClick={() => setShowPassword(true)} />
                        }
                    </div>
                    <div className={`${style.field}`}>
                        <label>Confirm Password:</label>
                        <input name='confirmPassword' onChange={onChangeHandler} placeholder='Enter your confirm password' type={showConfirmPassword ? 'text' : 'password'} value={formData.confirmPassword} />
                        {
                            showConfirmPassword ? <FaEyeSlash onClick={() => setShowConfirmPassword(false)} /> : <FaEye onClick={() => setShowConfirmPassword(true)} />
                        }
                    </div>
                </div>
                <button onClick={() => navigate('/login')} > Login</button>
                <button type='submit'> Sign Up </button>
            </form>
            <button onClick={() => navigate('/')}>Go Home</button>
        </div>
    )
}

export default Signup