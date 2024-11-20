class MyComponent extends React.Component{
    constructor(props){
        super(props);
        this.MyRef=React.createRef();
    }
}

componentDidMount(){
    const node=this.myRef.current;
    console.log('DOM Node:',node);
}

render(){
    return(
        <div ref={this.myRef}style={{width:'100px',height:'100px',backgroundColor:'lightblue'}}>Ref Demo</div>
    )
}
export default MyComponent