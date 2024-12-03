import React, { useEffect, useState } from 'react'

function App() {
  let[data,setData]=useState([]);
  let[loading,setLoading]=useState(false);
  let[page,setPage]=useState(1)


  useEffect(()=>{
    fetchData()
   },[])
  
  useEffect(()=>{
    window.addEventListener("scroll",handleScroll);
  
  return()=>
  window.removeEventListener("scroll",handleScroll)
  },[page])




  const fetchData=async()=>{
try {
  setLoading(true)
  const res= await fetch(`https://jsonplaceholder.typicode.com/posts?page=${page}`);
  const incomingData= await res.json();
  setData((prev)=>[...prev,...incomingData]);
  setLoading(false)
  
} catch (error) {
  setLoading(false);
  console.log(error.message)
}

  }

 


const handleScroll =()=>{
  const{scrollTop,clientHeight,scrollHeight} = document.documentElement;

  if(scrollTop + clientHeight >= scrollHeight - 10 && !loading){
    setLoading(true);
    setPage((prev)=> prev+1)
  }
}




  return <>
  <section>
  <div className=''>
<h1>infinfe scroll:</h1>
{
  data && data.map((item)=>(
    <div key={item.id}>
      <h3>Title:{item.title}</h3>
      </div>
    
  ))
}
</div>
{
  loading && <p>
    Loading....
  </p>
}

  </section>
  
  
  </>
}

export default App