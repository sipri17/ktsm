import { useEffect, useState } from 'react'
import FileListRow from '../components/FileListRow'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFiles } from '../store/actions/actionCreator'
import baseUrl from '../utilities/baseUrl'



export default function FileList() {

    const fullName = localStorage.fullName
    const role = localStorage.role

    const { files } = useSelector(state => state.files)
    const dispatch = useDispatch()

    // const [files, setFiles] = useState()
    const [uploadFile, setUploadFile] = useState(null);

    const handleFileChange = (event) => {
        setUploadFile(event.target.files[0]);
    };

    const handleFileChangeUpdate = (event) => {
        setUploadFile(event.target.files[0]);
    };

    const handleUpload = () => {
        const formData = new FormData();
        formData.append('application', uploadFile);

        // Send the form data to the server using fetch or a similar method
        fetch(baseUrl + '/upload', {
            method: 'POST',
            headers: {
                // 'Content-Type': 'multipart/form-data',
                access_token: localStorage.access_token
            },
            body: formData,
        })
            .then((response) => {
                if (response.ok) {
                    console.log('File uploaded successfully');
                } else {
                    console.error('Error uploading file:', response.statusText);
                }
            })
            .then(_ => {
                dispatch(fetchFiles())
            })
            .catch((error) => {
                console.error('Error uploading file:', error);
            });
    };

    const handleUploadUpdate = () => {
        const formData = new FormData();
        formData.append('application', uploadFile);

        // Send the form data to the server using fetch or a similar method
        fetch(baseUrl + '/upload', {
            method: 'PUT',
            headers: {
                // 'Content-Type': 'multipart/form-data',
                access_token: localStorage.access_token
            },
            body: formData,
        })
            .then((response) => {
                if (response.ok) {
                    console.log('File uploaded successfully');
                } else {
                    console.error('Error uploading file:', response.statusText);
                }
            })
            .then(_ => {
                dispatch(fetchFiles())
            })
            .catch((error) => {
                console.error('Error uploading file:', error);
            });
    };




    useEffect(() => {
        dispatch(fetchFiles())
    }, [])

    




    if (files[0]) return (
        <>
            <div className='container'>
                <h1>Welcome {fullName} ({role})</h1>
                <div className='d-flex justify-content-between'>
                    <h2> File List</h2>
                    {/* <Link to='/movieForm' >
                        <button id='detailButton' className='btn btn-info my-2 '> Create Movie </button>
                    </Link> */}


                </div>
                <div className="mx-auto" >
                    <table className="table table-hover " >
                        <thead>
                            <tr className="text-center">
                                <th>#</th>
                                <th>File Name</th>
                                <th>File Code</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* <p>{files[0].name}</p> */}
                            {files ? files.map((file, index) => {
                                return <FileListRow file={file} key={index} index={index} />
                            }) :
                                <></>}
                        </tbody>
                    </table>
                </div>
                <div>
                    <div className='my-3'>
                        <h3 className='my-3'>Upload PDF</h3>
                        <input type="file" onChange={handleFileChange} />
                        <button onClick={handleUpload} disabled={!uploadFile} className='btn btn-info'>
                            Upload
                        </button>
                    </div>
                </div>

                <div className='my-3'>
                    <h3 className='my-3'>Upload updated PDF</h3>
                    <input type="file" onChange={handleFileChangeUpdate} />
                    <button onClick={handleUploadUpdate} disabled={!uploadFile} className='btn btn-info'>
                        Upload
                    </button>
                </div>
        </div >
        </>
    )
}

