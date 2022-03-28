import {Fragment, useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import "../css/logout.css";

const Logout = () => {

    let [count, setCount] = useState(5)
    const navigate = useNavigate();

    const counting = () => {
        
        setInterval(()=> {
            if(count >= 0){
                setCount(count--)
            }
        }, 1000)
    }

    const redirect = () => {
        counting()
        setTimeout(()=> navigate("/"), 7000)
    }

    useEffect(()=> {
        redirect()
    }, [])


  return (
    <Fragment>
        <div className='logout-container'>
            <h3 className='logout-h3'>Session ended successfully</h3>
            <div className='logout-count-container'>
                <p className='logout-count-p'>{count}</p>
            </div>
            <h5 className='logout-h5'>Redirecting...</h5>
            <button onClick={()=> navigate("/")} type="submit" className="btn btn-dark btn-logout">Go to init</button>
        </div>
    </Fragment>
  )
}

export default Logout;