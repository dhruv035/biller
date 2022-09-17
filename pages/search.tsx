
import type { NextPage } from 'next';
import { Octokit } from 'octokit';
import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import {setCookie, getCookie} from 'cookies-next';
import {Header} from '../components/Header';
import { TextField, Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';

//Type for Cookies if Needed
type CookieType={
    searches:string[];
}

const Search: NextPage = () => {

    const [flag,setFlag]=useState(true)
    const [data, setData]=useState<any>();
    const router=useRouter();
    const octokit = new Octokit();

    //Fetch Github Data
    async function getData(username:string){
        //let data= await octokit.request('GET /users/'+username, {
        //})
        console.log('data :>> ', data);
        return 0;
      }

    console.log('search :>> ', router.query);
    //
    const cookie=getCookie('userCookies');

    useEffect(()=>{

        async function process(){
            //check if null
            if(router.query?.search&&typeof(router.query.search)==="string")
                {
                    console.log('here :>> ',router.query.search);
                    //add search to Cookies
                    addCookie(router.query.search);
                    try
                    {
                        let data= await getData(router.query.search);
                        console.log('dataa :>> ', data);
                        //set Data in state
                        if(data)
                        setData(data.data)}
                        catch(e){
                            //API Error Handling
                            console.log('Error :>> ', e);
                            setFlag(false)
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
  <div className="flex flex-col">
    <Header/>
    {
        data&&flag&&(
            <div>
                {data.login&&<Typography>Username: {data.login}</Typography>}
                {data.bio&&<Typography>Bio: {data.bio}</Typography>}
                <Typography>Name: {data.name}</Typography>
                
                
            </div>
        )
    }
  </div>

  );
  
};

export default Search;
