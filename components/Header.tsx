import Link from "next/link";
import React, { useState } from "react";
import { Typography, TextField, Button, Paper } from "@mui/material";
import { useRouter } from "next/router";

export const Header = () => {
  const [uname,setUname]=useState("");
  const router = useRouter();
  function route(path){
    router.push(path);
  }
  
  return (
    <Paper className="flex flex-row z-10 h-[60px] fixed opacity-100 items-center w-full">
      <div className="flex mx-5 mt-2 mb-4">
        <Button 
        variant="text" 
        sx={{
          color:"#FF0000",
          height:"48px",
          fontFamily:"Comic Sans MS",
          fontSize:"3vw"}} 
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
          fontSize:"3vw"
        }}
        onClick={()=>route('/history')}
        >
        History
        </Button>
        <Button
        variant="text"
        sx={{
          marginLeft:"10px",
          color:"black",
          height:"48px",
          fontFamily:"Comic Sans MS",
          fontSize:"3vw"
        }}
        onClick={()=>route('/createMenu')}
        >
        Menu
        </Button>
      </div>

    </Paper>
  );
};