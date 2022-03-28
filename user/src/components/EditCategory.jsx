import React, { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCategories } from '../hooks/useCategories';
import { useForm } from 'react-hook-form';
import "../css/editCategory.css";

const EditCategory = () => {

    let [category, setCategory] = useState({});
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { oneCategory, editCategory } = useCategories();
    let { id } = useParams();

    useEffect(async () => {
        setCategory(await oneCategory(id))
    }, [])

    const onSubmit = data => {

        const newCategory = {
            id,
            name: data.category
        }
        editCategory(newCategory)
    }


    return (
        <Fragment>
            <h3 className='h3-edit-category'>Edit Category</h3>
            <form action="" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-edit-category-container">
                    <input className="form-control" id="disabledInput" name='edit-category' type="text" placeholder="Edit your category."
                        {...register("category", {
                            required: { value: true, message: "You must enter a category." }
                        })}
                    />
                    {<small className="sm-errors">{errors?.category?.message}</small>}
                    <br />
                    <button className='btn btn-primary btn-confirm-edit-category'>Confirm</button>
                </div>
            </form>
        </Fragment>
    )
}

export default EditCategory;
