import { createBrowserRouter, redirect } from "react-router-dom";
import Root from '../views/Root'
import Login from '../views/Login'
import FileList from "../views/FileList";
import NotFound404 from "../views/NotFound404" 
import PDFReader from "../views/PDFReader"



const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />,
        loader : ()=>{
            const loggedIn = localStorage.getItem('access_token')
            if(loggedIn){
                return redirect('/')
            }
            return loggedIn
        }
    }, 
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "/",
                element: <FileList />
            },   
            {
                path: "/readPDF/:fileCode",
                element: <PDFReader />
            },            
            {
                path: "*",
                element: <NotFound404 />
            },
           
        ],
        loader : ()=>{
            const loggedIn = localStorage.getItem('access_token')
            if(!loggedIn){
                return redirect('/login')
            }
            return loggedIn
        }
    }
]);

export default router