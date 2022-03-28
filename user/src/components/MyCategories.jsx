import "../css/myCategories.css";
import React, { Fragment, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useCategories } from '../hooks/useCategories';
import { useForm } from 'react-hook-form';
import NewCategory from "./NewCategory";

const MyCategories = () => {

    let [categories, setCategories] = useState({})
    const { userCategories, deleteCategory } = useCategories()
    const { handleSubmit } = useForm();

    const refreshCategories  = async () => {
        setCategories({})
    }

    useEffect(async () => {
        setCategories(await userCategories())
    }, [Object.keys(categories).length])

    
    const onSubmit = (e) => {
        deleteCategory(e.target.id)
        refreshCategories()
    }

    return (
        <Fragment>
            <h2 className='h2-my-operations'>My Categories</h2>
            {typeof categories.data != "undefined" ?
            <table className="table table-bordered border-light table-operations">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Category</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {typeof categories.data != "undefined" ?
                        categories.data.map((category, id) => {
                            return <tr key={id}>
                                <th scope="row">{id + 1}</th>
                                <td>{category.name}</td>
                                <td><Link to={"/users/my-categories/edit/" + category.id}>
                                    <button type="button" className="btn btn-success"
                                        data-bs-toggle="modal" data-bs-target="#exampleModal">
                                        <i className="far fa-edit"></i>
                                    </button>
                                </Link></td>
                                <td>
                                    <button onClick={(e)=> handleSubmit(onSubmit(e))} id={category.id} type="button" className="btn btn-danger"
                                        data-bs-toggle="modal" data-bs-target="#exampleModal">
                                        <i className="far fa-trash-alt" id={category.id}></i>
                                    </button>
                                </td>
                            </tr>
                        })
                        :
                        <tr>
                            <td colSpan={4}>Loading...</td>
                        </tr>
                    }
                </tbody>
            </table>
            : <p className='not-available-categories-p'>No categories available.</p>}
            <NewCategory refresh={refreshCategories}/>
        </Fragment>
    )
}

export default MyCategories;
