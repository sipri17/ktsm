import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import { useEffect, useState } from 'react'


export default function Root(){


    return (
        <div >
            <Navbar/>
            <Outlet />
        </div>
    )
}