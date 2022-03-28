import React, { Fragment } from 'react';
import "../css/balance.css";

const Balance = ({balance}) => {
    return (
        <Fragment>
            <div className='balance-container'>
                <h6 className='h6-balance'>Current Balance</h6>
                <h1 className='display-1'>${balance}</h1>
            </div>
        </Fragment>
    )
}

export default Balance;
