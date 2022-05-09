import React from 'react';
import { useEffect } from 'react';
import { useKeycloak } from 'react-keycloak'



const Secured = () => {
const {keycloak} = useKeycloak();

const username = keycloak.tokenParsed.preferred_username;

useEffect(() => {
  localStorage.setItem("username", keycloak.tokenParsed.preferred_username);
  // now that username is inside localStorage, you can create PostgreSQL queries,
  //in the form of search queries, individual entity accessor/getter methods, multiple or all entity accessor/getter methods,
  // and single entity controller/mutator/setter methods
}, [

])

const lsUsername = localStorage.getItem("username")



 return (
   <div>
     <h1 className="text-black text-4xl">Welcome to the Protected Page.</h1>
     <p>{username}</p>
   </div>
 );
};

export default Secured;