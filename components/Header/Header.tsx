import Link from "next/link";
import React, { useState } from "react";
import { Typography, TextField, Button } from "@mui/material";
import { useRouter } from "next/router";

export const Header = () => {
  const [uname,setUname]=useState("");
  const router = useRouter();
  function handleClick(){
    router.push({
      pathname:"./search",
      query:{
          "search":uname,
      }
  })
  }
  return (
    <div className="flex flex-row items-center bg-green-600 w-full">
      <div className="flex mx-5 mt-2 mb-4">
      <Typography color={"#FF2"} fontSize={30}>Punks</Typography>
      </div>
      <div className="flex grow flex-row-reverse">
      
      <Button variant="text" sx={{color:"white",height:"48px",alignItems:"flex-end",fontFamily:"Comic Sans MS"}} onClick={handleClick}>
      search
      </Button>
      <TextField 
      value={uname} 
      variant="filled"
      size="small"
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