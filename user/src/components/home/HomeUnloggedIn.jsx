import React, { Fragment } from 'react';
import { Link } from "react-router-dom";
import "../../css/homeUnloggedIn.css";
import PBudget from "../../img/PBudget.svg";

const HomeUnloggedIn = () => {

    return (
        <Fragment>
            <div className="logo-container-home-unlogged-in">
                <Link to="/"><img className='logo-home-unlogged-in' src={PBudget} alt="pbudget" /></Link>
            </div>
            <div className="row cards-home-unlogged-in">
                <div className="col-sm-6 card-container-home-unlogged-in">
                    <div className="card-home-unlogged-in">
                        <div className="card-body">
                            <h5 className="card-title">LOG IN</h5>
                            <p className="card-text">And continue managing your income and expenses.</p>
                            <Link to="/users/login" className="btn btn-primary">Login</Link>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 card-container-home-unlogged-in">
                    <div className="card-home-unlogged-in">
                        <div className="card-body">
                            <h5 className="card-title">REGISTER</h5>
                            <p className="card-text">And start enjoying the benefits of managing your income and expenses with PBudget.</p>
                            <Link to="/users/register" className="btn btn-primary">Register</Link>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>

    )
}

export default HomeUnloggedIn;