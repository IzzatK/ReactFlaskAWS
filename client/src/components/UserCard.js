import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import '../styles/main.css'

const UserCard = ({user}) => {
   
    return (
        <>
        <div
                    className="card col-md-3 col-xs-4 col-sm-4 offset-sm-1 offset-xs-1 col-xs-1"
                    style={{ width: "100%", border: "none" }}>
                    {/* <img
                    style={{ height: "auto", width: "202px" }}
                    className="img-thumbnail"
                    placeholder='profilepic'
                    /> */}
                    {console.log('user value------>', user[0], user[1])}
                    <div className="card-body">
                    <h5 className="card-title">{user}</h5>
                    {/* <p className="card-text">{user}</p> */}
                    <Link
                        to={`/user/${user}`}
                        className="btn btn-raised btn-primary btn-sm"
                    >
                        View Profile
                    </Link>
                    </div>
                </div></>
    )
}

export default UserCard;