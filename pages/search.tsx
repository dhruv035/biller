
import type { NextPage } from 'next';
import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import {setCookie, getCookie} from 'cookies-next';
import {Header} from '../components/Header/Header';
import { TextField, Button } from '@mui/material';
import { useRouter } from 'next/router';
type CookieType={
    searches:string[];
}
const Search: NextPage = () => {
    const [uname, setUname]=useState<string>("");
    function handleChange(name:string){
        setUname(name);
    }
    const router=useRouter();
    console.log('search :>> ', router.query);
    const cookie=getCookie('userCookies');
    function handleClick(){
        if(cookie&&typeof(cookie)==="string")
        {
            let data = JSON.parse(cookie);
            data.searches?.push({
                search:uname,
                timestamp:Math.floor(Date.now()/1000)
            })
            setCookie("userCookies",data);
        }
        else{
            let val=[];
            val.push({
                search:uname,
                timestamp:Math.floor(Date.now()/1000)
            });
            setCookie("userCookies",{searches:val})
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

export default Search;
