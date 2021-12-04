import * as React from 'react';
import {useContext} from 'react';
import { database, storage } from '../firebase';
import Card from '@mui/material/Card';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import {useState, useEffect} from 'react';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import './SignUp.css';
import { AuthContext } from '../Context/AuthContext';
import insta from '../Assets/Instagram.jpg';
import {Link, useHistory} from 'react-router-dom';
import {makeStyles} from '@mui/styles'; {/*used for editing material UI components*/}

export default function SignUp() {

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [name,setName]=useState('');
    const [file,setFile]=useState(null);
    const [error, setError]=useState('');
    const [loading, setLoading]=useState(false);

    const {signup}=useContext(AuthContext);

    const history=useHistory();//react-router-dom
    
    const useStyles=makeStyles({
        text1:{
            color: "grey",
            textAlign: "center"
        },
        card2:{
          height:"6vh",
          marginTop:"2%"
        }

    }); {/*changes the color of the text*/}

    const classes=useStyles();

    let handleClick=async()=>{
      if(file==null)
      setError("Please upload profile image first");
      setTimeout(()=>{
        setError('')
      },2000);

      try{
        setError('');
        setLoading(true);
        let userObj=await signup(email, password);
        let uid=userObj.user.uid;
        console.log(uid);

          const uploadTask= storage.ref(`/users/${uid}/ProfileImage`).put(file);
          uploadTask.on('state_changed',fn1,fn2,fn3);

          function fn1(snapshot)
          {
              let progress=(snapshot.bytesTransferred/snapshot.totalBytes) * 100;
              console.log(`Upload is ${progress}% done.`);

          }
          
          function fn2(error)
          {
            setError("Please upload profile image first");
            setTimeout((error)=>{
              setError('')
            },2000);

            setLoading(false);
            return;
          }

          function fn3(snapshot)
          {
              uploadTask.snapshot.ref.getDownloadURL().then((url)=>
              {
                  console.log(url);
                  database.users.doc(uid).set({
                    email:email,
                    userId:uid,
                    fullname:name,
                    profileUrl:url,
                    createdAt:database.getTimeStamp()
                  })
              })

              setLoading(false);
              history.push('/');

          }
      }
  
      catch(err)
      {
        if(file==null){
        setError(err);
        setTimeout(()=>{
          setError('')
        },2000);
      }
    }

    }

    
  return (
      <div className="signupWrapper">
          <div className="signupCard">
          <Card variant="outlined"> {/* sx changed to outlined as shadow not required */}

          <div className="insta-logo">
              <img src={insta} alt='insta-logo'></img>
          </div>
      

        {error!='' && <Alert severity="error">{error}</Alert>} {/*error code*/}

        <CardContent>
          <Typography className={classes.text1} variant="subtitle1" component="div">
            Sign up to see photos and videos from your friends.
          </Typography>
          <TextField id="outlined-basic" label="Email" variant="outlined"fullWidth={true} margin="dense" size="small" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
          <TextField id="outlined-basic" label="Password" variant="outlined"fullWidth={true} margin="dense" size="small" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
          <TextField id="outlined-basic" label="Full Name" variant="outlined"fullWidth={true} margin="dense" size="small" value={name} onChange={(e)=>{setName(e.target.value)}} />
          <Button size="small" color="primary" fullWidth={true} variant="outlined" margin="dense" color="secondary" startIcon={<CloudUploadIcon/>} component="label">
          Upload Profile Image
          <input type="file" accept="image/*" hidden onChange={(e)=>{setFile(e.target.files[0])}}></input>
        </Button>
        </CardContent>

      
        <Button fullWidth={true} variant="contained" color="primary" disabled={loading} onClick={handleClick}>
          Sign Up
        </Button>
 
      <CardContent>
          <Typography className={classes.text1} variant="subtitle1" component="div">
          By signing up, you agree to our Terms, Conditions and Cookies policy.
          </Typography>
        </CardContent>
    </Card>

    <Card variant="outlined" className={classes.card2}>
    <CardContent>
          <Typography className={classes.text1} variant="subtitle1" component="div">
          Having an account ? <Link to="/login" style={{textDecoration:'none'}}>Login</Link>
          </Typography>
        </CardContent>
    </Card>
          </div>
      </div>
    
  );
}
