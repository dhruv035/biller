
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import {getCookie} from 'cookies-next';
import {Header} from '../components/Header';
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
            temp=temp.sort((a,b)=>b.timestamp-a.timestamp)
            setData(temp);
}},[cookie]);

function handleClick(search:string){
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
    {data?.length&&<MyTable data={data} onclick={handleClick}/>}
    </div>
  </div>
  );
  
};

export default History;
