import React from 'react'
function Counter()
{
    const[count,setCount]=React.useState(0)
    React.useEffect(()=>{
        setTimeout(()=>{  // 1st paramter is afunction,2nd paraeter is dependency-if you dont give dependency it will not stop rendering
            setCount((count)=>count+1)
        },1000)
    },[])  //[]-dependency
    return(
        <h1>Rendering {count}</h1>
    )
}
export default Counter