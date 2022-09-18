import Link from "next/link";
import React, { useState } from "react";
import { Typography, TextField, Button } from "@mui/material";
import { useRouter } from "next/router";

export const Header = () => {
  const [uname,setUname]=useState("");
  const router = useRouter();
  function route(path){
    if(path==="search"){
      router.push({
      pathname:"./search",
      query:{
          "search":uname,
      }
    })
    } else router.push(path);
  }
  
  return (
    <div className="flex flex-row items-center bg-green-600 w-full">
      <div className="flex mx-5 mt-2 mb-4">
        <Button 
        variant="text" 
        sx={{
          color:"#FF2",
          height:"48px",
          fontFamily:"Comic Sans MS",
          fontSize:"30px"}} 
        onClick={()=>route('/')}
        >
        Punks
        </Button>
        <Button
        variant="text"
        sx={{
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
        search
        </Button>
        <TextField 
        value={uname} 
        variant="filled"
        size="small"
        onKeyDown={(e)=>{if(e.key==="Enter")route("search")}}
        sx={{maxWidth:"400px"}} 
        placeholder={"search"} 
        className="bg-green-600" 
        onChange={(e)=>setUname(e.currentTarget.value)}
        inputProps={{padding:"20px 20px"}}
        />
      </div>
    </div>
  );
};