import React from "react"

class Demo extends React.Component{
    constructor(props)  // to access dom elements we use reference
    {
        super(props)
        {
            this.myRef=React.createRef() // for creating a reference in react
        }
    }
    changeText=(event)=>
    {
        console.log(event.target.value+ "Clicked")
        this.myRef.current.innerHTML="changed"  // we use current to acces the reference
    }
    render()
    {
        return(
            <div>
                <h1 ref={this.myRef}>This is text</h1>
                <input type = 'button' value="Change the text"
                onClick={this.changeText}/>
            </div>
        )
    }
}
export default Demo