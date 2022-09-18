
import type { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import {setCookie, getCookie} from 'cookies-next';
import {Header} from '../components/Header';
import { Typography,Card,CardContent,Link, Avatar, SvgIcon } from '@mui/material';
import { useRouter } from 'next/router';
import {getUserData, getUserRepoData} from '../services/searchUser';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
//Type for Cookies if Needed
type CookieType={
   searches:string[];
}

type GithubData={
   name:string;
   email?:string;
   login:string;
   bio?:string;
   avatar_url?:string;
   twitter_username?:string;
}
type RepoData={
   name?:string;
   private?:boolean;
   url?:string;
   html_url?:string;
}
const Search: NextPage = () => {

   const [flag,setFlag]=useState(true)
   const [data, setData]=useState<GithubData>();
   const [repoData, setRepoData]=useState<RepoData[]>();
   const router=useRouter();
   const cookie=getCookie('userCookies');

   //logs
   console.log('data :>> ', data);
   console.log('flag :>> ', flag);
   console.log('search :>> ', router.query);

   useEffect(()=>{
      //write async function to run in the hook
      async function process(){
         //check if null
         if(router.query?.search&&typeof(router.query.search)==="string"){
            console.log('here :>> ',router.query.search);
            //add search to Cookies
            addCookie(router.query.search);
            
            try{
               let data= await getUserData(router.query.search);
               let data2= await getUserRepoData(router.query.search);
               console.log('dataa :>> ', data2);
               //set Data in state
               if(data){
                  console.log('data.name :>> ', data.name);
                  if(data.name===null)
                  setFlag(false)
                  else
                  {
                     setData(data);
                     setRepoData(data2)
                     setFlag(true);
               }}
            } catch(e){
               //API Error Handling
               console.log('Error :>> ', e);
               setFlag(false);
      }}}
      //function Call
      process();
   },[router])

   function addCookie(uname:string){
      if(cookie&&typeof(cookie)==="string"){
         let data = JSON.parse(cookie);
         data.searches?.push({
            search:uname,
            timestamp:Math.floor(Date.now()/1000)
         })
         setCookie("userCookies",data);
      } else{
         let val=[];
         val.push({
            search:uname,
            timestamp:Math.floor(Date.now()/1000)
         });
         setCookie("userCookies",{searches:val});
      }
   };

   
return (
   <div  className="flex flex-col h-screen overflow-hidden">
      <Header/>
      <div className="flex flex-row  mt-16 overflow-hidden">
      {data&&flag&&(
         <div className='flex flex-col overflow-hidden'>
            <div className='flex h-auto'>
            <Card sx={{ maxWidth: 345, }}>
               <CardContent>
                  <div className='flex flex-col'>
                     <div className='flex flex-row'>
                        <Avatar
                        alt="Remy Sharp"
                        src={data.avatar_url}
                        sx={{ width: 150, height: 150 }}
                        />
                        <div className="flex flex-col justify-center ml-3">
                           <Typography variant="h5" component="div">
                              {data.name}
                           </Typography>
                           
                           {data.twitter_username&&(   
                              <div className="flex flex-row"> 
                              <SvgIcon htmlColor="#1DA1F2">
                                 <TwitterIcon/>
                              </SvgIcon>
                              <Typography gutterBottom variant="body2" component="div">
                                 {"@"+data.twitter_username}
                              </Typography>
                           </div>
                              )
                           }
                           <div className="flex flex-row"> 
                              <SvgIcon>
                                 <GitHubIcon/>
                              </SvgIcon>
                              <Typography gutterBottom variant="body2" component="div">
                                 {"@"+data.login}
                              </Typography>
                           </div>
                        </div>
                     </div>
                     {data.bio&&(<div><Typography variant="h5" component="div">About</Typography>
                     <Typography variant="body2" color="text.secondary">
                        {data.bio}
                     </Typography></div>)}
                  </div>
               </CardContent>  
            </Card>
            </div>
            {repoData&&flag&&(
               <div className="flex flex-col h-screen overflow-auto">
                  <Typography variant="h6" component="div">Repos</Typography>
                  {repoData.map((object,index)=>{
                     return(
                        <div className='flex flex-col'>
                           <Link href={object.html_url} underline="hover">
                              {object.name}
                           </Link>
                      </div>
                     )
                  })}
                  </div>
               )
            }
         </div>
      )}
      {!flag&&(<div><Typography>User Not Found</Typography></div>)}
      </div>
   </div>
   );
};

export default Search;
