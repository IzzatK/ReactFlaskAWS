import React, {useEffect, useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import Recipe from './Recipe';
import UserCard from './UserCard'
import '../styles/main.css'

const AllUsersPage = ({title, description, user_id, id}) => {
    const [users, setUsers] = useState([]);
    const [i, setI] = useState(0);
    const [increment, setIncrement] = useState(0);
    const [arraySize, setArraySize] = useState(0);
    // const {slug} = useParams();

    useEffect(() => {
        // console.log('slug is  ---->', slug);
        fetch(`/auth/users`).then(res => res.json()).then(data => 
                                                                    {
                                                                        setUsers(data); console.log(data);
                                                                        setArraySize(data.length);
                                                                        console.log('array is', data, arraySize);
                                                                        

                                                                    }).catch(err => console.log(err))

        // if(i < users.values.length) {

        // }

    }, [])

  const IncrementValue = () => setIncrement(i+=1)

//   const renderRows = (users) => {
//     //   let results = item.results
//       let finalArr = [], columns = [];

//     users.forEach((user, i) => {
//         columns.push(
//             <th key={i}> 
//             {console.log('user is --------->', user, i)}
//                     <UserCard user={user} />
//             </th>
//         )
//         if((i+1) % 3 === 0){
//             finalArr.push(<tr>{columns}</tr>)
//             columns = [];
//         }
//     })

//     return finalArr;
//   } render rows of 3 cols each


  const renderRows2 = (users) => {
    // array of N elements, where N is the number of rows needed
    const rows = [...Array( Math.ceil(users.length / 4) )]; //change the 4 4 4 values below to x x x to change amount of cols per row
    // chunk the products into the array of rows
    const userRows = rows.map( (row, idx) => users.slice(idx * 4, idx * 4 + 4) ); ;
    // map the rows as div.row
    const content = userRows.map((row, idx) => (
        <tr key={idx}>    
          { row.map( user => <th key={user} className="col-md-3">                    
          <                         UserCard user={user} />
                             </th> 
           )}
        </tr> )

    )

        return (
            <table>
                {content}
            </table>
        )

       
}

const renderRows3 = (users) => {
    // array of N elements, where N is the number of rows needed
    const rows = [...Array( Math.ceil(users.length / 4) )]; //change the 4 4 4 values below to x x x to change amount of cols per row
    // chunk the products into the array of rows
    const userRows = rows.map( (row, idx) => users.slice(idx * 7, idx * 7 + 7) ); ;
    // map the rows as div.row
    const content = userRows.map((row, idx) => (
        <tr key={idx}>    
          { row.map( user => <th key={user} className="col-md-1">                    
          <                         UserCard user={user} />
                             </th> 
           )}
        </tr> )

    )

        return (
            <table>
                {content}
            </table>
        )

       
}

const renderRows4 = (users) => {
    // array of N elements, where N is the number of rows needed. Change the divisor of rows to 3 if a 3rd row is needed.
    //because users length is 8 and ceiling of 8/3 is 3, resulting in 3 rows
    const rows = [...Array( Math.ceil(users.length / 3) )]; //change the 4 4 4 values below to x x x to change amount of cols per row
    // chunk the products into the array of rows
    const userRows = rows.map( (row, idx) => users.slice(idx * 3, idx * 3 + 3) ); ;
    // map the rows as div.row
    const content = userRows.map((row, idx) => (
        <tr key={idx}>    
          { row.map( user => <th key={user} className="col-md-1">                    
          <                         UserCard user={user} />
                             </th> 
           )}
        </tr> )

    )

        return (
            <table>
                {content}
            </table>
        )

       
}

//   const renderRows2 = (users) => {
//     //   let results = item.results
//       let finalArr = [], columns = [];

//     users.forEach((user, i) => {
//         columns.push(
//             <th key={i}> 
//             {console.log('user is --------->', user, i)}
//                     <UserCard user={user} />
//             </th>
//         )
//         if((i+1) % 4 === 0){
//             finalArr.push(<tr>{columns}</tr>)
//             columns = [];
//         }
//     })

//     return finalArr;
//   }


  const UserDisplay = (users) => (
      
    <>
        <table>
            <tr>
             {users.map((user) =>  ( 
                <th> 
                    <UserCard user={user} />
                </th>
                ))
              } 
              </tr>
        </table>      

    </>
    )
    

    // useEffect(() => { //                // <><UserCard user={user} /></> bootstrap row didnt work for above funcn, but UserDisplay did work with table; tr; and th looped over each element

    //     fetch(`/recipe/recipe/${slug}`).then(res => res.json()).then(data => 
    //           {
    //                 // console.log(data);                     
    //                  setRecipe(data);
    //           }).catch(err => console.log(err))
    //         //   { register('title', {value: title} )}
    //         //   { register('description', {value: description})}
    //  }, [])
   
    return (
        <div className='container'>    
            <div className='col-6'>
          {users.map((user) =>    (<><>  {user} </></>)
          
          ) }
          </div>
          {/* <div className='container'>
          <div className='col-6'>
              <div className='row'>
          {UserDisplay(users)}
          </div>
          </div>
          </div> */}

          {/* {UserDisplay(users)} */}

          {/* <table>
              <tr>
            {renderRows(users)}
              </tr>
          </table> */}
    <div id="displaySMdown">{renderRows2(users)}</div>
         
        
      <div id="displayMDup">{renderRows3(users)}</div>  

      <div id="displayXSdown">{renderRows4(users)}</div> 

      <div id="displayLGup">{/**display rows of 11 usercards each here. probably must add rows to fit users in other functions as done in renderRows4. */}</div>

          
        </div>

        
    )
}

export default AllUsersPage;