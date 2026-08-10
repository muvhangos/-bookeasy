
import { useState } from "react";
import {
createUserWithEmailAndPassword
} from "firebase/auth";

import {
doc,
setDoc
} from "firebase/firestore";

import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import "./Pages.css";

export default function CustomerRegister(){

const navigate=useNavigate();

const[name,setName]=useState("");
const[email,setEmail]=useState("");
const[password,setPassword]=useState("");

const register=async(e)=>{

e.preventDefault();

try{

const user=await createUserWithEmailAndPassword(
auth,
email,
password
);

await setDoc(
doc(db,"customers",user.user.uid),
{
name,
email,
role:"customer",
createdAt:new Date()
}
);

navigate("/customer/dashboard");

}catch(err){

alert(err.message);

}

};

return(

<div className="auth">

<div className="authCard">

<h2>Create Customer Account</h2>

<form onSubmit={register}>

<input
placeholder="Full Name"
onChange={(e)=>setName(e.target.value)}
/>

<input
type="email"
placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}
/>

<button>
Create Account
</button>

</form>

</div>

</div>

);

}