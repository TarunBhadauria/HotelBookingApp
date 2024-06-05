import React, { useState } from "react";
import style from "./LoginSignup.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signup } from "services/operations/userAPI";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues:{
        accountType:"user"
    }
  });


  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const onSubmitHandler = (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Password donot match");
    } else {
        dispatch(signup(data));
    }
  };

  return (
    <div className={`${style.LoginSignup} ${style.signup}`}>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <div className={style.accountSelector}>
          <label>
            <input
              type="radio"
              name="accountType"
              id="user"
              value="user"
              {...register("accountType", { required: "gender is required" })}
            />
            <p>User</p>
          </label>
          <label>
            <input
              type="radio"
              name="accountType"
              value="owner"
              id="owner"
              {...register("accountType", {
                required: "Account type is required",
              })}
            />
            <p>Owner</p>
          </label>
          <label>
            <input
              type="radio"
              name="accountType"
              value="admin"
              id="admin"
              {...register("accountType", {
                required: "Account type is required",
              })}
            />
            <p>Admin</p>
          </label>
        </div>
        {errors.accountType && <p>{errors.accountType.message}</p>}
        <div className={style.mainForm}>
          <div className={style.multiField}>
            <TextField
              name="firstName"
              type="text"
              id="firstName"
              {...register("firstName", { required: "First name is required" })}
              placeholder="FirstName"
            />
            {errors.firstName && <p>{errors.firstName.message}</p>}
            <TextField
              name="lastName"
              type="text"
              id="lastName"
              placeholder="LastName"
              {...register("lastName", { required: "Last name is required" })}
            />
            {errors.lastName && <p>{errors.lastName.message}</p>}
          </div>
          <TextField
            label="Email"
            name="email"
            type="email"
            {...register("email", {
              required: "email is required",
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && <p>{errors.email.message}</p>}
          <div className={style.multiField}>
            <div>
              <TextField
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                id="password"
                {...register("password", { required: "password is required" })}
              />
              {errors.password && <p>{errors.password.message}</p>}
              {showPassword ? (
                <FaEyeSlash onClick={() => setShowPassword(false)} />
              ) : (
                <FaEye onClick={() => setShowPassword(true)} />
              )}
            </div>
            <div>
              <TextField
                label="Confirm Password"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                {...register("confirmPassword", {
                  required: "confirm password is required",
                })}
              />
              {showConfirmPassword ? (
                <FaEyeSlash onClick={() => setShowConfirmPassword(false)} />
              ) : (
                <FaEye onClick={() => setShowConfirmPassword(true)} />
              )}
              {errors.confirmPassword && (
                <p>{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>
        </div>
        <button type="submit"> Sign Up </button>
      </form>
      <div className={style.otherButtons}>
        <button onClick={() => navigate("/login")}> Login</button>
        <button onClick={() => navigate("/")}>Go Home</button>
      </div>
    </div>
  );
};

export default Signup;
