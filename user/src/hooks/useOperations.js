import { useState } from "react";
import { useSession } from "./useSession";
import { useNavigate } from "react-router-dom";

export const useOperations = () => {

    const { verifySession, editUser, refreshToken } = useSession();
    const navigate = useNavigate()

    const rankingOperations = async () => {
        try {
            const userData = await verifySession();
            
            if (userData.status === 200) {
                const confirm = await fetch("http://localhost:3001/api/operations/ranking/" + userData.authData.user.id, { method: "POST" })
                const response = await confirm.json()
                const res = await response;

                if (res.meta.status === 200) {
                    return res;
                } else {
                    alert("An error occurred.")
                }

            } else {
                navigate("/")
            }
        } catch (error) {
            console.error(error)
        }

    }

    const myOperations = async () => {

        try {
            const userData = await verifySession();

            if (userData.status === 200) {

                const init = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ id: userData.authData.user.id })
                }
                const confirm = await fetch("http://localhost:3001/api/operations/list", init);
                const response = await confirm.json();
                const data = await response;

                if (data.meta.status === 200) {
                    return data;
                } else {
                    alert(data.meta.msg)
                }

            } else {
                navigate("/");
            }
        } catch (error) {
            console.error(error)
        }
    }

    const getOneOperation = async (id) => {

        const response = await fetch(`http://localhost:3001/api/operations/${id}`, { method: "POST" })
        const confirm = await response.json();
        const data = confirm;
        
        return data;
    }

    const createOperation = async (data) => {

        const init = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }

        const confirm = await fetch("http://localhost:3001/api/operations/new", init);
        const response = await confirm.json();
        const res = await response;

        return res;
    }

    const createRegistreOperation = async (data) => {
        const init = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }

        const response = await fetch("http://localhost:3001/api/operations/registres/new", init);
        const confirm = await response.json();
        const res = await confirm;

        return res;
    }

    const newOperation = async (body) => {

        const userData = await verifySession();

        if (userData.status === 200) {
            //Saving new operation...
            const data = {
                name: body.nameOperation,
                type: body.type,
                category_id: +body.categories,
                amount: body.amount,
                user_id: +userData.authData.user.id,
                created_at: body.date
            }

            const createOp = await createOperation(data);

            if (createOp.meta.status === 200) {
                //refreshing balance...
                let balance = refreshBalance(+userData.authData.user.balance, body.type, +body.amount);

                //Creating new registre operation...
                const newRegistre = {
                    user_id: userData.authData.user.id,
                    operation_id: createOp.data.id,
                    name: body.type,
                    category_id: createOp.data.operation_category_id,
                    detail: "Operation created at " + new Date()
                }

                const dataRegistre = await createRegistreOperation(newRegistre);

                if (dataRegistre.meta.status === 200) {
                    //Updating user info...
                    const user = {
                        ...userData.authData.user,
                        balance
                    }

                    const updateUser = await editUser(user, userData.authData.user.id)

                    if (updateUser.meta.status === 200) {
                        alert(createOp.meta.msg)
                        //Refreshing token...
                        //const refreshingToken = await refreshToken(user)

                        navigate("/users/my-operations");

                    }

                } else {
                    //Delete registres of operation and operation registre...
                    const destroyOp = await destroyOperation(createOp.data.id);
                    const destroyRegistreOp = await destroyRegistreOperation(createOp.data.id);
                    
                    alert("An error occurred. Try again.")
                }

            } else {
                alert(createOp.meta.msg)
            }
        } else {
            navigate("/")
        }
    }

    const updateOperation = async (data, id) => {
        console.log("hola update operation")
        const init = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }

        const confirm = await fetch("http://localhost:3001/api/operations/" + id + "/edit", init);
        const response = await confirm.json();
        const res = await response;

        return res;
    }

    const processUpdateOperation = async (body) => {
        const userData = await verifySession();

        if (userData.status === 200) {

            const opToEdit = await getOneOperation(body.id);
            if (opToEdit.meta.status === 200) {

                const data = {
                    name: body.name,
                    category: +body.category,
                    amount: body.amount,
                    type: opToEdit.data.type
                }

                const updateOp = await updateOperation(data, body.id)
                if (updateOp.meta.status === 200) {

                    const newRegistre = {
                        user_id: userData.authData.user.id,
                        operation_id: opToEdit.data.id,
                        name: body.type ? body.type : opToEdit.data.type,
                        category_id: +body.category ? +body.category : opToEdit.data.operation_category_id,
                        detail: "Operation updated at " + new Date()
                    }

                    const dataRegistre = await createRegistreOperation(newRegistre);
                    
                    if (dataRegistre.meta.status === 200) {
                        //Updating user info...
                        let differenceBalance = 0;

                        if (body.amount) {
                            differenceBalance = body.amount - opToEdit.data.amount;
                        }

                        const user = {
                            ...userData.authData.user,
                            balance: +userData.authData.user.balance + (parseFloat(differenceBalance))
                        }

                        const updateUser = await editUser(user, userData.authData.user.id)
                        
                        if (updateUser.meta.status === 200) {
                            alert(updateOp.meta.msg)
                            //Refreshing token...
                            //const refreshingToken = await refreshToken(user)

                            //navigate("/users/my-operations");

                        }

                    } else {
                        //Delete registres of operation and operation registre...
                        const rollbackOp = await updateOp(opToEdit.data, opToEdit.data.id)
                        
                        alert("An error occurred. Try again.")
                    }

                } else {
                    alert(updateOp.meta.msg)
                }
            } else {
                alert(opToEdit.meta.msg)
            }

        } else {
            navigate("/")
        }
    }

    const destroyOperation = async (id) => {

            try {
                const confirm = await fetch("http://localhost:3001/api/operations/" + id + "/destroy", { method: "DELETE" });
                const response = await confirm.json();
                const res = await response;
    
                return res;
            } catch (error) {
                console.error(error)
            }
    }

    const destroyRegistreOperation = async (id) => {

        try {
            const confirm = await fetch("http://localhost:3001/api/operations/registres/" + id + "/destroy", { method: "DELETE" });
            const response = await confirm.json();
            const res = await response;

            return res;
        } catch (error) {
            console.error(error)
        }
    }

    const refreshBalance = (userBalance, type, amount) => {

        let balance = 0;
        //refreshing balance...
        switch (true) {
            case type === "Entry":
                balance = parseFloat(userBalance) + parseFloat(amount);
                return balance;
            case type === "Egress":
                balance = parseFloat(userBalance) - parseFloat(amount);
                return balance;
            default:
                return balance;
        }
    }

    const processDestroyOperation = async (id) => {
        
        const userData = await verifySession();
        const op = await getOneOperation(id)
    
        if(op.meta.status == 200){
            
            if(window.confirm("Are you sure?")){
                const destroyOp = await destroyOperation(id);
        
                if(destroyOp?.meta?.status === 200){
                    
                    const newRegistre = {
                        user_id: userData.authData.user.id,
                        operation_id: id,
                        name: op.data.type,
                        category_id: +op.data.operation_category_id,
                        detail: "Operation deleted at " + new Date()
                    }
        
                    const dataRegistre = await createRegistreOperation(newRegistre);

                    if(dataRegistre.meta.status === 200) {
                        alert(destroyOp.meta.msg, destroyOp.meta.status)
                    } else {
                        alert(dataRegistre.meta.msg)
                    }
        
                } else {
                    alert("An error occurred. Try again.");
                }
            } else {
                alert("Cancelled.")
            }
        } else {
            alert(op.meta.msg)
        }
    }
    
    return {
        rankingOperations,
        myOperations,
        newOperation,
        refreshBalance,
        getOneOperation,
        processUpdateOperation,
        destroyOperation,
        processDestroyOperation
    }
}