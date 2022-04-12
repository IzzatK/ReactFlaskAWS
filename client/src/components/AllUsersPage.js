import React, {useEffect, useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import Recipe from './Recipe';

const AllUsersPage = ({title, description, user_id, id}) => {
    const [users, setUsers] = useState([]);
    const [i, setI] = useState(0);
    const [arraySize, setArraySize] = useState(0);
    // const {slug} = useParams();

    useEffect(() => {
        // console.log('slug is  ---->', slug);
        fetch(`/auth/users`).then(res => res.json()).then(data => 
                                                                    {
                                                                        setUsers(data); console.log(data);
                                                                        setArraySize(data.length);
                                                                        console.log('array is', data);
                                                                        

                                                                    }).catch(err => console.log(err))

        // if(i < users.values.length) {

        // }

    }, [])

    

    // useEffect(() => {
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
        <div>Hello, load recipe into useState variables then display it into a RecipeCard</div>
        {/* {users.value[0]} */}
         {console.log('arraySize ------->', arraySize)}
         {console.log('users is --------->', users)}
         {/* {users.map((user) => <>{user}</>)} */}
        {/**load the user values into a useEffect statement, which'll loop over user.value.length */}
        {/* look at deleteRecipe method on HomePage */}
         {/* { i < arraySize ? (<><p>{users.value[i]}</p></>) : (<><p>none</p></>)}  */}
        {users.map((user) =>  (<div className='container'><div className='row'><Link to ={`/user/${user}`}>{user}</Link></div></div>))}
        
        
        </div>
    )
}

export default AllUsersPage;