import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ngrokUrl from '../utilities/ngrokUrl';


export default function FileListRow({ file, index }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const access_token = localStorage.getItem('access_token')


    // function handleDelete(){
    //     dispatch(deleteMovie(movie.id,setLoading))
    //         .then(()=>{
    //         })
    // }




    return (
        <>
            <tr className='text-center'>
                <td> {index + 1} </td>
                <td> {file.name}</td>
                <td> {file.fileCode}</td>
                <td>
                <a onClick={() => navigate(`/readPDF/${file.fileCode}`)} className='mx-2'>
                     <button className='btn btn-info'>Open</button>
                     </a>

                     <a href={`${ngrokUrl}/file/${access_token}/${file.fileCode}`} className='mx-2'>
                     <button className='btn btn-info'>Download</button>
                        </a>

                </td>


            </tr>

        </>
    )
}