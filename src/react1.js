/* import React from 'react'
class Demo extends React.Component //Stateful Component
{
    render()
    {
        // return <h1>Welcome to PESU</h1>   //JSX
        return React.createElement("h1",null,"welcome in non JSX")
    }
}
export default Demo
*/
<html>
	<head>
		<title> React</title>
		<script crossdomain src="https://unpkg.com/react@17/umd/react.development.js ">
		</script>
		<script crossdomain src="https://unpkg.com/react-dom@17/umd/react-dom.development.js">
		</script>
		<script crossdomain src="https://unpkg.com/babel-standalone@6.15.0/babel.min.js ">
		</script>	
				
	</head>
	<body >
		<div id="root"></div>
		<script type="text/babel"> 
        //Stateful
		class Car extends React.Component{
            render() {
                return <h2>I am a {this.props.color} Car!</h2>;
            }
        }
        ReactDOM.render(<Car color="blue"/>,
        document.getElementById('root'));
		</script>
    </body>
</html>