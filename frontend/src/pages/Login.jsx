import React from 'react'
import { Link } from "react-router-dom"
import { useForm } from 'react-hook-form'


const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log("Login Form data:", data)
    }


    return (
        <>
            <div className="bg-slate-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-10 relative">
                <h1 className="text-4xl text-white font-bold text-center mb-6">Login </h1>
                <form onSubmit={handleSubmit(onSubmit)}>
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
                                    Password should contain at least one <br/> 
                                    uppercase letter, lowercase letter, <br/> digit, and special symbol.
                                </p>
                            </div>
                        )}
                    </div>

                    <div>
                        <span className='text-blue-900'>Forgot Password?</span>
                    </div>
                    <div className="form-control">
                        <label></label>
                        <button type="submit" className='w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-emerald-900 hover:bg-emerald-600 hover:text-white py-2 transition-colors duration-300'>Login</button>
                    </div>
                    <div>
                        <span>New Here? <Link to="/sign-up">Create an Account</Link></span>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login