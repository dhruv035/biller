
import type { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import {setCookie, getCookie,deleteCookie, setCookies, CookieValueTypes} from 'cookies-next';
import {Header} from '../components/Header';
import { Typography, Button,Select, MenuItem, Accordion, AccordionSummary, AccordionDetails, IconButton } from '@mui/material';
import { useRouter } from 'next/router';
import { useForm } from "react-hook-form";
import foodMenu from "./foodMenu.json";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {Download} from "../components/Excel";
import CloseIcon from '@mui/icons-material/Close';
//Type for Cookies if Needed

import ReactExport from "react-export-excel";
import { minWidth } from '@mui/system';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
const Qt=[0,1,2,3,4,5,6,7,8,8,9,10]
const Pmode=[{
         index:0,
         name:"Select Mode of Payment"
      },
      {
         index:1,
         name:"Gpay"
      },
      {index:2,
         name:"Cash"
      }]
type RepoData={
   name?:string;
   private?:boolean;
   url?:string;
   html_url?:string;
}
type ItemData={
   name?:string;
   price?:number;
   qty?:number;
   amount?:number;
}
type BillData = {
   id?:number;
   items?:ItemData[];
   amount?:number;
   pmode?:string;
   status?:string;
}
type FormData = {
   item?:number;
   qty?:number;
}
const Search: NextPage = () => {

   const {
         register,
         handleSubmit,
         reset,
         getValues,
         watch,
      } = useForm({
         defaultValues:{
            item:foodMenu[0].index,
            qty:Qt[0],
         }
      });
   const [upd,setUpd]=useState(0);
   const [billItems,setBillItems]=useState<ItemData[]>([]);
   const [qty,setQty]=useState<number>(0);
   const [item, setItem]=useState<number>(0);
   const [order,setOrder]=useState<BillData>({});
   const [mode, setMode] = useState<number>(0);
   const router=useRouter();
   const cookie=getCookie('billCookies');
   const fCookie=getCookie('bProcessed');
   const dCookie=getCookie('Deleted');
   const nCookie=getCookie('Id');
   const [count, setCount]=useState(1);
   const [amountG,setAmountG]=useState(0);
   const [amountC,setAmountC]=useState(0);
   const [middleG,setMiddleG]=useState(0);
   const [middleC,setMiddleC]=useState(0);
   //logs
   const [data,setData]=useState<any>();
   const [fData,setFData]=useState<any>();
   const [dData,setDData]=useState();
   const [nData,setNData]=useState();
   const [billAmount,setBillAmount]=useState(0);
   
   const resetCookies=()=>{
      deleteCookie("billCookies");
      deleteCookie("bProcessed");
      deleteCookie("Deleted");
      deleteCookie("Id")
      setUpd(upd+1);
   }
   //resetCookies();
   useEffect(()=>{
      if(!nCookie)
         {
            setCookie("Id",1)
         }
   },[nCookie])

   
   useEffect(()=>{
      let aG=0;
      let aC=0;

      const a = typeof(cookie)==="string"&& JSON.parse(cookie);
      const b = typeof(fCookie)==="string"&& JSON.parse(fCookie);
      const c = typeof(dCookie)==="string"&& JSON.parse(dCookie);
      const d = typeof(nCookie)==="string"&& JSON.parse(nCookie);
      
      {setData(a);}
   
      {setFData(b);}
      
      {setDData(c);}
      
      {setNData(d);}
      if(b)
      {
         b.forEach((object)=>{
            if(object.pmode==="Gpay")
            aG=aG+object.amount;
            else
            aC=aC+object.amount;
         })
      }
      setAmountC(aC);
      setAmountG(aG);
      let t1=0;
      let t2=0;
      if(a)
      {
         
         a.forEach((object)=>{
            if(object.pmode==="Gpay")
            t1=t1+object.amount;
            else
            t2=t2+object.amount;
         })
         
      }
      setMiddleC(t2);
      setMiddleG(t1);
   },[cookie,fCookie,dCookie,nCookie,upd,billItems])
   async function addCookie(cookieName:string,tCookie:any,bill:BillData){
     let xdata:BillData[]=[];
      if(tCookie&&typeof(tCookie)==="string"){
         xdata = JSON.parse(tCookie);
         xdata.push(bill);
         setCookie(cookieName,xdata);
         setOrder(undefined);
         setQty(0);
         setItem(0);
         setMode(0);
      } else{
         let val:BillData[]=[];
         val.push(bill);
         setCookie(cookieName,val);
         setOrder(undefined);
         setQty(0);
         setItem(0);
         setMode(0);
         setBillAmount(0);
      }  
   };
   
    const addItem = () => {
      let temp=billItems;
      let newItem:ItemData={};
      let tempId=undefined;
      newItem.name=foodMenu[item].item;
      newItem.price=foodMenu[item].price;
      newItem.qty=qty
      newItem.amount=newItem.price*newItem.qty;
      temp.push(newItem);
      
      let amount=0;
      
      temp.forEach(object=>{
         
         amount=amount+object.amount;
      });
      if(nCookie&&typeof(nCookie)==="string")
      tempId=JSON.parse(nCookie);
   
      setBillItems(temp);
      setOrder({
         id:tempId,
         items:temp,
         amount:amount
      })
      setQty(0);
      setItem(0);
      setBillAmount(amount);
    }
    
    const addOrder=()=>{
      
      let temp:BillData=order;
      let tempId=undefined;
      if(nCookie&&typeof(nCookie)==="string")
      tempId=JSON.parse(nCookie);
      setCookie("Id",tempId+1)
      temp.pmode=Pmode[mode].name;
      addCookie("billCookies",cookie,temp);
      setCount(count+1)
      setBillItems([]);
      setQty(0);
      setItem(0);
      setMode(0);
      setUpd(upd+1);
      setBillAmount(0);
    }

    const handleChangeItem=(e:any)=>{
      setItem(e.target.value)
    }
    const handleChangeQty=(e:any)=>{
      setQty(e.target.value)
    }
    const handleChangeMode=(e:any)=>{
      setMode(e.target.value)
    }

    const removeCookie=(index:number)=>{

      let xdata:BillData[]=[];
      if(cookie&&typeof(cookie)==="string"){
          xdata=  JSON.parse(cookie);
         let temp=xdata[index];
         if(index!=0)
         xdata.splice(index,1);
         else
         xdata.splice(1);
         console.log('xdata :>> ', xdata);
         if(xdata.length)
         setCookie('billCookies',xdata);
         else
         deleteCookie('billCookies')
         temp.status="refunded"
         addCookie('Deleted',dCookie,temp)
         setQty(0);
         setItem(0);
         setMode(0);
         setUpd(upd+1);
    }
   }
   const moveCookie=(index:number)=>{
      let moveOrder:BillData={};
      let xdata:BillData[]=[];
      let temp;
      if(cookie&&typeof(cookie)==="string"){
          xdata = JSON.parse(cookie);
          moveOrder=xdata[index];
          if(index!=0)
          temp= xdata.splice(index,1);
          else
          temp=xdata.splice(1);
          if(temp.length)
          setCookie('billCookies',temp);
          else
          deleteCookie('billCookies')
          addCookie('bProcessed',fCookie,moveOrder);
          setQty(0);
          setItem(0);
          setMode(0);
          setUpd(upd+1)
    }
   }
   const moveAll=()=>{
      let xdata;
      let ydata;
      let newData;
      if(fCookie&&typeof(fCookie)==="string")
      {
         xdata=JSON.parse(fCookie);
         deleteCookie("bProcessed");
         if(dCookie&&typeof(dCookie)==="string")
        {
         ydata=JSON.parse(dCookie)
         newData=ydata.concat(xdata)
      }
      else{
         newData=xdata;
      }
      setCookie("Deleted",newData);
      setUpd(upd+1);
      }
   }
   const removeItem = (index:number,amount:number)=>{
      console.log('billItems :>> ', billItems);
     
      console.log('index :>> ', index);
      let temp=billItems;
      console.log('temp :>> ', temp);
         temp.splice(index,1)
      console.log('temp :>> ', temp);
         setBillAmount(billAmount-amount)
         setBillItems(temp);
         setUpd(upd+1);
   }
return (
   <div  className="flex flex-col h-screen w-full overflow-hidden">
      <Header/>
      
      <div className="flex flex-row h-full w-full mt-16  align-center">
      <div className="flex flex-col w-3/12 mt-20 ml-6 float-left item">
         <div className='mb-10'>
         <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
         <Typography fontSize={30}>Kitchen Balance</Typography></AccordionSummary>
         <AccordionDetails>
         <Typography> {"Cash : Rs. "+middleC}</Typography>
         <Typography>{"GPay : Rs. "+middleG}</Typography>
         </AccordionDetails>
         </Accordion>
         
         </div>
         <Typography className="flex justify-center" fontSize={20}>Orders in Kitchen</Typography>
         {
            
            data&&(data.map((object,index)=>{
               return(
                  <Accordion>
                     <AccordionSummary 
                     expandIcon={<ExpandMoreIcon />}>
                        <Typography>{"Order No. "+ object.id}</Typography>
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
                        <div className="flex flex-row-reverse w-full">
                        <Button onClick={()=>moveCookie(index)}>
                           Mark as Served
                        </Button>
                        <Button onClick={()=>removeCookie(index)}>
                           Delete Order
                        </Button>
                        </div>
                     </AccordionDetails>
                  </Accordion>
               )
            }))
         }
         
      </div>
      <div className="flex flex-col w-6/12 mt-20 ml-30 content-center items-center">
      <div className='mb-10 w-3/5'>
      <Accordion>
         <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
         <Typography fontSize={30}>Treasury</Typography></AccordionSummary>
         <AccordionDetails>
         <Typography> {"Cash : Rs. "+(amountC+middleC)}</Typography>
         <Typography>{"GPay : Rs. "+(amountG+middleG)}</Typography>
         </AccordionDetails>
         </Accordion>
         </div>
       <Typography fontSize={20} className="flex justify-center">Generate Invoice</Typography>
        
         <div className='flex flex-col w-4/6 justify-start p-3'>
            {
               (billItems?.length>0)&&billItems.map((object:ItemData,index:number)=>{
                  return(
                     <div className='flex flex-row'>
                     <Typography className="flex items-center" maxWidth={300}>
                        {object.qty+ " * " + object.name}
                     </Typography>
                     <IconButton className='flex flex-row-reverse w-1/6 '
                     onClick={()=>removeItem(index,object.amount)}
                     size="small">
                        <CloseIcon/>
                     </IconButton>
                     </div>
                  )
               })
            }
            {(billItems?.length>0)&&(<Typography>
               {"Total : Rs. "+billAmount}
            </Typography>)}
         </div>
         <div className="flex flex-row w-4/6 justify-start">
         <div className="flex flex-row w-fit">
         <Select
         fullWidth={true}
         sx={{
            alignSelf:"center",
            marginBottom:"20px",
            marginRight:"8px",
            maxWidth:"400px",
            minWidth:"250px"
            
         }}
         labelId="demo-simple-select-label"
         id="food-item"
         label="Item"
         value={item}
         onChange={(e)=>handleChangeItem(e)}
         >
            {
            foodMenu.map(item=>{
               return(
                  <MenuItem value={item.index}>{item.item+(item.index===0?"...":" "+ "Rs "+item.price)}
                  </MenuItem>
               )
            })
         }
         </Select>
         <Select
         labelId="demo-simple-select-label"
         id="food-qty"
         label="Qty"
         value={qty}
         sx={{
            alignSelf:"center",
            marginBottom:"20px",
            maxWidth:"300px",
            marginRight:"10px"
            
         }}
         onChange={(e)=>handleChangeQty(e)}
         >
            {Qt.map(item=>{
               return (<MenuItem value={item}>{item}</MenuItem>)
            })}
         </Select>
         </div>
         <div className='flex flex-row-reverse w-3/6'>
         <Button 
         className="bg-orange-200 hover:bg-orange-500"
         variant="contained"
         disabled={item===0||qty===0}
         sx={{
            height:"55px"
         }}
          onClick={addItem}>
            Add Item
         </Button>
         </div>
         </div>
         <Typography fontSize={20} className="flex justify-center mt-16 mb-10">Payment</Typography>
         <Select
         fullWidth={true}
         sx={{
            marginBottom:"20px",
            maxWidth:"300px"
            
         }}
         labelId="demo-234-simple-select-label"
         id="payment-mode"
         label="mode"
         value={mode}
         onChange={(e)=>handleChangeMode(e)}
         >
            {Pmode.map((item)=>{
               return (<MenuItem value={item.index}>{item.name}</MenuItem>)
            })}
         </Select>
         <div className="flex flex-row">
         
        

         <Button 
         className="bg-green-100 hover:bg-green-600"
         disabled={mode===0||billItems?.length===0}
         variant="contained"
         onClick={addOrder}>
            Confirm Order
         </Button>
         </div>
         </div>
         <div className="flex flex-col w-3/12 mt-20 float-left item overflow-auto mr-10">
      <div>

      <div className='mb-10'>
         <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
         <Typography fontSize={30}>Cleared Balance</Typography></AccordionSummary>
         <AccordionDetails>
         <Typography> {"Cash : Rs. "+amountC}</Typography>
         <Typography>{"GPay : Rs. "+amountG}</Typography>
         </AccordionDetails>
         </Accordion>
         
         </div>
         <Typography className="flex justify-center" fontSize={20}>
            Processed Orders
         </Typography>
         
         {
            fData&&(fData.map(object=>{
               return(
                  <Accordion>
                     <AccordionSummary 
                     expandIcon={<ExpandMoreIcon />}>
                        <Typography>{"Order No. "+ object.id}</Typography>
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
                  </Accordion>
               )
            }))
         }
         </div>
         <div className='flex flex-row'>
         {fData&&(<Download data={fData}/>)}
         {fData&&(<Button className="flex w-full flex-row-reverse justify-start" onClick={moveAll}>Delete</Button>)}
         </div>
      </div>
         </div>
         <Button 
      className="flex flex-col-reverse mb-10"
      onClick={resetCookies}
      >Reset Data {`{You will lose all billing history}`}</Button>
   </div>
   );
};

export default Search;
