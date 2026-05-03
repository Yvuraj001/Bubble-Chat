 

const chkstatus = async () => {
    let isactive ;
    
    let a = await fetch(process.env.NEXT_PUBLIC_POST_URL, { method: "POST", headers: { "Content-Type": "application/json" } })
        let res = await a.text()
       
      
       if(res){
        return isactive = true
        
    }
    else{
        return isactive = false
    }
   
}

export default chkstatus
