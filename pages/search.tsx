
import type { NextPage } from 'next';
import axios from "axios";
import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import {setCookie, getCookie} from 'cookies-next';
import {Header} from '../components/Header';
import { TextField, Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import {getUserData, getUserRepoData} from '../services/searchUser';
//Type for Cookies if Needed
type CookieType={
   searches:string[];
}

type GithubData={
   name:string;
   email?:string;
   login:string;
   bio?:string;
}
type RepoData={
   name?:string;
   private?:boolean;
   url?:string;
}
const Search: NextPage = () => {

   const [flag,setFlag]=useState(true)
   const [data, setData]=useState<GithubData>();
   const [repoData, setRepoData]=useState<RepoData[]>();
   const router=useRouter();
   const cookie=getCookie('userCookies');
   
   console.log('search :>> ', router.query);
   useEffect(()=>{
      //write async function to run in the hook
      async function process(){
            //check if null
            if(router.query?.search&&typeof(router.query.search)==="string")
               {
                  console.log('here :>> ',router.query.search);
                  //add search to Cookies
                  addCookie(router.query.search);
                  try
                  {
                     let data= await getUserData(router.query.search);
                     let data2= await getUserRepoData(router.query.search);
                     console.log('dataa :>> ', data2);
                     //set Data in state
                     if(data)
                     {
                        console.log('data.name :>> ', data.name);
                        if(data.name===null)
                        setFlag(false)
                        else
                        {
                           setData(data);
                           setRepoData(data2)
                           setFlag(true);
                        }
                     }
                  }    
                     catch(e){
                        //API Error Handling
                        console.log('Error :>> ', e);
                        setFlag(false)
                  }
            }}
            //function Call
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
   console.log('flag :>> ', flag);
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
      )}
   <div>
      {repoData&&flag&&(
         <div>
         <Typography>Repos</Typography>
         {repoData.map((object,index)=>{
         return(
            <div>
            <Typography key={index}>
               {object.name}
            </Typography>
            <Typography>
               {object.url}
            </Typography>
            </div>
         )})}</div>
         )
      }
      <div>
         {!flag&&(
               <Typography>User Not Found</Typography>
            )
         }
      </div>
   </div>
   

</div>
);

};

export default Search;
