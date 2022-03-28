import "../css/newOperation.css";
import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useCategories } from "../hooks/useCategories";
import { useOperations } from "../hooks/useOperations";

const NewOperation = () => {

    let [categories, setCategories ] = useState({})
    let [operation, setOperation ] = useState({})
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { userCategories } = useCategories();
    const { getOneOperation, processUpdateOperation } = useOperations()
    const param = useParams();

    const onSubmit = data => {

        const op = {
            ...data,
            id: param.id
        }
        
        processUpdateOperation(op)
    }

    useEffect(async () => {
        setCategories(await userCategories())
    }, []);

    useEffect(async () => {
        setOperation(await getOneOperation(param.id))
    }, [typeof operation.data != "undefined"]);

    return (
        <Fragment>
            <h3 className='h3-new-operation'>Edit Operation</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='form-new-operation-container'>
                    <label htmlFor="name" className="form-label">Name</label>
                    <input name='name' className="form-control form-control-sm" id="name" type="text" defaultValue={operation?.data?.name} placeholder="name"
                        {...register("name", {
                            required: {
                                value: true,
                                message: "The field is empty."
                            }
                        })}
                    />
                    {<small className="sm-errors">{errors?.name?.message}</small>}
                    <br />
                    <label htmlFor="select-category" className="form-label">Category</label>
                    <select name='select-category' className="form-select form-select-sm" defaultValue={`${operation?.data?.operation_category_id}`}
                        {...register("category", {
                            required: {
                                value: true,
                                message: "You must select a category."
                            }
                        })}
                    >
                        {<option value="">Select Category...</option>}
                        {categories?.data?.length > 0 ?
                            categories.data.map((element, id) => {
                                return <option key={id} value={element.id}>{element.name}</option>
                            })
                            : ""}
                    </select>
                    {<small className="sm-errors">{errors?.category?.message}</small>}
                    <br />
                    <label htmlFor="amount" className="form-label">Amount</label>
                    <input type="number" name='amount' className="form-control form-control-sm" id="amount" defaultValue={operation?.data?.amount}
                        {...register("amount", {
                            required: {
                                value: true, message: "The field is empty."
                            }
                        })}
                    />
                    {<small className="sm-errors">{errors?.amount?.message}</small>}
                    <br />
                    <button type='submit' className='btn btn-primary btn-submit-new-operation'>Submit</button>
                </div>
            </form>
        </Fragment>
    )
}

export default NewOperation;