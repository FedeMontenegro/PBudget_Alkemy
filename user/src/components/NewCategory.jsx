import "../css/newCategory.css";
import React, { Fragment, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useCategories } from '../hooks/useCategories';

const NewCategory = ({refresh}) => {

    const { newCategory } = useCategories();
    let { register, formState: { errors }, handleSubmit } = useForm();
    
    const clearInput = e => {
        e.target.parentElement.querySelector(".form-control").value = ""
    }

    const onSubmit  = (data, e) => {
        newCategory(data)
        setTimeout(()=> {
            refresh()
            clearInput(e)
        }, 3000)
    }

    return (
        <Fragment>
            <h6 className='h6-new-category'>Add a new category</h6>
            <form onSubmit={handleSubmit(onSubmit)} action="">
                <div className="form-category-container">
                    <input className="form-control" id="disabledInput" name='newCategory' type="text" placeholder="Insert your new category here."
                    {...register("category", {
                        required: {
                            value: true,
                            message: "You must enter a category."
                        }
                    })}
                    />
                    {<small className="sm-errors">{errors?.category?.message}</small>}
                    <button type='submit' className='btn btn-primary'>Confirm</button>
                </div>
            </form>
        </Fragment>
    )
}

export default NewCategory;