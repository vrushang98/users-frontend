import { useEffect,useState } from "react";
import { getUser } from "../services/authService";
import { useHistory } from "react-router";
import axios from "axios";
import Noty from 'noty';  
import "../../node_modules/noty/lib/noty.css";  
import "../../node_modules/noty/lib/themes/mint.css"; 
export default function AddUserComponent()
{

    const history = useHistory();

    const [email,setEmail] = useState("");
    const [first_name,setfirstName] = useState("");
    const [last_name,setlastName] = useState("");
    const [role,setRole] = useState("user");
    const [city,setCity] = useState("");
    const [state,setState] = useState("");
    const [dob,setDOB] = useState("");


    const handleSubmit = (e) =>{

        e.preventDefault();

        

        const user = JSON.stringify({email,first_name,last_name,role,city,state,dob});
        const token = JSON.parse(localStorage.getItem("user")).accessToken;
        console.log(user);
        console.log("Token:",token);
        const headers ={headers:{"content-type":'application/json',"authorization":`Bearer ${token}`}};
        axios.post('http://localhost:5000/add_user',user,headers).then(res=>{
            if(res.data.message)
            {
                new Noty({
                    type:'success',
                    text:'User Added Successfully',
                    timeout:1000
                }).show();
                history.push('/show_users');
            }
            else
            {
                new Noty({
                    type:'error',
                    text:'Unable to add user',
                    timeout:1000
                }).show();
            }
        })


       
    }
    useEffect(()=>{


        const user = getUser();
        if(!user)
        {
            history.push('/login');
        }
    });
    return (
        <>
         <div className="d-flex justify-content-center align-items-center vh-100">
        <div class="container shadow p-3 mb-3 rounded bg-white">
           <form onSubmit={handleSubmit}>
               <h3>Add User</h3>
                <div class="form-group mb-3">
                    <label for="exampleInputEmail1">First Name:</label>
                    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Jim"
                    onChange={(e)=>{setfirstName(e.target.value)}} required/>
                    
                </div>
                <div class="form-group mb-3">
                    <label for="exampleInputEmail1">Last Name:</label>
                    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Carry"
                    onChange={(e)=>{setlastName(e.target.value)}} required/>
                    
                </div>
                <div class="form-group mb-3">
                    <label for="exampleInputEmail1">Email:</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="name@gmail.com"
                    onChange={(e)=>{setEmail(e.target.value)}} required/>
                    
                </div>
                <div class="form-group mb-3">
                    <label for="exampleInputEmail1">DOB:</label>
                    <input type="date" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
                    onChange={(e)=>{setDOB(e.target.value)}} required/>
                    
                </div>
                <div class="form-group mb-3">
                    <label for="exampleInputEmail1">Role:</label>
                   <select className="form-control" onChange={(e)=>{setRole(e.target.value)}}> 
                        <option value="admin">Admin</option>
                        <option value="manager">Manager</option>
                        <option value="user" selected>User</option>

                   </select>
                    
                </div>
                <div class="form-group mb-3">
                    <label for="exampleInputEmail1">City:</label>
                    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Ahmedabad"
                    onChange={(e)=>{setCity(e.target.value)}} required/>
                    
                </div>
                <div class="form-group mb-3">
                    <label for="exampleInputEmail1">State:</label>
                    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Gujarat"
                    onChange={(e)=>{setState(e.target.value)}} required/>
                    
                </div>
                <div class="form-group ">
                     <button type="submit" class="btn btn-primary">Add</button>
                </div>
                
            </form>


        </div>
        </div>

        </>
    
        );

}