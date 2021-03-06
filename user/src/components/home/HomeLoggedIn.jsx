import React, { Fragment } from 'react';
import Balance from "../Balance";
import Shortcuts from "../Shortcuts";
import RankingOperations from '../RankingOperations';

const HomeLoggedIn = ({user}) => {

    return (
        <Fragment>
            <h1 className='h1-home'>Hi, {user.user_name}</h1>
            <div className="balance-ranking-container">
                <Balance balance = {user.balance}/>
                <Shortcuts />
                <RankingOperations />
            </div>
        </Fragment>
    )
}

export default HomeLoggedIn;