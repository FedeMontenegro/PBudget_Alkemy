import "../css/login.css";
import React, { Fragment } from 'react';
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSession } from "../hooks/useSession";

const Login = () => {

    const { initSession } = useSession();
    const { register, formState: { errors }, handleSubmit } = useForm();

    let onSubmit = data => {
        initSession(data)
    }

    return (
        <Fragment>
            <div className='form-container'>
                <h2 className='h2-login'>Login</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label htmlFor="text" className="form-label">Username/email address</label>
                        <input
                            type="text" 
                            className="form-control"
                            id="email" 
                            name="email"
                            aria-describedby="emailHelp" 
                            {...register("email",{
                                required: {
                                    value: true,
                                    message: "El campo está vacío."
                                }
                            })}
                        />
                        {<small className="sm-errors">{errors?.email?.message}</small>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="pass" className="form-label">Password</label>
                        <input type="password" name='pass' className="form-control" id="pass"
                            {...register("pass", {
                                required: {
                                    value: true,
                                    message: "El campo está vacío."
                                },
                                minLength: {
                                    value: 6,
                                    message: "El mínimo es de 6 caracteres."
                                },
                                maxLength: {
                                    value: 12,
                                    message: "El máximo es de 12 caracteres."
                                }
                            })}
                        />
                        {<small className="sm-errors">{errors?.pass?.message}</small>}
                    </div>
                    {<div className="mb-3 form-check">
                        <input name="check" type="checkbox" className="form-check-input" id="check"
                        {...register("checkSaveSession")}/>
                        <label className="form-check-label" htmlFor="check">Check me out</label>
                    </div>}
                    <div className='btn-container'>
                        <button type="submit" className="btn btn-primary btn-submit-login">Submit</button>
                        <Link className='register-link' to="/users/Register">Register</Link>
                    </div>
                </form>
            </div>
        </Fragment>
    )
}

export default Login;