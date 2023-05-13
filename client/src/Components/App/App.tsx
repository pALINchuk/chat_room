import styles from './App.module.sass'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {ErrorPage} from "../ErrorPage";
import {Login} from "../Login";
import {Register} from "../Register";

export const App = () => {

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

