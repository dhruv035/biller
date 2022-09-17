
import type { NextPage } from 'next';
import { Octokit } from 'octokit';
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

    const octokit = new Octokit({
      })
      async function getData(username:string){
        let data = await octokit.request('GET /users/'+username, {
        })
        console.log('data :>> ', data);
        return data;
      }
      
    const [uname, setUname]=useState<string>("");
    const [data, setData]=useState({});
    const router=useRouter();
    console.log('search :>> ', router.query);
    const cookie=getCookie('userCookies');
    useEffect(()=>{

        async function process(){
            if(router.query?.search)
                {
                    console.log('here :>> ');
                addCookie();
                let data= await getData(uname);
                console.log('dataa :>> ', data);
                if(data)
                setData(data)
            }}
            process();
    },[router])
    function addCookie(){
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
    console.log('data :>> ', data);
  return (
  <div className="flex flex">
    <Header/>
  </div>

  );
  
};

export default Search;
