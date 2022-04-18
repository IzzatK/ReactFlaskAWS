import React, {useEffect, useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import Recipe from './Recipe';
import UserCard from './UserCard'

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

  const renderRows = (users) => {
    //   let results = item.results
      let finalArr = [], columns = [];

    users.forEach((user, i) => {
        columns.push(
            <th key={i}> 
                    <UserCard user={user} />
                </th>
        )
        if((i+1) % 3 === 0){
            finalArr.push(<tr>{columns}</tr>)
            columns = [];
        }
    })

    return finalArr;
  }


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

          {UserDisplay(users)}

          <table>
              <tr>
            {renderRows(users)}
              </tr>
          </table>
        </div>
    )
}

export default AllUsersPage;