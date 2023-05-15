import styles from './App.module.sass'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {ErrorPage} from "../ErrorPage";
import {Login} from "../Login";
import {Register} from "../Register";
import {useState} from "react";


const API_ISAUTH_URL = 'http://localhost:3000/isAuthorized'




export const App = () => {

    const [isAuth, setIsAuth] = useState(false)
    const requireAuth = async () =>{
        const response = await fetch(API_ISAUTH_URL)
            .then(res => res.json())
            .then((data:{isAuth:boolean})=>setIsAuth(data.isAuth))
    }

    requireAuth()



    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={"index"}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="*" element={<ErrorPage/>}/>
                </Routes>
            </Router>
        </>
    )
}

