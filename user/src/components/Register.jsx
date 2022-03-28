import React, { Fragment, useState } from 'react';
import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { useSession } from '../hooks/useSession';
import "../css/register.css";

const Register = () => {

    const { newUser } = useSession();
    const { register, watch, formState: { errors }, handleSubmit } = useForm();

    const onSubmit = (data) => {
        newUser(data)
    }

    return (
        <Fragment>
            <div className='form-container'>
                <h2 className='h2-login'>Register</h2>
                <form onSubmit={handleSubmit(onSubmit)}>

                <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input 
                            name='username'
                            type="text" 
                            className="form-control" 
                            id="username" 
                            {...register("username", {
                                required: {
                                    value: true,
                                    message: "El campo está vacío."
                                }
                            })}
                            />
                        {<small className="sm-errors">{errors?.username?.message}</small>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input 
                            name='email'
                            type="email" 
                            className="form-control" 
                            id="exampleInputEmail1" 
                            aria-describedby="emailHelp" 
                            {...register("email", {
                                required: {
                                    value: true,
                                    message: "El campo está vacío."
                                },
                                pattern: {
                                    value: /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/,
                                    message: "El formato de email no es válido."
                                }
                            })}
                            />
                        {<small className="sm-errors">{errors?.email?.message}</small>}
                    </div>
                    
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            name='pass-register' 
                            type="password" 
                            className="form-control" 
                            id="pass" 
                            {...register("pass", {
                                required: {
                                    value: true,
                                    message: "El campo está vacío."
                                },
                                minLength: {
                                    value: 6,
                                    message: "El mínimo requerido es de 6 caracteres."
                                },
                                maxLength: {
                                    value: 12,
                                    message: "El máximo requerido es de 12 caracteres."
                                },
                                validate: (value) => value === watch("rePass") || "Las contraseñas no coinciden."
                                
                            })}
                        />
                        {<small className="sm-errors">{errors?.pass?.message}</small>}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Repeat Password</label>
                        <input
                            name="rePass-register" 
                            type="password" 
                            className="form-control" 
                            id="rePass" 
                            {...register("rePass", {
                                required: {
                                    value: true,
                                    message: "El campo está vacío."
                                },
                                minLength: {
                                    value: 6,
                                    message: "El mínimo requerido es de 6 caracteres."
                                },
                                maxLength: {
                                    value: 12,
                                    message: "El máximo requerido es de 12 caracteres."
                                },
                                validate: (value) => value === watch("pass") || "Las contraseñas no coinciden."
                            })}
                        />
                        {<small className="sm-errors">{errors?.rePass?.message}</small>}
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" name="checkTerms" 
                        {...register("checkTerms", {
                            required: {
                                value: true,
                                message: "Debes aceptar los términos y condiciones."
                            }
                        })}
                        />
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div>
                        {<small className="sm-errors">{errors?.checkTerms?.message}</small>}
                    <div className='btn-container'>
                        <button type="submit" className="btn btn-primary">Submit</button>
                        <Link className='register-link' to="/users/login">Login</Link>
                    </div>
                </form>
            </div>
        </Fragment>
    )
}

export default Register
