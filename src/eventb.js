import React from 'react'
/*function Demo()
{
    const name =()=>{
        alert("PESU")
    }
    return(
        <button onClick={name}>Click ME!</button>
    )
}
export default Demo
*/

/*
class Demo extends React.Component
{
    constructor(props){
        super(props)
        this.setRef=(el)=>this.myRef=el //getting content as h1
        this.showChar=(event)=>{  //function call
            this.myRef.innerHTML=event.target.value
        }
    }
    render(){
        return(
            <div>
                <input onChange={this.showChar} type="text"/>
                <h1 ref={this.setRef}/>
            </div>
        )
    }
}
export default Demo  */

class Demo extends React.Component{
    constructor(props){
        super(props);
        this.setRef=(el)=>{this.myRef=el};
        this.showChar=(event)=>{
            if(event.shiftKey)
                var txt="<span style='color:red'>"+event.key+"</span>"
            else
                txt=event.key
            this.myRef.innerHTML+=txt.console.log(event);
            console.log(event);
            event.persist();
            // to keep a reference to the event; beyon the current event handler's scope
            event.preventDefault()
        }
    }
    render(){
        return(
            <div>
                <input onKeyPress={this.showChar} type="text"/>
                <h1 ref={this.setRef}/>
            </div>
        )
    }
}
export default Demo