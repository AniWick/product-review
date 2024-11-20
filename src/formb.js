//Controlled form->state
import React from "react";
 class Demo extends React.Component 
 {
    constructor(props)
    {
        super(props)
        this.state={name:"PESU",age:50}

        this.handleChange=this.handleChange.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
    }
    handleChange=function(event)
    {
        var name=event.target.name
        var value=event.target.value
        this.setState({[name]:value})
    }
    handleSubmit=function(event)
    {
        alert("name entered is:"+this.state.name+"age entered is:"+ this.state.age)
    }
    render()
    {
        return(
            <form onSubmit={this.handlesubmit}>
                <label>Name:</label>
                <input type="text" name="name" value={this.state.name}
                onChange={this.handleChange}/>
                <label>Age:</label>
                <input type="text" name="age" value={this.state.age}
                onChange={this.handleChange}/>
                <input type="submit"/>
            </form>
        )
    }
 }
 export default Demo