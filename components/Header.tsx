import Link from "next/link";
import React, { useState } from "react";
import { Typography, TextField, Button } from "@mui/material";
import { useRouter } from "next/router";

export const Header = () => {
  const [uname,setUname]=useState("");
  const router = useRouter();
  function route(path){
    router.push(path);
  }
  
  return (
    <div className="flex flex-row z-10 fixed items-center w-full">
      <div className="flex mx-5 mt-2 mb-4">
        <Button 
        variant="text" 
        sx={{
          color:"#FF0000",
          height:"48px",
          fontFamily:"Comic Sans MS",
          fontSize:"30px"}} 
        onClick={()=>route('/search')}
        >
        Billing
        </Button>
        <Button
        variant="text"
        sx={{
          marginLeft:"10px",
          color:"black",
          height:"48px",
          fontFamily:"Comic Sans MS",
          fontSize:"20px"
        }}
        onClick={()=>route('/history')}
        >
        History
        </Button>
      </div>
      <div className="flex grow flex-row-reverse">
        <Button
        variant="text"
        sx={{
          color:"white",
          height:"48px",
          alignItems:"flex-end",
          fontFamily:"Comic Sans MS"
        }}
        onClick={()=>route("search")}
        >
        Search
        </Button>
      </div>
    </div>
  );
};