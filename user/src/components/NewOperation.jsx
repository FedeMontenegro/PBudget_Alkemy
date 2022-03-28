import React, { Fragment, useState, useEffect } from 'react';
import { useForm, Controller } from "react-hook-form";
import { useCategories } from '../hooks/useCategories';
import { useOperations } from '../hooks/useOperations';
import "../css/newOperation.css"

const NewOperation = () => {
    let [categories, setCategories] = useState({});
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { userCategories } = useCategories();
    const { newOperation } = useOperations();

    useEffect(async () => {
        setCategories(await userCategories())
    }, []);

    const onSubmit = data => {
        newOperation(data)
    }

    return (
        <Fragment>
            <h3 className='h3-new-operation'>New Operation</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='form-new-operation-container'>
                    <label htmlFor="name" className="form-label">Name</label>
                    <input name='name' className="form-control form-control-sm" id="name" type="text" placeholder="name"
                        {...register("nameOperation", {
                            required: {
                                value: true,
                                message: "The field is empty."
                            }
                        })}
                    />
                    {<small className="sm-errors">{errors?.nameOperation?.message}</small>}
                    <br />
                    <label htmlFor="select-type" className="form-label">Type</label>
                    <select className="form-select form-select-sm" defaultValue=""
                        {...register("type", {
                            required: { value: true, message: "You must to select a type." }
                        })}
                    >
                        <option value="">Select type...</option>
                        <option value="Entry">Entry</option>
                        <option value="Egress">Egress</option>
                    </select>
                    {<small className="sm-errors">{errors?.type?.message}</small>}
                    <br />
                    <label htmlFor="select-category" className="form-label">Category</label>
                    <select className="form-select form-select-sm" defaultValue=""
                        {...register("categories", {
                            required: { value: true, message: "You must to select a category." }
                        })}
                    >
                        <option value="">Select Category...</option>
                        {categories?.data?.length > 0 ?
                            categories.data.map((element, id) => {
                                return <option key={id} value={element.id}>{element.name}</option>
                            })
                            : ""}
                    </select>
                    {<small className="sm-errors">{errors?.categories?.message}</small>}
                    <br />
                    <label htmlFor="amount" className="form-label">Amount</label>
                    <input name='amount' className="form-control form-control-sm" id="amount" type="number" placeholder="amount"
                        {...register("amount", {
                            required: {
                                value: true,
                                message: "The field is empty."
                            }
                        })}
                    />
                    {<small className="sm-errors">{errors?.amount?.message}</small>}
                    <br />
                    <label htmlFor="date" className="form-label">Date</label>
                    <input name='date' className="form-control form-control-sm" id="date" type="datetime-local" placeholder="amount"
                        {...register("date", {
                            required: {
                                value: true,
                                message: "The field is empty."
                            }
                        })}
                    />
                    {<small className="sm-errors">{errors?.date?.message}</small>}
                    <br />
                    <button type='submit' className='btn btn-primary btn-submit-new-operation'>Submit</button>
                </div>
            </form>
        </Fragment>
    )
}

export default NewOperation;
