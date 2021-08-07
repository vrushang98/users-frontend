import { useEffect,useState } from "react";
import { getUser } from "../services/authService";

import { useHistory } from "react-router";
import axios from "axios";
import MaterialTable from 'material-table';
export default function ShowUsersComponent(){


    const [users,setUsers] = useState([]);
    const history = useHistory();
    useEffect(()=>{
        const user = getUser();
        if(!user)
        {
            history.push('/login');
        }
        else
        {
            const token = JSON.parse(localStorage.getItem("user")).accessToken;
    
        const headers ={headers:{"content-type":'application/json',"authorization":`Bearer ${token}`}};
        axios.get('http://localhost:5000/show_user',headers).then(res=>{
            console.log(res.data);

            setUsers(res.data);
        });
        }
        
    });



    const columns=[
        
        {title:"First_Name",field:"first_name"},
        {title:"Last_Name",field:"last_name"},
        {title:"Email",field:"email"},
        {title:"DOB",field:"dob"},
        {title:"City",field:"city"},
        {title:"State",field:"state"},
        {title:"Role",field:"role"}
    
    ]
    return (<>
    <div>

        <div style={{width:"100%",height:"100vh",display:"flex",justifyContent:"center",alignItems:"center"}}>
        <MaterialTable  columns={columns} title="Users" data={users}/>
        </div>

        

    </div>
    </>)
}