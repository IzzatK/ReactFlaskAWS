import React, {useEffect, useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import Recipe from './Recipe';

const AllUsersPage = ({title, description, user_id, id}) => {
    const [users, setUsers] = useState([]);
    const i = 0;
    // const {slug} = useParams();

    useEffect(() => {
        // console.log('slug is  ---->', slug);
        fetch(`/auth/users`).then(res => res.json()).then(data => 
                                                                    {
                                                                        setUsers(data); console.log(data);
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
        {/* {i < users.value.length ? (<>{users.value[0]}</>) : 'none'}   */}
        {/**load the user values into a useEffect statement, which'll loop over user.value.length */}
        {/* { i < users.value.length && (<>{users.value[i]}</>)} */}
        {users.value}
        
        
        </div>
    )
}

export default AllUsersPage;