import { useState,useContext } from "react";
import {login} from '../services/authService';
import Noty from 'noty';  
import "../../node_modules/noty/lib/noty.css";  
import "../../node_modules/noty/lib/themes/mint.css"; 
import { useHistory } from "react-router";
import { UserContext } from "../App";

export default function LoginComponent()
{

    const {isLoggedIn,setLoggedIn} = useContext(UserContext);

    const history = useHistory();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");


    const handleEmail = (e)=>{
        console.log(e.target.vaule);
        setEmail(e.target.vaule);
    }

    const handlePassword = (e) =>{
        console.log(e.target.vaule);
        setPassword(e.target.value);
    }
    const handleSubmit = (e) =>{

        e.preventDefault();


        login(email,password)
        .then((data)=>{

            if(data)
            {
                new Noty({
                    type:'success',
                    text:'Logged In',
                    timeout:1000
                }).show();
                setLoggedIn(true);
                history.push('/');
                console.log("Loggedin?",isLoggedIn);
               
                console.log("Loggedin?",isLoggedIn);
            }
           
            
            

        }).catch(err=>{
            if(err)
            {   
                console.log("Error:",err);
                new Noty({
                    type:'error',
                    text:'Invalid Credentials',
                    timeout:1000
                }).show();
            }
            
            
        })
    }

    return (
        <>
        <div className="d-flex justify-content-center align-items-center vh-100">
        <div class="container shadow p-3 mb-3 rounded bg-white">
           <form onSubmit={handleSubmit}>
               <h3>Login Here</h3>
                <div class="form-group mb-3">
                    <label for="exampleInputEmail1">Email:</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="name@gmail.com"
                    onChange={(e)=>{setEmail(e.target.value)}} />
                    
                </div>
                <div class="form-group mb-3">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="*********" 
                    onChange={(e)=>{setPassword(e.target.value)}} />
                </div>
                <div class="form-group ">
                     <button type="submit" class="btn btn-primary">Login</button>
                </div>
                
            </form>


        </div>
        </div>
        </>
    );
}