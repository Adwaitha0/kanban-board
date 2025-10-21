"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { makeGeneralPOSTApiCall } from "@/helper/api";


function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();  
    try{
      const data=await makeGeneralApiCall('/register','GET',{name,email,password})
      if(data.message==='Registered successfully'){
          alert('registered successfully');
          router.push('/user/login');
        }else{
          alert(data.message)
        }  
    }catch(error){
      console.error('Registration failed: ',err)
    }       
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#424242",
  };

  const formStyle = {
    backgroundColor: "#262626",
    padding: "32px",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    width: "400px",
    display: "flex",
    justifyContent:"left",
    flexDirection: "column",
    gap: "16px",
  };

 const buttonStyle = {
    padding: "10px",
    backgroundColor: "#6B6FF4",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  };
  const linkStyle = {
    color: "#6B6FF4",
    textDecoration: "underline",
    cursor: "pointer",
  };

   const inputStyle = {
    backgroundColor:'#323232',
    padding: "2%",
    borderRadius: "4px",
    fontSize: "16px",
     width:'100%'
  };


  return (
    <div style={containerStyle}>
      <form style={formStyle} onSubmit={handleSubmit}>
        <h2 style={{ textAlign: "center", fontSize: "24px", fontWeight: "bold", color: "white" }}  >Register</h2>


        <div style={{display:'flex', gap:'5px', width:'100%'}} >
          <input style={inputStyle}
            name="name"
            type="name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)} required
          />
        </div>

       

      
        <div style={{display:'flex', gap:'5px', width:'100%'}}>
          <input style={inputStyle}
            name="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

      
        <div style={{display:'flex', gap:'5px', width:'100%'}}>
          {/* <label style={{ display: "block", marginBottom: "4px", color: "#4b5563" }}>Password</label> */}
          <input style={inputStyle}
            name="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        
        <button style={buttonStyle} type="submit">Register</button>

              <p>
    Already have an account?{" "}
          <Link href="/user/login" style={linkStyle}>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default RegisterForm