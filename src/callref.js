import React from "react"
function Custom(props)
{
    return(
        <div>
            <input type="text" ref={props.myRef}/>
        </div>
    )
}
class Demo extends React.Component
{
    constructor(props)  // keys are used to keep track of elements in a list
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
                <Custom myRef={this.myRef}/>
                <input type="button" value="Focus on the text Input"
                Onclick={this.focusText}/>
            </div>
        )
    }
}
export default Demo