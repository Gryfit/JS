import React, { Component } from 'react';
import File  from './file.js'

class Directory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            ls: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.returndir = this.returndir.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }
    handleSubmit(event) {
        //reload windows content

        console.log(this.state.ls);
        event.preventDefault();
    }
    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                  <label>
                    Directory:
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                  </label>
                </form>
                <div>
                    <table>
                        <tbody>
                          <tr>
                            <td><File name={this.state.ls}/></td>
                          </tr>
                          <tr>
                            <td>KOTA</td>
                          </tr>
                          <tr>
                            <td>JAJEBIE</td>
                          </tr>
                        </tbody>
                    </table>

                </div>
            </div>
        )
    }
}
export default Directory;
