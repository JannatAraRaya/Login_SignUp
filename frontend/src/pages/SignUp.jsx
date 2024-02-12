import React from 'react'
import { Link } from "react-router-dom"
import { useForm } from 'react-hook-form'


const SignUp = () => {
    const { register, watch, handleSubmit, formState: { errors } } = useForm();
    const password = watch("password", "");
    const onSubmit = (data) => {
        console.log("SignUp Form data:", data)
    }


    return (
        <>
            <div className="bg-slate-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-10 relative">
                <h1 className="text-4xl text-white font-bold text-center mb-6">Sign Up</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control relative my-4">
                        <label>Username</label>
                        <input
                            className='block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:text-white focus:border-green-800'
                            type="text"
                            name='username' placeholder='username' {...register("username", {
                                required: "Username is required."
                            })} />
                        {errors.email && <p className="text-red-700 text-sm mt-1 font-bold">{errors.email.message}</p>}
                    </div>
                    <div className="form-control relative my-4">
                        <label>Email</label>
                        <input
                            className='block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:text-white focus:border-green-800'
                            type="text"
                            name='email' placeholder='Email' {...register("email", {
                                required: "Email is required.",
                                pattern: {
                                    value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                                    message: "Email is not valid."
                                }
                            })} />
                        {errors.email && <p className="text-red-700 text-sm mt-1 font-bold">{errors.email.message}</p>}
                    </div>
                    <div className="form-control relative my-4">
                        <label>Password</label>
                        <input
                            className='block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:text-white focus:border-green-800'
                            type="password"
                            name="password"
                            placeholder='Password'
                            {...register("password", {
                                required: true,
                                validate: {
                                    checkLength: (value) => value.length >= 6,
                                    matchPattern: (value) =>
                                        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/.test(
                                            value
                                        )
                                }
                            })}
                        />
                        {errors.password?.type === "required" && (
                            <div>
                                <p className='text-red-700  text-sm mt-1 font-bold'>Password is required.</p>
                            </div>
                        )}
                        {errors.password?.type === "checkLength" && (
                            <div>
                                <p className='text-red-500 text-sm mt-1 font-bold'>
                                    Password should be at least 6 characters.
                                </p>
                            </div>
                        )}
                        {errors.password?.type === "matchPattern" && (
                            <div>
                                <p className="text-red-500 text-sm mt-1 font-bold">
                                    Password should contain at least one <br />
                                    uppercase letter, lowercase letter, <br /> digit, and special symbol.
                                </p>
                            </div>
                        )}
                    </div>
                    <div className="form-control relative my-4">
                        <label>confirm-password</label>
                        <input
                            className='block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:text-white focus:border-green-800'
                            type="password"
                            name="confirm-password"
                            placeholder='confirm-password'
                            {...register("confirm-password", {
                                required: true,
                            })}
                        />
                        {errors.password?.type === "required" && (
                            <div>
                                <p className='text-red-700  text-sm mt-1 font-bold'>Confirm Password is required.</p>
                            </div>
                        )}
                        {password !== "" && password !== undefined && (
                            <div>
                                {password === watch("confirm-password") ? (
                                    <p className="text-green-500 text-sm mt-1 font-bold">
                                        Passwords match!
                                    </p>
                                ) : (
                                    <p className="text-red-500 text-sm mt-1 font-bold">
                                        Passwords do not match.
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="form-control">
                        <label></label>
                        <button type="submit" className='w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-emerald-900 hover:bg-emerald-600 hover:text-white py-2 transition-colors duration-300'>Sign Up</button>
                    </div>
                    <div>
                        <span>Already have an account? <Link to="/login">Login</Link></span>
                    </div>
                </form>
            </div>
        </>
    )
}

export default SignUp