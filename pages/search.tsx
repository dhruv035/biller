
import type { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import {setCookie, getCookie,deleteCookie} from 'cookies-next';
import {Header} from '../components/Header';
import { 
   Typography,
   Button,
   Select,
   MenuItem,
   Accordion, 
   AccordionSummary, 
   AccordionDetails, 
   IconButton,
   Autocomplete,
   TextField,
   createFilterOptions,
   BottomNavigation,
   BottomNavigationAction,
   Paper
 } from '@mui/material';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {Download} from "../components/Excel";
import CloseIcon from '@mui/icons-material/Close';
//Type for Cookies if Needed


import NewMenu from "./NewMenu.json";


const Qt=[1,2,3,4,5,6,7,8,8,9,10]
const filterOptions = createFilterOptions({
   matchFrom: 'start',
 });
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

type Food= {
   item:string,
   price:number
}

type MenuList = {
   [key:string]:Food
}

type ItemData={
   name?:string;
   price?:number;
   qty?:number;
   amount?:number;
}
type BillData = {
   id?:number;
   name?:string;
   items?:ItemData[];
   amount?:number;
   pmode?:string;
   status?:string;
   discount?:number;
}
const Search: NextPage = () => {


   const [view,setView]=useState(0);
   const [upd,setUpd]=useState(0);
   const [billItems,setBillItems]=useState<ItemData[]>([]);
   const [qty,setQty]=useState<any>('');
   const [item2, setItem2]=useState<string>("");
   item2&&console.log('item2 :>> ', NewMenu[item2]);
   const [menu,setMenu]=useState<any>(NewMenu);
   const [isCustom,setIsCustom]=useState<boolean>(false);
   const [inputValue,setInputValue]=useState<string>("");
   const [order,setOrder]=useState<BillData>({});
   const [mode, setMode] = useState<number>(0);
   const [name,setName]= useState('');
   const cookie=getCookie('billCookies');
   const fCookie=getCookie('bProcessed');
   const dCookie=getCookie('Deleted');
   const nCookie=getCookie('Id');
   const mCookie=getCookie('Menu');
   const [count, setCount]=useState(1);
   const [amountG,setAmountG]=useState(0);
   const [amountC,setAmountC]=useState(0);
   const [middleG,setMiddleG]=useState(0);
   const [middleC,setMiddleC]=useState(0);
   const [discount,setDiscount]=useState('');
   const [ctrl,setCtrl]=useState('')
   //logs
   const [data,setData]=useState<any>();
   const [fData,setFData]=useState<any>();
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
   console.log('billItems :>> ', billItems);
   useEffect(()=>{
      console.log('MyEffect :>> ');
      let temp=billItems;
      let total=0;
      billItems.forEach(item=>{
         total=total+item.amount;
      })
      if(discount)
      total=total-parseInt(discount);

      setBillAmount(total);
      let tempId=1;

      if(nCookie&&typeof(nCookie)==="string")
      tempId=JSON.parse(nCookie);
      setOrder({
         id:tempId,
         items:temp,
         amount:total
      })
   },[billItems.length,discount])
   useEffect(()=>{
      let aG=0;
      let aC=0;
      const a = typeof(cookie)==="string"&& JSON.parse(cookie);
      const b = typeof(fCookie)==="string"&& JSON.parse(fCookie);
      
      {setData(a);}
   
      {setFData(b);}
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
         setMode(0);
      } else{
         let val:BillData[]=[];
         val.push(bill);
         setCookie(cookieName,val);
         setOrder(undefined);
         setQty(0);
         setMode(0);
         
      }  
   };
   
    const addItem = () => {
      let temp=billItems;
      let newItem:ItemData={};
      let tempId=undefined;
      newItem.name=menu[item2].item;
      newItem.price=menu[item2].price;
      newItem.qty=qty
      newItem.amount=newItem.price*newItem.qty;
      temp.push(newItem);
      
      let amount=0;
      
      temp.forEach(object=>{
         
         amount=amount+object.amount;
      });
      
      setQty(0);
      setItem2("");
      
    }
    
    const addOrder=()=>{
      let temp:BillData=order;
      let tempId=undefined;
      if(nCookie&&typeof(nCookie)==="string")
      tempId=JSON.parse(nCookie);
      setCookie("Id",tempId+1)
      temp.pmode=Pmode[mode].name;
      temp.name=name;
      temp.discount=parseInt(discount);
      addCookie("billCookies",cookie,temp);
      setCount(count+1)
      setBillItems([]);
      setQty(0);
      setName('');
      setItem2("");
      setMode(0);
      setUpd(upd+1);
      setBillAmount(0);
      setCtrl('');
      setDiscount('');
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
         xdata.splice(index,1);
         console.log('xdata :>> ', xdata);
         if(xdata.length)
         setCookie('billCookies',xdata);
         else
         deleteCookie('billCookies')
         temp.status="refunded"
         addCookie('Deleted',dCookie,temp)
         setQty(0);
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
   const addDiscount = ()=>{
      
   }
   const changeMenu = ()=>{
      if(isCustom)
      setMenu(NewMenu);
      else if(mCookie&&typeof(mCookie)==="string")
      setMenu(JSON.parse(mCookie));
      setIsCustom(!isCustom);
   }
return (
   <div  className="flex flex-col h-screen w-full  pb-10 overflow-scroll">
      <Header/>
     
      <div className="flex flex-row mx-4 w-11/12  mt-16 mb-20 align-center">
         
      {view===1&&(<div className="flex flex-col w-full mx-3 p-0 lg:w-3/12 mt-20 ml-0 lg:ml-6 content-center">
         <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
         <Typography width={"100%"} textAlign={"center"} fontSize={"6.2vw"}>Kitchen Balance</Typography></AccordionSummary>
         <AccordionDetails>
         <Typography>{"Cash  : Rs. "+middleC}</Typography>
         <Typography>{"GPay : Rs. "+middleG}</Typography>
         </AccordionDetails>
         </Accordion>
         
         <Typography className="flex mt-5 justify-center" fontSize={20}>Orders in Kitchen</Typography>
         {

            data&&(data.map((object,index)=>{
               return(
                  <Accordion>
                     <AccordionSummary 
                     expandIcon={<ExpandMoreIcon />}>
                        <Typography>{"Order #"+ object.id+":("+object.name+")"}</Typography>
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
                        <div className='flex flex-row w-full'>
                              <Typography className="flex w-full justify-start mb-4">
                                 Discount
                              </Typography>
                              <div className="flex flex-row-reverse w-2/5">
                              <Typography>
                              -{object.discount}
                              </Typography>
                              </div>
                              </div>
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
         
      </div>)}
      {view===0&&(<div className="flex flex-col w-full mt-6 lg:mt-20 ml-30 content-center items-center">
      <div className='mb-10 w-full lg:w-3/5 self-start'>
         <Button className="w-full"
         onClick={changeMenu}
         style={{
            fontSize:"3vw"
         }}
         >
           { isCustom?"Use Default":"Use Your Own Menu"}
         </Button>
      <Accordion>
         <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
         <Typography fontSize={"4.2vw"}>Treasury</Typography></AccordionSummary>
         <AccordionDetails>
         <Typography> {"Cash : Rs. "+(amountC+middleC)}</Typography>
         <Typography>{"GPay : Rs. "+(amountG+middleG)}</Typography>
         </AccordionDetails>
         </Accordion>
         </div>
         <Typography fontSize={"5vw"} className="flex self-start">Name</Typography>
         <TextField
         className='flex self-start mt-2 mb-8'
          id="filled-name"
          label="Name"
          value={name}
          onChange={(e)=>setName(e.currentTarget.value)}
          variant="standard"
        />
       <Typography fontSize={"5vw"} className="flex self-start">Add Items</Typography>
        
         <div className='flex flex-col w-full lg:w-4/6 self-start p-3'>
            {
               (billItems?.length>0)&&billItems.map((object:ItemData,index:number)=>{
                  return(
                     <div className='flex flex-row w-full'>
                     <Typography className="flex items-center min-w-max" maxWidth={300}>
                        {object.qty+ " * " + object.name}
                     </Typography>
                     <IconButton className='flex flex-row-reverse w-full'
                     onClick={()=>removeItem(index,object.amount)}
                     size="small"
                     color='warning'>
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
         <div className="flex flex-col lg:flex-row w-full lg:w-4/6 justify-start">
         <div className="flex flex-col lg:flex-row w-full">
         {/*<Select
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
         </Select>*/}
         {

             <Autocomplete
             value={item2}
             onChange={(event: any, newValue: string | null) => {
               setItem2(newValue);
             }}
             filterOptions={filterOptions}
             inputValue={inputValue}
             onInputChange={(event, newInputValue) => {
               setInputValue(newInputValue);
             }}
             id="controllable-states-demo"
             options={Object.keys(menu)}
             sx={{ width:"90%",maxWidth: 300 }}
             renderInput={(params) => <TextField {...params} label="Item" />}
           />
         }
         <Select
         labelId="demo-simple-select-label"
         id="food-qty"
         label={"Quantity"}
         placeholder="Yo"
         value={qty}
         sx={{
            width:"90%",
            alignSelf:"start",
            marginBottom:"20px",
            maxWidth:"100px",
            marginTop:"20px"
            
         }}
         onChange={(e)=>handleChangeQty(e)}
         >
            {Qt.map(item=>{
               return (<MenuItem value={item}>{item}</MenuItem>)
            })}
         </Select>

         {menu[item2]&&(<Typography className="content-start mb-3">{"Price: "+ menu[item2].price}</Typography>)}
         </div>
         <div className='flex flex-row lg:flex-row-reverse w-3/6'>
         <Button 
         className="bg-orange-200 hover:bg-orange-500"
         variant="contained"
         disabled={!menu[item2]||qty===0}
         sx={{
            height:"55px"
         }}
          onClick={addItem}>
            Add Item
         </Button>
         </div>
         </div>
         
         <Typography fontSize={"5vw"} className="flex self-start my-5">Discount</Typography>
         <TextField
         className='flex self-start my-5'
          id="filled-number"
          label="Discount"
          type="number"
          value={ctrl}
          onChange={(e)=>setCtrl(e.currentTarget.value)}
          variant="standard"
        />
         <Button 
         className="flex my-5 self-start bg-orange-200 hover:bg-orange-500"
         variant="contained"
         disabled={!ctrl||parseInt(ctrl)>billAmount+parseInt(discount)}
         sx={{

            height:"40px"
            
         }}
          onClick={()=>setDiscount(ctrl)}>
            Add Discount
         </Button>
        
         <Typography fontSize={"5vw"} className="flex justify-center mt-5 lg:mt-16 mb-10">Payment</Typography>
         <Select
         className="self-start"
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
         <Button 
         className="self-start bg-green-100 hover:bg-green-600"
         disabled={mode===0||billItems?.length===0}
         variant="contained"
         onClick={addOrder}>
            Confirm Order
         </Button>
         </div>)
         }

        {view===2&&( <div className="flex flex-col w-full lg:w-3/12 mt-20 float-left item overflow-auto mr-10">
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
                        <div className='flex flex-row w-full'>
                              <Typography className="flex w-full justify-start mb-4">
                                 Discount
                              </Typography>
                              <div className="flex flex-row-reverse w-2/5">
                              <Typography>
                              -{object.discount}
                              </Typography>
                              </div>
                              </div>
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
      </div>)}
         </div>
         
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <Button 
      className="flex flex-col-reverse "
      onClick={resetCookies}
      >Reset Data {`{You will lose all billing history}`}</Button>
       <BottomNavigation
        showLabels
        value={view}
        onChange={(event, newValue) => {
          setView(newValue);
        }}
      >
        <BottomNavigationAction label="Counter" value={0} icon={<RestoreIcon />} />
        <BottomNavigationAction label="Kitchen" value={1} icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Completed" value={2} icon={<LocationOnIcon />} />
      </BottomNavigation></Paper>
   </div>
   );
};

export default Search;
