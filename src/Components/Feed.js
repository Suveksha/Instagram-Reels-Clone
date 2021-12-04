import React, {useContext, useEffect, useState} from 'react'
import { AuthContext } from '../Context/AuthContext'
import { database } from '../firebase';
import Upload from './Upload';
import Post from './Post';
import Navbar from './Navbar';

function Feed() {
    const {logout, user}=useContext(AuthContext);
    const [userData, setUserData]=useState('');
    useEffect(()=>{
        const unsub=database.users.doc(user.uid).onSnapshot((snapshot)=>{
            setUserData(snapshot.data())
            return(()=>{
                unsub();
            })
        })
        
    },[user])

    
    return (
        <>
        <Navbar userData={userData}/>
        <div style={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
        {/* <div style={{width:'50%'}}>
            <h1>Welcome to Feed</h1>
            <button onClick={logout}>Log out</button>
        </div> */}

        
        <Upload user={userData}/>
        <Post userData={userData}/>
        </div>
        </>
    )
}

export default Feed
