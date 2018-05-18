import React, { Component } from 'react';
import './css/bootstrap.min.css';
import './css/dashboard.css'

class Student extends Component{
  state = {
    name: "",
    subjects: []
  }
  constructor(props){
    super(props);
    this.state.name = props.name;
  }
  componentDidMount(){
    fetch('/students/'+this.state.name)
      .then(res => res.json())
      .then(result => this.setState({
        name: result[0].name,
        subjects: result[0].subjects
      }))
  }

  render(){
    return(
      <div>

      <header class="blog-header py-3">
        <div class="row flex-nowrap justify-content-between align-items-center">
          <div class="col-12 text-center">
            <p class="blog-header-logo text-dark">Student: {this.state.name}</p>
          </div>
        </div>
      </header>
      <br/>

      <table class="table table-responsive">
      <tbody>
      {
        this.state.subjects.map( sub =>
          <tr>
            <th scope="row">
              {sub.subject_name}  
            </th>
            {
              sub.grades.map( grade =>
                <td>
                  {grade}
                </td>
              )
            }
          </tr>
        )
      }
      </tbody>
      </table>
      </div>
    );
  }
}


class Teacher extends Component{
  state = {
    name: "",
    subject: "",
    students: [],
    input: {
      name: "",
      oldgrade: 0,
      newgrade: 0
    },
    flag1: 0,
    flag2: 0,
    flag3: 0
  }

  constructor(props){
    super(props);
    this.state.subject = props.subject;

  }
  componentDidMount(){
    fetch('/teachers/'+this.state.subject)
      .then(res => res.json())
      .then(result => this.setState({
        name: result.name,
        subject: this.state.subject,
        students: result.students
      }));
  }

  Add() { 
    if(this.state.flag1 == 0){
      return (
        <a class="p-2 text-muted" href="#" onClick={()=> this.setState({flag1: 1})}>
          Add grade
        </a>
      );
    }else{
      return (
        <form onSubmit={()=>{

          console.log( this.state.input);
          fetch('teachers/'+this.state.subject, {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
              this.state.input
            )});
          this.setState({flag1: 0})
          this.componentDidMount();
          }}>
          
        <label class="p-2 text-muted">
          Name:
          <input type="text" value={this.state.input.name} onChange={(e)=> this.setState({
            input:{
              name: e.target.value,
              newgrade: this.state.input.newgrade
            }
            })} />
          Grade:
          <input type="text" value={this.state.input.newgrade} onChange={(e)=> this.setState({
            input:{
              name: this.state.input.name,
              newgrade: e.target.value
            }
            })} />
              </label>
        <input type="submit" value="Submit" />
      </form>
      )
    }
  }
  Update(){
    if(this.state.flag2 == 0){
      return (
        <a class="p-2 text-muted" href="#" onClick={()=> this.setState({flag2: 1})}>
          Update grade
        </a>
      );
    }else{
      return (
        <form onSubmit={()=>{
          console.log( this.state.input);
          fetch('teachers/'+this.state.subject, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
              this.state.input
            )});
          this.setState({flag2: 0});
          this.componentDidMount();
          }}>
        <label class="p-2 text-muted">
          Name:
          <input type="text" value={this.state.input.name} onChange={(e)=> this.setState({
            input:{
              name: e.target.value,
              oldgrade: this.state.input.oldgrade,
              newgrade: this.state.input.newgrade
            }
            })} />
          Old grade:
          <input type="text" value={this.state.input.oldgrade} onChange={(e)=> this.setState({
            input:{
              name: this.state.input.name,
              oldgrade: e.target.value,
              newgrade: this.state.input.newgrade
            }
            })} />
          New grade:
          <input type="text" value={this.state.input.newgrade} onChange={(e)=> this.setState({
            input:{
              name: this.state.input.name,
              oldgrade: this.state.input.oldgrade,
              newgrade: e.target.value
            }
            })} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      )
    }
  }
  Delete() { 
    if(this.state.flag3 == 0){
      return (
        <a class="p-2 text-muted" href="#" onClick={()=> this.setState({flag3: 1})}>
          Delete grade
        </a>
      );
    }else{
      return (
        <form onSubmit={()=>{
          console.log( this.state.input);
          fetch('teachers/'+this.state.subject, {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
              this.state.input
            )});
          this.setState({flag3: 0});
          this.componentDidMount();
          }}>
        <label class="p-2 text-muted">
          Name:
          <input type="text" value={this.state.input.name} onChange={(e)=> this.setState({
            input:{
              name: e.target.value,
              oldgrade: this.state.input.oldgrade,
              newgrade: this.state.input.newgrade
            }
            })} />
          Grade:
          <input type="text" value={this.state.input.oldgrade} onChange={(e)=> this.setState({
            input:{
              name: this.state.input.name,
              oldgrade: e.target.value,
              newgrade: this.state.input.newgrade
            }
            })} />
              </label>
        <input type="submit" value="Submit" />
      </form>
      )
    }
  }  

  render(){
    return(
      <div>
      <header class="blog-header py-3">
        <div class="row flex-nowrap justify-content-between align-items-center">
          <div class="col-12 text-center">
            <p class="blog-header-logo text-dark">{this.state.subject}: {this.state.name}</p>
          </div>
        </div>
      </header>
      <div class="nav-scroller py-1 mb-1">
          {this.Add()}
          {this.Update()}
          {this.Delete()}
          <a class="p-2 text-muted" href="#" onClick={()=> this.componentDidMount()}>Refresh</a>
      </div>

      <table class="table table-responsive">
      <tbody>
      {
        this.state.students.map( std =>
          <tr>
            <th scope="row">
              {std.name}  
            </th>
            {
              std.grades.map( grade =>
                <td>
                  {grade}
                </td>
              )
            }
          </tr>
        )
      }
      </tbody>
      </table>
      </div>
    )
  }
}

class App extends Component {
  state = {
    login: "",
    flag: 0,
    isTeacher: false
  }
  render() {
    if(this.state.flag == 0){
      return(
        <div>
        <header class="blog-header py-3">
          <div class="row flex-nowrap justify-content-between align-items-center">
            <div class="col-12 text-center">
              <p class="blog-header-logo text-dark">Dziekanat</p>
            </div>
          </div>
        </header>
        <form onSubmit={()=>this.setState({
            login: this.state.login,
            flag: 1,
            isTeacher: this.state.isTeacher
          })}>
        <label class="p-2 text-muted">
          Login:
          <input type="text" value={this.state.login} onChange={(e)=> this.setState({
              login: e.target.value,
              flag: 0,
              isTeacher: false
            })} />
          Login as a teacher:
          <input type="checkbox" onChange={(e)=> this.setState({
              login: this.state.login,
              flag: 0,
              isTeacher: true
            })} />
              </label>
        <input type="submit" value="Submit" />
      </form>
        </div>
      )
    }else{
      if(this.state.isTeacher){
        return(<Teacher subject= {this.state.login}/>);
      }else{
        return(<Student name= {this.state.login}/>);
      }
    }
  }
}
export default App;
