
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import {useCookies} from 'react-cookie';
import {setCookie, getCookie} from 'cookies-next';
import {Header} from '../components/Header';
import { TextField, Button, Typography } from '@mui/material';
import {MyTable} from '../components/Table';
type CookieType={
    search:string;
    timestamp:string;
}
const History: NextPage = () => {
    const cookie=getCookie('userCookies');
    const [data,setData]=useState<CookieType[]>([])
    const router= useRouter();
    useEffect(()=>{
        if(typeof(cookie)==='string'){
            let temp=JSON.parse(cookie).searches;
            temp=temp.sort((a,b)=>{
                return b.timestamp-a.timestamp;
            })
            console.log('temp :>> ', temp);
        setData(temp);
}},[cookie]);
console.log("object");
function handleClick(search:string){
    console.log('search222 :>> ', search);
    router.push({
        pathname:"./search",
        query:{
            "search":search,
        }
    })
}
  return (
  <div className="flex flex-col">
    <Header/>
    <div className='mx-8 my-3 '>
    {/*
        data?.length&&(data.map((search:CookieType,index:number)=>{
            return(
                <div className="flex w-full justify-center">
                <Button variant="text" sx={{color:"#FF2",height:"48px",fontFamily:"Comic Sans MS",fontSize:"30px", margin:"0px 20px "}} onClick={()=>handleClick(search.search)}>
                     {search.search}
                 </Button>
                <Typography width={300} sx={{alignSelf:"center"}}key={index+"2"}>
                    {search.timestamp}
                </Typography>
                </div>
            )
        }))
    */}
    {
        data?.length&&(
            <MyTable data={data} onclick={handleClick}/>

           
        )
    }
    </div>
  </div>

  );
  
};

export default History;
