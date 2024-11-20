import React from 'react'

class Clock extends React.Component
{
    constructor(props){
        super(props)
        this.state={date:new Date()}// to make something dynamic we use state (initializes to whatever we set here its is new state)
    }
    componentDidMount()
    {
        this.timerID=setInterval(()=>this.tick(),1000)
    }
    componentWillUnmount()
    {
        clearInterval(this.timerID)
    }
    tick()
    {
        this.setState({  // define a new state
            date:new Date
        })
    }
    render()
    {
        return(
            <div>
                <h1>Time</h1>
                <h1>it is{this.state.data.toLocalTimeString}</h1>
            </div>
        )
    }
}