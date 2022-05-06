import React, {useEffect, useState} from 'react'
import {useAuth} from '../auth'
import { useParams } from 'react-router-dom';
import PDFViewer from 'pdf-viewer-reactjs';

import '../styles/main.css'
//conditional render the Sign Up header if user.id is saved in localStorage (AKA user is logged in)


const SingleFilePage = () => {
    const fileindex = useParams();
    const finalfileindex = fileindex.slug //.slug
    const [files, setFiles] = useState([])
    const [currentFile, setCurrentFile] = useState([]);
    const [isValidUser, setIsValidUser] = useState(true);


     useEffect(() => {
      fetch(`/upload/upload`).then(res => res.json()).then(data => {
          setFiles(data); console.log('files is ------------>', files)
                           }).catch(err => console.log(err))

        // setIsValidUser(true);

        
    }, [])

  

    // componentDidMount(() => {
    //                        console.log('file url is -------->', fileindex);
    //     const theSingleFile = files[finalfileindex]
    //     setCurrentFile(theSingleFile);
    // })

   const seeURL = () => {
       console.log('params is ------>', fileindex, finalfileindex);
        console.log('file index and currentFile is -------->', fileindex, currentFile)

    }

    return (
        <div>
        <p>Single File display here</p>
           {/* <PDFViewer document={{url: fileurl}}/> */}
        <button onClick={seeURL}>see files</button>
        {console.log('files ---------->', files)}
        {console.log('file url is -------->', fileindex)}
        {/* <PDFViewer document={{url: currentFile }} />  */}

        <div>{files.map((f, i) => (<div> <PDFViewer document={{url: f }} />   </div>))}</div>

        </div>
    )
}

export default SingleFilePage