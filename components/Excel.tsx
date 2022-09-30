import React from "react";
import ReactExport from "react-export-excel";
import { Button } from "@mui/material";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
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
type Props={
    data?:BillData[]
}
type ExcelData={
    id?:number;
    amount?:number;
    itemList?:string;
}

export const Download =({data}:Props)=> {
    let xData=[];
    data.forEach(item=>{
        let temp:ExcelData={};
        temp.id=item.id;
        temp.amount=item.amount;
        let items="";
        item.items.forEach(object=>{
            items=items+" "+object.name+"*"+object.qty+" , "
        })
        temp.itemList=items;
        xData.push(temp)
    })
        return (
            <ExcelFile element={<Button>Download Data</Button>}>
                
                <ExcelSheet data={xData} name="Leaves">
                    <ExcelColumn label="Order No." value="id"/>
                    <ExcelColumn label="Items" value="itemList"/>
                    <ExcelColumn label="Amount" value="amount"/>
                </ExcelSheet>
            </ExcelFile>
        );
    }