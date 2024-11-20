//React Hook
import React from 'react'
function Counter()
{
    const[count,setCount]=React.useState(0)  //Use state is afunction to create a state variable
    //initialized count to zero
    const increment=()=>
    {
        setCount(count+1)
    }
    return (
        <div>
            <p>Count:{count}</p>
            <button onClick={increment}>Increment</button>
        </div>
    )
}
export default Counter