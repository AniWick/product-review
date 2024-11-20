import React from 'react'

class Demo extends React.Component{
    constructor(props)
    {
        super(props)
        this.state={cricketer:"Rohit"}
    }
    shouldComponentUpdate()
    {
        return true
    }
    change=()=>
    {
        this.setState({cricketer:"virat"})
    }
    render()
    {
        return(
            <div>
                <h1>Fav Player is:{this.state.cricketer}</h1>
                <button onClick={this.change}>Change</button>
            </div>
        )
    }
}
export default Demo
/*Props are immutable. Props can be passed as regular parameters.
States are mutable.They are functions that can be passed.*/