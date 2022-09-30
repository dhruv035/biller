
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
    const dCookie=getCookie('Deleted');
    const [billData,setBillData]=useState<any>();
    
    useEffect(()=>{
        if(typeof(cookie)==='string'){
            let temp=JSON.parse(cookie).searches;
            temp=temp.sort((a,b)=>b.timestamp-a.timestamp)
            setData(temp);
        }
        if(typeof(dCookie)==="string"){
            let tempo=JSON.parse(dCookie);
            setBillData(tempo);
        }
},[cookie,dCookie]);
console.log('billData :>> ', billData);
  return (
  <div className="flex flex-col">
    <Header/>
    <div className='mx-8 my-3 mt-20'>
    {/*data?.length&&<MyTable data={data} onclick={handleClick}/>*/}
    {           billData?.length&&(billData.map((object)=>{
        let temp="";
        if(object.status&&object.status==="refunded")
        temp=" [Refunded]"
        else
        temp=""
        return(<Accordion>
            <AccordionSummary 
            expandIcon={<ExpandMoreIcon />}>
               <Typography>{"Order No. "+ object.id+temp}</Typography>
            </AccordionSummary>
            <AccordionDetails>
               {
               object.items.map(item=>{
                  return(
                     <div className='flex flex-row w-full'>
                     <Typography className="flex w-full justify-start mb-4">
                        {item.name+"("+item.price+")"+" X "+item.qty}
                     </Typography>
                     <div className="flex flex-row-reverse w-2/5">
                     <Typography>
                     {item.amount}
                     </Typography>
                     </div>
                     </div>
                  )
               })
               }
               <Typography className="flex flex-row-reverse w-full"
               sx={{ borderTop: 1 }}>
               {"Rs. "+object.amount}
               </Typography>
               <Typography className="flex flex-row-reverse w-full"
               sx={{ borderTop: 1 }}>
               {"Payment Method : "+object.pmode}
               </Typography>
            </AccordionDetails>
         </Accordion>)
    }))
    
    
                  }
    </div>
  </div>
  );
  
};

export default History;
