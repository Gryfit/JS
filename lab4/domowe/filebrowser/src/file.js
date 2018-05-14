import React, { Component } from 'react';
class File extends Component {
    constructor(props) {
        super(props);
        this.state = {name: ''};
    }
    render(){
        return(
            <div>
                <span>{this.state.value}</span>
            </div>
        )};
}
export default File;
