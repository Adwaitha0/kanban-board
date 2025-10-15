import axios from 'axios';
import Swal from 'sweetalert2';
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 const router = useRouter();

const handleSubmit = async (e) => {
  e.preventDefault();
  console.log('handlesubmit hit');
  
  try {
    const response = await axios.post("http://localhost:4000/user/login", {
      email,
      password,
    });
    const data = response.data;
    
    if (data.message === 'User logged in') {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "User logged in successfully",
        background: "#1b1212ff",
        color: "#fff",
        confirmButtonText: "OK",
      }).then(() => {
        sessionStorage.setItem("token", data.token);
        router.push('/user/board');
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong",
        background: "#1b1212ff",
        color: "#fff",
        confirmButtonText: "OK",
      });
    }
  } catch (error) {
    console.log(error);
    Swal.fire({
      icon: "error",
      title: "Login Failed",
      text: error.response?.data?.message || 'Login failed',
      background: "#1b1212ff",
      color: "#fff",
      confirmButtonText: "OK",
    });
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

  const inputStyle = {
    backgroundColor:'#323232',
    padding: "2%",
    borderRadius: "4px",
    // border: "1px solid #ccc",
    fontSize: "16px",
     width:'100%'
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

  return (
    <div style={containerStyle}>
      <form style={formStyle} onSubmit={handleSubmit}>
        <h2 style={{ textAlign: "center", fontSize: "24px", fontWeight: "bold", color: "white" }}>
          Login
        </h2>

        <div style={{display:'flex', gap:'5px', width:'100%'}}>
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            required
          />
        </div>

        <div style={{display:'flex', gap:'5px', width:'100%'}}>
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
            required
          />
        </div>

       
        <button type="submit" style={buttonStyle}>
          Login
        </button>

       
        <p style={{ textAlign: "center", color: "#6b7280" }}>
          Don't have an account?{" "}
          <Link href="/user/register" style={linkStyle}>
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default LoginForm;
