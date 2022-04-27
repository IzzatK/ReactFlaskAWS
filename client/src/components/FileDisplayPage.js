import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import {useAuth} from '../auth'
import PDFViewer from 'pdf-viewer-reactjs';

import '../styles/main.css'
//conditional render the Sign Up header if user.id is saved in localStorage (AKA user is logged in)


const FileDisplayPage = () => {
    const [files, setFiles] = useState([])


     useEffect(() => {
      fetch(`/upload/upload`).then(res => res.json()).then(data => {
          setFiles(data); console.log('files is -------->', files)
                           }).catch(err => console.log(err))
    }, [])

    return (
        <div>
        <p>File display here</p>
            {/* {files}   `'${f}'` */}
            <div>{files.map((f) => (<div> <PDFViewer document={{url: f }} />  </div>))}</div>
            {/* <div>{files.map((f) => (<div> <img src={f} />  </div>))}</div> */}
            <>{files.map((f) => (<div><Link to= {``} /></div>))}</>

        </div>
    )
}

export default FileDisplayPage