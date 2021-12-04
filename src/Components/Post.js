import React from 'react'
import {useState, useEffect} from 'react'
import Avatar from '@mui/material/Avatar';
import { database } from '../firebase';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea, CardActions } from '@mui/material';
import Video from './Video';
import AddComment from './AddComment';
import Comments from './Comments';
import './Post.css';
import Like from './Like';
import Like2 from './Like2';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  
function Post({userData}) {
    const [posts, setPosts]=useState(null);
    
    const [open, setOpen] = React.useState(false);

    const callback=(entries)=>{
        entries.forEach((entry)=>{
            let ele=entry.target.children[0].children[0];
            console.log(ele);
            ele.play().then(()=>{
                if(!ele.paused && !entry.isIntersecting){
                    ele.pause();
                }
            })
        })
    }
      let observer = new IntersectionObserver(callback, ({threshold:0.6}));

      useEffect(()=>{
        const elements=document.querySelectorAll(".videos");
        elements.forEach((element)=>{
            observer.observe(element)
        })
        return()=>{
            observer.disconnect();
        }
      },[posts])

  const handleClickOpen = (id) => {
    setOpen(id);
  };

  const handleClose = () => {
    setOpen(null);
  };
    useEffect(()=>{
        let parr = []
        const unsub = database.posts.orderBy('createdAt','desc').onSnapshot((querySnapshot)=>{
            parr = []
            querySnapshot.forEach((doc)=>{
                let data = {...doc.data(),postId:doc.id}
                parr.push(data)
            })
            setPosts(parr)
        })
        return unsub
    },[])

    return (
        <div>
            {
                posts==null || userData==null ? <CircularProgress /> :
                <div className="video-container">
                   {
                       posts.map((post,index)=>(
                           <React.Fragment key={index}>
                               <div className="videos">
                                   <Video src={post.pUrl}/>
                                   <div className="fa" style={{display:"flex"}}>
                                    <Avatar src={userData.profileUrl} />
                                    <h4>{userData.fullname}</h4>
                                   </div>
                                   <Like userData={userData} postData={post}/>

                                   <ChatBubbleIcon className="chat-styling" onClick={()=>handleClickOpen(post.postId)}/>
                                   <Dialog
                                        open={open==post.postId}
                                        TransitionComponent={Transition}
                                        keepMounted
                                        onClose={handleClose}
                                        aria-describedby="alert-dialog-slide-description"
                                        fullWidth={true}
                                        maxWidth='md'
                                        >
                                        
                                        <div className="modal-container">
                                            <div className="video-modal">
                                                <video muted="muted">
                                                    <source src={post.pUrl}/>
                                                </video>
                                            </div>

                                            <div className="comment-modal">
                                            <Card className="card1" style={{padding:"1rem"}}>
                                                <Comments postData={post}/>
                                                </Card>

                                                <Card variant="outlined" >
                                                    <Typography style={{padding:"0.4rem"}} className="card2">
                                                    {post.likes.length==0 ? '' : `Liked by ${post.likes.length} users`}
                                                    </Typography>

                                                    <div style={{display:"flex"}}>
                                                        <Like2 postData={post} userData={userData} style={{display:"flex", alignItems:"center", justifyContent:"center"}}/>
                                                        <AddComment userData={userData} postData={post}/>
                                                    </div>
                                                </Card>
                                            </div>
                                        </div>
                                    </Dialog>
                               </div>

                               
                           </React.Fragment>
                       ))
                   }
                </div>
            }
        </div>
    )
}

export default Post
