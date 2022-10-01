
import type { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import { 
   Typography,
   Button,
   TextField,
   Table,
   TableBody,
   TableHead,
   TableRow,
   TableCell
} from '@mui/material';
import {getCookie, setCookie} from 'cookies-next';
import {Header} from '../components/Header';


const CreateMenu: NextPage = () => {
    const [item,setItem]=useState("");
    const [price,setPrice]=useState<number|null>();
    const menu=getCookie("Menu")
    const [data,setData]=useState({});
    const [upd,setUpd]=useState(0);
    useEffect(()=>{
      let xdata;
      if(menu&&typeof(menu)==="string"){
      console.log('menu :>> ', menu);
      xdata=JSON.parse(menu);
      console.log('xdata :>> ', xdata);
      setData(xdata);
    }
    },[menu])
    console.log('Object.keys(data) :>> ', Object.keys(data));
    console.log('menu :>> ', menu,price,);
    const addItem=()=>{
      let data={};
      let temp={
         "item":item,
         "price":price,
      }

      if(typeof(menu)==="string")
      data=JSON.parse(menu);
      data[item]=temp;
      setCookie("Menu",data);
      setItem("");
      setPrice(null);
      console.log("reset here");
      setUpd(upd+1)
      console.log('data,temp :>> ', data,temp);
    }

    const remove=(item:string)=>{
      console.log('item :>> ', item);
      let xdata=data;
      console.log('xdata :>> ', xdata);
      delete xdata[item];
      console.log('xdata :>> ', xdata);
      setCookie("Menu",xdata);
      setItem("");
      setPrice(null);
      setUpd(upd+1)
    }
    const handleEnter=(e:any)=>{
      if(item&&price)
      {
         if(e.key==="Enter")
        {
         e.target.blur();
         addItem();
      }
      }
    }
  return (
   
<div className="flex flex-col">
   <Header/>
   <div className='flex flex-col mx-8 my-3 mt-20 w-full align-center items-center'>
      {Object.keys(data).length!==0&&(<Typography fontSize={30}>Your Menu</Typography>)}
      {Object.keys(data).length!==0&&(
      <Table>
         <TableHead>
          <TableRow>
            <TableCell>Item</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
      {Object.keys(data).map((item)=>{
      return(
         <TableRow>
            <TableCell>{item}</TableCell>
            <TableCell>{data[item].price}</TableCell>
            <TableCell>
               <Button onClick={()=>remove(item)}>
                  Remove
               </Button>
            </TableCell>
         </TableRow>
      )
   })
      }</TableBody>
      </Table>)}
      <div className="flex flex-col w-1/2 ">
   <Typography fontSize={20}>Add Items to your Custom Menu</Typography>
   <div className='flex flex-row'>
   <TextField className="mr-4" value={item} label="Item" placeholder='Item' onChange={(e)=>setItem(e.currentTarget.value)}/>
   <TextField 
   type="number"
   label="Price"
   sx={{
      maxWidth:"80px"
   }} 
   value={price} 
   placeholder="Price"
   onChange={(e)=>setPrice(parseInt(e.currentTarget.value))}
   onKeyDown={(e)=>{handleEnter(e)}}
   />
   <Button disabled={!item||!price}onClick={addItem}>Add</Button>
   </div>
   </div>
   </div>
</div>
  );
  
};

export default CreateMenu;
