import React, { Component } from 'react';
import logo from './OIP.jpg'; // Ensure the path to the image is correct

class SrchResult extends Component {
    render() {
        return (
            <div>
                <ResImage />
                <ResCaption />
                <ResLink />
            </div>
        );
    }
}

class ResImage extends Component {
    render() {
        return (
            <div>
                <img src={logo} alt="Description of the image" />
            </div>
        );
    }
}

class ResCaption extends Component {
    render() {
        return (
            <div>
                <p>This is the caption for the image.</p> {/* Add meaningful text here */}
            </div>
        );
    }
}

class ResLink extends Component {
    render() {
        return (
            <div>
                <a href="https://www.brittania.com" target="_blank" rel="noopener noreferrer">
                    Image link
                </a>
            </div>
        );
    }
}

export default SrchResult;

/*
React using  react hooks
if you want to update the color use setColor e.g
function fcolor(){
const[color,setColor]=React.useState("");
}

react useeffect Hook
it is used to perform side effect to the component
useeffect(<function>,<dependency>)
*/

