
import type { NextPage } from 'next';
import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import {useCookies} from 'react-cookie';
import {setCookie, getCookie} from 'cookies-next';
import {Header} from '../components/Header/Header';
import { TextField, Button } from '@mui/material';
type CookieType={
    searches:string[];
}
const Dashboard: NextPage = () => {
    const [uname, setUname]=useState<string>("");
    function handleChange(name:string){
        setUname(name);
    }
    const cookie=getCookie('userCookie');
    function handleClick(){
        if(cookie&&typeof(cookie)==="string")
        {
            let data = JSON.parse(cookie);
            data.searches?.push(uname)
            setCookie("userCookie",data);
        }
        else{
            let val=[];
            val.push(uname);
            setCookie("userCookie",{searches:val})
        }
    }
    console.log('cookie :>> ', cookie);
  return (
  <div className="flex flex-col">
    <Header/>
   <TextField value={uname} onChange={(e)=>handleChange(e.currentTarget.value)}/>
   <Button onClick={handleClick}>
   search
   </Button>
  </div>

  );
  
};

export default Dashboard;
