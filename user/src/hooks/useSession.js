import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useSession = () => {

    let navigate = useNavigate();
    const [check, setCheck] = useState(false)

    const newUser = async ({ username, email, pass, rePass, checkTerms }) => {

        try {
            const user = {
                user_name: username,
                email,
                password: pass,
                rePass,
                checkTerms
            }

            const init = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            }

            const confirm = await fetch("http://localhost:3001/api/users/register/new", init)
            const response = await confirm.json();
            const res = await response;

            if (res.meta.status === 200) {
                alert("Register successfully.")
                navigate("/users/login")
            }

        } catch (error) {
            console.log("Error al procesar registro ", error)
        }
    }

    const editUser = async (user, id) => {
        try {

            const init = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            }

            const confirm = await fetch("http://localhost:3001/api/users/" + id + "/update", init)
            const response = await confirm.json();
            const data = await response;

            return data;

        } catch (error) {
            console.error(error)
        }
    }

    const initSession = async ({ email, pass, checkSaveSession }) => {
        let data = {
            user: email,
            password: pass,
            check: checkSaveSession
        }

        let init = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        fetch("http://localhost:3001/api/users/login/session", init)
            .then(res => res.json())
            .then(response => {
                let res = {}
                switch (true) {
                    case response.meta.status === 100:
                        alert(response.meta.msg)
                        navigate("/")
                        break;
                    case response.meta.status === 200:
                        alert(response.meta.msg)
                        if (checkSaveSession) {
                            setCheck(true);
                            localStorage.setItem("pbst", response.token)
                        }
                        else {
                            sessionStorage.setItem("pbst", response.token)
                        }
                        res = {
                            session: true,
                            user: response.data
                        }
    
                        navigate("/")
                        return res;
                    case response.meta.status === 204:
                        alert(response.meta.msg)
                        res = {
                            session: false
                        }
        
                        return res;
                    case response.meta.status === 500:
                        alert(response.meta.msg)
                        res = {
                            session: false
                        }
        
                        return res;
                    default:
                        break;
                }
            })
            .catch(err => console.log(err))
    }

    const verifySession = async () => {

        try {
            if (localStorage.key("pbst") || sessionStorage.key("pbst")) {
                
                const token = localStorage.getItem("pbst") || sessionStorage.getItem("pbst")
    
                const verifyUser = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + token
                    }
                }
    
                const userRes = await fetch("http://localhost:3001/api/users", verifyUser)
                const userConfirm = await userRes.json();
                const userData = await userConfirm;
                
                let res = {};
                switch(true) {
                    case userData.status === 200:
                        res = {
                            status: userData.status,
                            session: true,
                            authData: userData.authData
                        }
    
                        return res;
                    default:
                        localStorage.removeItem("pbst")
                        sessionStorage.removeItem("pbst")
                        alert(userData.msg)
                        res = {
                            status: userData.status,
                            session: false
                        }
                        return res;
                }
            } else {
                const res = {
                    session: false
                }

                return res;
            }

        } catch (error) {
            return error;
        }
    }

    const refreshToken = async (data) => {
        
        try {

            const init = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            };

            const confirm = await fetch("http://localhost:3001/api/users/refresh", init);
            const response = await confirm.json();
            const res = await response;
            
            let dataReturn = {}

            switch(true) {
                case res.meta.status === 200 && data.check:
                    localStorage.setItem("pbst", JSON.stringify(res.token))
                    sessionStorage.removeItem("pbst")
                    
                    dataReturn = {
                        session: true,
                        token: res.token
                    }
                    return dataReturn;
                    
                case res.meta.status === 200 && !data.check:
                    sessionStorage.setItem("pbst", JSON.stringify(res.token))
                    localStorage.removeItem("pbst")
                    
                    dataReturn = {
                        session: true,
                        token: res.token
                    }
        
                    return dataReturn;
            }
        } catch (error) {
            console.error(error)
        }
    }

    const sessionOut = () => {
        console.log("Procesando...")
        localStorage.removeItem("pbst")
        sessionStorage.removeItem("pbst")
        const res = {
            session: false
        }

        return res;
    }

    return {
        initSession,
        verifySession,
        sessionOut,
        newUser,
        editUser,
        refreshToken
    }
}