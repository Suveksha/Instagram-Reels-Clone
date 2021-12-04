import React, {useState, useEffect} from 'react'
import FavoriteIcon from '@material-ui/icons/Favorite';
import { database } from '../firebase';
function Like2({userData, postData}) {
    const [like, setLike]=useState(null);

    const handleLike=()=>{
        if(like==true)
        {
            let narr=postData.likes.filter((el)=>el!=userData.userId)
            database.posts.doc(postData.postId).update({
                likes:narr
            })
        }
        else
        {
            let narr=[...postData.likes, userData.userId]
            database.posts.doc(postData.postId).update({
                likes:narr
            })
        }
    }


    useEffect(()=>{
        let check=postData.likes.includes(userData.userId)?true:false;
        setLike(check);
    },[postData])

    return (
        <div>
           {
               like!=null?
               <>
               {
                   like==true?<FavoriteIcon className={`like`} onClick={handleLike} style={{padding:'1rem', paddingTop:"0.5rem"}}/> :<FavoriteIcon className={`unlike2`} onClick={handleLike} style={{padding:'1rem',paddingTop:"0.5rem"}}/>
               }
               </>:
               <></>
           }
        </div>
    )
}

export default Like2
