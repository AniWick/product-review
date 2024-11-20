import React from "react"

class Demo extends React.Component
{
    constructor(props)
    {
        {
            super(props)
            {
                this.myRef=React.createRef()
            }
        }
    }
    focusText()
    {
        this.myRef.current.focus()
    }
    render()
    {
        return(
            <div>
                <input type="text"  ref={this.myRef}/>
                <input type="button" value="Focus on the text Input"
                Onclick={this.focusText}/>
            </div>
        )
    }
}
export default Demo