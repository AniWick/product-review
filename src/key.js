import React from 'react'
function NumberList(props){
    const numbers=props.numbers;
    const listItems= numbers.map((num)=> // state cannot be used in functions can only be used in classes
    <li key ={num.toString()}>{num*2}</li>
    );
    return(
        <ul>{listItems}</ul>
    );
}
const numbers=[1,2,3,4,5];
function Parent()
{
    return(
        <div>
            <NumberList numbers={numbers}/>
        </div>
    )
}
export default Parent