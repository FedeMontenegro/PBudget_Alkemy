import React, { Fragment } from 'react'
import "../css/resetPassword.css";
import Header from "./header/Header";

const ResetPassword = () => {
    return (
        <Fragment>
            < Header />
            <h3 className='h3-reset-password'>Reset Password</h3>
            <form action="">
                <div className='reset-password-container'>
                    <label for="inputPassword5" className="form-label">Password:</label>
                    <input type="password" id="inputPassword5" className="form-control"
                        aria-describedby="passwordHelpBlock" />
                    <label for="inputPassword5" className="form-label">Repeat Password:</label>
                    <input type="password" id="inputPassword5" className="form-control"
                        aria-describedby="passwordHelpBlock" />
                    <button type='submit' className='btn btn-primary btn-reset-password'>Submit</button>
                </div>
            </form>
        </Fragment>
    )
}

export default ResetPassword;
