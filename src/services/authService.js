


import axios from 'axios';


export const login = (email,password)=>{



    return new Promise((resolve,reject)=>{
        const headers ={headers:{"content-type":'application/json'}};

        return axios.post('http://localhost:5000/login',JSON.stringify({email:email,password:password}),headers)
        
        .then((res)=>{
    
    
                console.log("Res:",res);
                localStorage.setItem("user",JSON.stringify(res.data))
            
                console.log(res.error);
                
                resolve(res.data);
    
            
        })
        .catch(err=>{
            console.log("error",err);
           reject(err);
        });
    })
    

   
}

export const logout = () =>{

    localStorage.removeItem("user");
}


export const getUser = () =>{
    const user = localStorage.getItem("user");
    return user;
}