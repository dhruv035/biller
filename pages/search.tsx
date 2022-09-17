
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
      
    const [data, setData]=useState({});
    const router=useRouter();
    console.log('search :>> ', router.query);
    const cookie=getCookie('userCookies');
    useEffect(()=>{

        async function process(){
            if(router.query?.search&&typeof(router.query.search)==="string")
                {
                    console.log('here :>> ',router.query.search);
                addCookie(router.query.search);
                try
                {let data= await getData(router.query.search);
                console.log('dataa :>> ', data);
                if(data)
                setData(data)}
                catch(e){
                    console.log('e :>> ', e);
                }
            }}
            process();
    },[router])
    function addCookie(uname:string){
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
