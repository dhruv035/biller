
import type { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import {setCookie, getCookie,deleteCookie, setCookies, CookieValueTypes} from 'cookies-next';
import {Header} from '../components/Header';
import { Typography, Button,Select, MenuItem, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { useRouter } from 'next/router';
import { useForm } from "react-hook-form";
import foodMenu from "./foodMenu.json";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
//Type for Cookies if Needed

const Qt=[0,1,2,3,4,5,6,7,8,8,9,10]
const Pmode=[{
         index:0,
         name:"select"
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
   console.log('cookie :>> ', cookie&&typeof(cookie)==="string"&&JSON.parse(cookie));
   console.log('fCookie :>> ', fCookie&&typeof(fCookie)==="string"&&JSON.parse(fCookie));
   console.log('dCookie :>> ', dCookie&&typeof(dCookie)==="string"&&JSON.parse(dCookie));
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
   console.log('dataRefresh :>> ', data);
   useEffect(()=>{
      if(!nCookie)
         {
            setCookie("Id",1)
         }
   },[nCookie])
   console.log('nCookie@ :>> ', nCookie);
   
   useEffect(()=>{
      let aG=0;
      let aC=0;
      console.log("FIRING");
      const a = typeof(cookie)==="string"&& JSON.parse(cookie);
      const b = typeof(fCookie)==="string"&& JSON.parse(fCookie);
      const c = typeof(dCookie)==="string"&& JSON.parse(dCookie);
      const d = typeof(nCookie)==="string"&& JSON.parse(nCookie);
      
      {setData(a);console.log('a :>> ', a);}
   
      {setFData(b);console.log('b :>> ', b);}
      
      {setDData(c);console.log('c :>> ', c);}
      
      {setNData(d);console.log('d :>> ', d);}
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
   },[cookie,fCookie,dCookie,nCookie,upd])
   console.log('aC,aG :>> ', amountC,amountG);
   async function addCookie(cookieName:string,tCookie:any,bill:BillData){
     console.log('bill :>> ', bill);
     let xdata:BillData[]=[];
      if(tCookie&&typeof(tCookie)==="string"){
         xdata = JSON.parse(tCookie);
         console.log('data :>> ',xdata);
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
      console.log('mode :>> ', mode);
      let temp=billItems;
      let newItem:ItemData={};
      let tempId=undefined;
      newItem.name=foodMenu[item].item;
      newItem.price=foodMenu[item].price;
      newItem.qty=qty
      newItem.amount=newItem.price*newItem.qty;
      temp.push(newItem);
      
      let amount=0;
      console.log('temp :>> ', temp);
      
      temp.forEach(object=>{
         
         amount=amount+object.amount;
      });
      if(nCookie&&typeof(nCookie)==="string")
      tempId=JSON.parse(nCookie);
   
      console.log('tempId :>> ', tempId);
      setBillItems(temp);
      console.log('modeItems :>> ', mode);
      setOrder({
         id:tempId,
         items:temp,
         amount:amount
      })
      setQty(0);
      setItem(0);
      setBillAmount(amount);
    }
    console.log('billAmount :>> ', billAmount);
    const addOrder=()=>{
      console.log('order :>> ', order);
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
    console.log('mode :>> ', mode);
    const handleChangeItem=(e:any)=>{
      setItem(e.target.value)
    }
    const handleChangeQty=(e:any)=>{
      setQty(e.target.value)
    }
    const handleChangeMode=(e:any)=>{
      setMode(e.target.value)
      console.log('mode :>> ', mode);
    }
   cookie&&typeof(cookie)==="string"&&console.log('JSON.parse(cookie) :>> ', JSON.parse(cookie));
   cookie&&typeof(cookie)==="string"&&console.log('JSON.parse(cookie) :>> ', JSON.parse(cookie));
    const removeCookie=(index:number)=>{
      console.log('index :>> ', index);
      console.log("object");
      let xdata:BillData[]=[];
      if(cookie&&typeof(cookie)==="string"){
         console.log("object2");
          xdata=  JSON.parse(cookie);
         console.log('data :>> ', xdata);
         console.log(JSON.parse(cookie))
         let temp=xdata[index];
         console.log('temp,data :>> ', temp,xdata);
         let xlr8;
         if(index!=0)
         xlr8=xdata.splice(index,1);
         else
         xlr8=xdata.splice(1);
         console.log('xlr8 :>> ', xlr8);
         if(xlr8.length)
         setCookie('billCookies',xlr8);
         else
         deleteCookie('billCookies')
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
      console.log('index :>> ', index);
      if(cookie&&typeof(cookie)==="string"){
          xdata = JSON.parse(cookie);
         console.log('data :>> ', xdata);
          moveOrder=xdata[index];
          if(index!=0)
          temp= xdata.splice(index,1);
          else
          temp=xdata.splice(1);
          console.log('temp :>> ', temp);
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
return (
   <div  className="flex flex-col h-screen w-full overflow-hidden">
      <Header/>
      
      <div className="flex flex-row h-full w-full mt-16  align-center">
      <div className="flex flex-col w-3/12 mt-20 float-left item">
         <Typography>Orders in Kitchen</Typography>
         <Typography> {"Cash : Rs. "+middleC+ "   GPay : Rs. "+middleG}</Typography>
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
      <div className="flex flex-col w-6/12 ml-20 mt-20 ml-30 content-start items-start">
       <Typography>Treasury</Typography>

       <Typography className='flex mb-10'>
      {"Cash : Rs. "+(middleC+amountC)+ "   GPay : Rs. "+(middleG+amountG)}</Typography>
       <Typography>Generate Invoice</Typography>
        
         <div className='flex flex-col w-1/2'>
            {
               billItems.map(object=>{
                  return(
                     <Typography maxWidth={300}>
                        {object.qty+ " X " + object.name}
                     </Typography>
                  )
               })
            }
            <Typography>
               {"Total : Rs. "+billAmount}
            </Typography>
         </div>
         <div className="flex flex-row w-3/6">
         <Select
         fullWidth={true}
         sx={{
            alignSelf:"center",
            marginBottom:"20px",
            maxWidth:"300px"
            
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
            maxWidth:"300px"
            
         }}
         onChange={(e)=>handleChangeQty(e)}
         >
            {Qt.map(item=>{
               return (<MenuItem value={item}>{item}</MenuItem>)
            })}
         </Select>

         </div>
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
         
         <Button disabled={item===0||qty===0} onClick={addItem}>
            Add Item
         </Button>

         <Button disabled={mode===0||billItems?.length===0} onClick={addOrder}>
            New Order
         </Button>
         </div>
         </div>
         <div className="flex flex-col w-3/12 mt-20 float-left item overflow-auto">
      <div>
         <Typography className="flex justify-center">
            Processed Orders
         </Typography>
         <Typography className="flex justify-center">
            {"Cash : Rs. "+amountC+ "   GPay : Rs. "+amountG}
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
