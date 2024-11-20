import React from 'react'

function Demo(props){
    return<h1> Welcome to REACT JS,{props.Name}</h1>;
}
/*const root=ReactDOM.createRoot(document.getElementById('root'))
const element=<Demo name="PESU"></Demo>
root.render(element)*/
function Parent()
{
    return(
        <div>
            <Demo name="PESU"/>
        </div>
    )
}
export default Demo