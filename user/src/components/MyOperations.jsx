import React, { Fragment, useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useOperations } from '../hooks/useOperations';
import "../css/myOperations.css";

const MyOperations = () => {

    const [operations, setOperations] = useState({});
    const { myOperations, processDestroyOperation } = useOperations();

    useEffect(async () => {
        setOperations(await myOperations())
    }, [Object.keys(operations).length])

    const refreshOperations = async () => {
        setOperations({});
    }

    const onClick = (e) => {
        processDestroyOperation(e.target.id)
        refreshOperations()
    }

    return (
        <Fragment>
            <h2 className='h2-my-operations'>My Operations</h2>
            {operations?.data?.length != 0 ?
                <table className="table table-bordered border-light table-operations">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Operation</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {operations?.data?.map((element, id) => {
                            return <tr key={id}>
                                <th scope="row">{id + 1}</th>
                                <td>{element.type}</td>
                                <td><Link to={`/users/my-operations/edit/${element.id}`} >
                                    <button id={element.id} type="button" className="btn btn-success">
                                        <i className="far fa-edit"></i>
                                    </button>
                                </Link></td>
                                <td>
                                    <button onClick={(e) => onClick(e)} id={element.id} type="button" className="btn btn-danger">
                                        <i className="far fa-trash-alt" id={element.id}></i>
                                    </button>
                                </td>
                            </tr>

                        })
                        }
                    </tbody>
                </table>
                : <p className='not-available-operations-p'>No operations available</p>}
            <Link to="/users/my-operations/new">
                <button className="more-container btn btn-primary">
                    <i className="fas fa-plus"></i>
                </button>
            </Link>
        </Fragment>
    )
}

export default MyOperations;