import * as React from 'react';
import {useContext} from 'react';
import Card from '@mui/material/Card';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, Image} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import {useState, useEffect} from 'react';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import './Login.css';
import { AuthContext } from '../Context/AuthContext';
import insta from '../Assets/Instagram.jpg';
import bg from '../Assets/insta.png'
import img1 from '../Assets/img1.jpg';
import img2 from '../Assets/img2.jpg';
import img3 from '../Assets/img3.jpg';
import img4 from '../Assets/img4.jpg';
import img5 from '../Assets/img5.jpg';
import {Link, useHistory} from 'react-router-dom';
import {makeStyles} from '@mui/styles';import { bgcolor } from '@mui/system';
 {/*used for editing material UI components*/}

export default function Login() {
    const store=useContext(AuthContext);
    console.log(store);

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [loading, setLoading]=useState(false);
    const [error, setError]=useState('');
    const history=useHistory();
    
    const {login}=useContext(AuthContext);

    let handleClick=async()=>
    {
        try{
            setError('');
            setLoading(true);

            let res=await login(email,password);
            setLoading(false);
            history.push('/');
        }
        catch(err)
        {
            setError(err);
            setTimeout(()=>{
                setError('')
            },2000);

            setLoading(false);
        }
    }

    const useStyles=makeStyles({
        text1:{
            color: "grey",
            textAlign: "center"
        },
        card2:{
          height:"6vh",
          marginTop:"2%"
        },
        text2:{
            textAlign:"center"
        }

    }); {/*changes the color of the text*/}

    const classes=useStyles();

  return (
      <div className="loginWrapper">
          <div className="imgcar" style={{backgroundImage:'url('+bg+')', backgroundSize:"cover"}}>
              <div className="car">
              <CarouselProvider
                visibleSlides={1}
                totalSlides={5}
                // step={3}
                naturalSlideWidth={238}
                naturalSlideHeight={423}
                hasMasterSpinner
                isPlaying={true}
                infinite={true}
                dragEnabled={false}
                touchEnabled={false}
      >
        <Slider>
          <Slide index={0}><Image src={img1}/>I am the first Slide.</Slide>
          <Slide index={1}><Image src={img2}/>I am the second Slide.</Slide>
          <Slide index={2}><Image src={img3}/>I am the third Slide.</Slide>
          <Slide index={3}><Image src={img4}/>I am the third Slide.</Slide>
          <Slide index={5}><Image src={img5}/>I am the third Slide.</Slide>
        </Slider>
      </CarouselProvider>
              </div>
          </div>

          <div className="loginCard">
          <Card variant="outlined"> {/* sx changed to outlined as shadow not required */}

          <div className="insta-logo">
              <img src={insta} alt='insta-logo'></img>
          </div>
      

        {error != '' && <Alert severity="error">{error}</Alert>} {/*error code*/}

        <CardContent>
          <TextField id="outlined-basic" label="Email" variant="outlined"fullWidth={true} margin="dense" size="small" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
          <TextField id="outlined-basic" label="Password" variant="outlined"fullWidth={true} margin="dense" size="small" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
          <Typography className={classes.text2} color="primary" variant="subtitle1" component="div">
          Forget password?
          </Typography>
        </CardContent>
    
     
        <Button fullWidth={true} variant="contained" color="primary" onClick={handleClick} disabled={loading}>
          Log in
        </Button>
      
     
    </Card>

    <Card variant="outlined" className={classes.card2}>
    <CardContent>
          <Typography className={classes.text1} variant="subtitle1" component="div">
          Don't have an accountn? <Link to="/signup" style={{textDecoration:'none'}}>Sign up</Link>
          </Typography>
        </CardContent>
    </Card>
          </div>
      </div>
    
  );
}
