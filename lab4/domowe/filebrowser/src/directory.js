import React, { Component } from 'react';
import File  from './file.js'
const fs = require('fs');
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
    returndir(input) {
      if (fs.existsSync(__dirname.concat(input))) {
        const stat = fs.statSync(__dirname.concat(input), (err, st) => {
          if (err) {
            console.log(err);
          }
          return st;
        });
        if (stat.isDirectory()) {
        } else if (stat.isFile()) {
          const contents = fs.readFileSync(__dirname.concat(input)).toString();
          return contents;
        } else {
            return "batat";
        }
      }
      return "asd";
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }
    handleSubmit(event) {
        //reload windows content
        this.setState({ls: this.returndir(this.state.value)});
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
