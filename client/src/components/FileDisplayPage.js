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
            {/* {files}   `'${f}'` */} {/** create a Link which'll pass in the url as props into the reusable SingleFile component */}
            <div>{files.map((f, i) => (<div> <PDFViewer document={{url: f }} />  <Link to={`/singlefile/${i}`} > Link Here</Link> </div>))}</div>
            {/* <div>{files.map((f) => (<div> <img src={f} />  </div>))}</div> */}
            <>{files.map((f, i) => (<div><Link to= {`/singlfile/${i}`} /></div>))}</>

        </div>
    )
}

export default FileDisplayPage