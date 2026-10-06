import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from '../Common/Loader';
import apiClient from '../../utils/ApiClient';

const Sellers = () => {

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors]=useState("");

  const [name, setName] = useState('');
  // useEffect(() =>{
  //   // document.title = `Name is ${name}`;
  //   // const heading = document.querySelector('h3');
  //   // heading.style.color='red';

  //   console.log('Component Mount', name);
  //   return () =>{
  //     console.log('component Unmount')
  //   };
  // },[name]);

  useEffect(() =>{
    // fetch('https://jsonplaceholder.typicode.com/users')
    //   .then((resp) => resp.json())
    //   .then((data) => console.log(data))
    //   .catch((error) =>{
    //     console.log(error);
    //   });
      // setIsLoading(true);
      // axios.get('https://jsonplaceholder.typicode.com/users')
      //   .then((resp) => {
      //     setUsers(resp.data);
      //     setIsLoading(false);
      //   })
      //   .catch((e) =>{
      //     setErrors(e.message);
      //     setIsLoading(false);
      //   });
      fetchUsers();
  },[]);

  const fetchUsers = async () =>{
    try{
      setIsLoading(true);
    const res = await apiClient.get('/users');
    setUsers(res.data);
    setIsLoading(false);
    }catch(err){
      setErrors(err.message);
      setIsLoading(false);
    }finally{
      
    }
  };

  const addUser = () =>{
    const newUser={
      name,
      id:users.length + 1,
    };
    setUsers([newUser, ...users]);
    apiClient.post('/users', newUser)
      .then((resp) =>{
        setUsers([resp.data, ...users]);
      }).catch((err) =>{
        setErrors(err.message);
        setUsers(users);
      });
  };
  const deleteUser =(id)=>{
    setUsers(users.filter((u) => u.id !== id));
    apiClient.delete('/users/${id}')
      .catch((err) =>{
        setErrors(err.message);
        setUsers(users);
      });
  };

  const updateUser = (user) =>{
    const newUpdateUser = {
      ...user,
      name: user.name + "  Updated"
    };
    setUsers(users.map((u) => (u.id === user.id ? newUpdateUser : u)));
    apiClient.patch('/users/${user.id}', newUpdateUser)
      .catch((err) =>{
        setErrors(err.message);
        setUsers(users);
      });
  };


  return (
    <>
      <h3>Admin Seller page</h3>
      <input type='text' onChange={(e) =>{setName(e.target.value)}}/>
      <br />
      <button onClick={addUser}>Add User</button>
      <br />
      {isLoading && <Loader />}
      <br />
      {errors && <em>{errors}</em>}
      <table>
        <tbody>
          {
            users.map((user) =>(
              <tr key={user.id}>
                <td>
                  <p key = {user.id}>{user.name}</p>
                </td>
                <td>
                  <button onClick={() =>{deleteUser(user.id)}}>Delete</button>
                </td>
                <td>
                  <button onClick={() =>{updateUser(user)}}>Update</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </>
  )
}

export default Sellers;