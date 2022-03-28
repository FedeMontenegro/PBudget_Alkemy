import "../../css/home.css";
import React, { Fragment, useEffect, useState } from 'react';
import { useSession } from '../../hooks/useSession';
import HomeLoggedIn from "./HomeLoggedIn";
import HomeUnLoggedIn from "./HomeUnloggedIn";

const Home = () => {

    const { verifySession } = useSession();
    const [isValid, setIsValid] = useState(false);
    let [user, setUser] = useState({});

    useEffect(async () => {
        const verify = await verifySession()
        
        setIsValid(verify.session)
        setUser(verify.authData.user)
    }, [])
    
    return (
        <Fragment>
            {isValid ?
                < HomeLoggedIn user={user} />
                :
                < HomeUnLoggedIn />
            }
        </Fragment>
    )
}

export default Home;
