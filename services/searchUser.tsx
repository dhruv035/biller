import axios from "axios";
async function getUserData(username:string){
    let data= await axios.get(' https://api.github.com/users/'+username).then((res)=>{
        console.log('res.data :>> ', res.data);
        return res.data
    })
    console.log('data :>> ', data);
    return data;
  }
async function getUserRepoData(username:string){
    let data= await axios.get(' https://api.github.com/users/'+username+'/repos').then((res)=>{
        console.log('res.data :>> ', res.data);
        return res.data
    })
    console.log('data :>> ', data);
    return data;
  }
  export {
    getUserData,
    getUserRepoData
  }