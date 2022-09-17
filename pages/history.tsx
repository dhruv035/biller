
import type { NextPage } from 'next';
import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import {useCookies} from 'react-cookie';
import {setCookie, getCookie} from 'cookies-next';
import {Header} from '../components/Header/Header';
import { TextField, Button, Typography } from '@mui/material';
type CookieType={
    searches:string[];
}
const Dashboard: NextPage = () => {
    const cookie=getCookie('userCookie');
    const [data,setData]=useState<string[]>([])
    useEffect(()=>{
        if(typeof(cookie)==='string'){
        setData(JSON.parse(cookie).searches);
}},[cookie]);
console.log("object");
  return (
  <div className="flex flex-col">
    <Header/>
    {
        data?.length&&(data.map((search:string,index:number)=>{
            return(
                <Typography key={index}>
                    {search}
                </Typography>
            )
        }))
    }
  </div>

  );
  
};

export default Dashboard;
