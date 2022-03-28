import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from "./useSession";

export const useCategories = () => {

    let [data, setData] = useState({})

    const navigate = useNavigate();
    const { verifySession } = useSession();

    const addCategory = async (category, user_id) => {

        try {
            alert("In process...")
            const init = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: category,
                    user_id: user_id
                })
            }
    
            const confirm = await fetch("http://localhost:3001/api/categories/new", init);
            const response = await confirm.json();
            const res = await response;
    
            return res;
            
        } catch (error) {
            return error;
        }
    }

    const userCategories = async () => {

        const data = await verifySession();

        switch (typeof data.status != "undefined") {
            case data.status === 200:
                try {
                    const response = await fetch("http://localhost:3001/api/categories/user/" + data.authData.user.id, { method: "POST" })
                    const confirm = await response.json();
                    const res = await confirm;
            
                    return res;
                } catch (error) {
                    console.error("An error occurred ", error)
                }
            case data.status === 300:
                navigate("/")
                break;
            default:
                break;
        }
    }

    const oneCategory = async (id) => {

        try {
            const confirm = await fetch("http://localhost:3001/api/categories/" + id, {method:"POST"})
            const response = await confirm.json();
            const data = await response
    
            return data;
            
        } catch (error) {
            console.error(error)
        }

    }

    const newCategory = async ({ category }) => {

        try {
            const userData = await verifySession();

            switch (true) {
                case userData.status === 200:

                    const processAddCategory = await addCategory(category, userData.authData.user.id)
                    alert(processAddCategory.meta.msg)
                    break;
                case userData.status === 300:

                    localStorage.removeItem("pbst")
                    sessionStorage.removeItem("pbst")
                    alert(userData.msg)
                    navigate("/");
                    break;
                default:
                    break;
            }

        } catch (error) {
            console.log("ERROR ", error)
        }

    }

    const editCategory = async ({ id, name }) => {

        try {
            const init = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name })
            }
    
            const confirm = await fetch("http://localhost:3001/api/categories/" + id + "/edit", init);
            const response = await confirm.json();
            const res = await response;
    

            switch(true){
                case res.data.length > 0:
                    alert("Succesfull edition.");
                    navigate("/users/my-categories")
                    break;
                case res.data.length === 0:
                    alert("An error occured. Try again.");
                    break;
                default:
                    break;
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    const deleteCategory = async (id) => {

        if(window.confirm("Are you sure?")) {

            try {
                const init = {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
        
                const confirm = await fetch("http://localhost:3001/api/categories/" + id + "/destroy", init);
                const response = await confirm.json();
                const data = await response;
        
                alert(data.meta.msg)
                
            } catch (error) {
                console.error(error)
            }

        } else {
            alert("Cancelled.")
        }

    }

    return { data, userCategories, newCategory, oneCategory, editCategory, deleteCategory }
}