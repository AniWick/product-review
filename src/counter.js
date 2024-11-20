import React,{Component} from 'react'
class Counter extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state={seconds:0}
    }

    componentDidMount()//Mounting a component
    {
        this.interval=setInterval(()=>{
            this.setState((prevState)=>({
                seconds:prevState.seconds+1
            }))
        },1000)
    }
    componentWillUnmount()//Unmounting the component    
    {
        clearInterval(this.interval)
    }
    render()
    {
        return <h1>{this.state.seconds}</h1>
    }
}
class Display extends React.Component
{
    render()
    {
        return(
            <div>
                <Counter/>
                <h2>seconds</h2>
            </div>
        )
    }
}
export default Display