import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const initialState = {
    data:{
        text:'',
        priority: ''
    },
    priority_list : [
        'Normal',
        'High',
        'Emergency'
    ],
    edit_mode: false,
    selected_index: null,

}

class App extends Component {


    state = {
        data:{
            text:'',
            priority:''
        },
        todos:[],
        priority_list : [],
        edit_mode : false,
        selected_index: null,
        errors:{}
    }
    constructor(props) {
        super(props);
        this.state.data = initialState.data ;
        this.state.priority_list = initialState.priority_list;
        this.state.todos.push({text:'Install Nodejs and npm', priority: this.state.priority_list[0]});
        this.state.todos.push({text:'Install text editor/ IDE', priority: this.state.priority_list[1]});
    }

    handle_change = (e)=>{
        const data = {...this.state.data};
        data[e.target.name] = e.target.value;
        this.setState({data});
    }


    handle_todo_submit = () =>{
        let {data, edit_mode, selected_index} = this.state;
        const errors = [];

        // Perform validation

        if(data.text.trim() == "" ){ // check for text field
            errors["text"] = "Task field can't be empty" ;
        }
        //
        if(data.priority.trim() == ""){ // check for priority field
            errors["priority"] = "Priority field can't be empty";
        }

        if(Object.keys(errors).length > 0){
            this.setState({errors});
            return ;
        }


        const todos = [...this.state.todos];
        // check if not in edit mode
        if(!edit_mode){
            todos.push(data);
        }else{ // if edit mode
            todos[selected_index] = data;
        }

        this.setState({todos, errors ,data: initialState.data, edit_mode: initialState.edit_mode, selected_index: initialState.selected_index});
    }

    handle_edit_btn = (index) =>{

        let {data, edit_mode, todos, selected_index} = this.state;
        edit_mode = true;
        data = todos[index];
        selected_index = index;
        this.setState({data,edit_mode, selected_index });

    }

    handle_delete_btn = (index) => {
        let {data, edit_mode, todos} = this.state;
        todos.splice(index,1);
        this.setState({todos});
    }

    render(){
        const {data,todos,edit_mode,priority_list, errors} = this.state;

        return(

            <div className="App">

                <div className="container">
                    <div className="col-md-8 col-md-offset-2">



                        <h1 style={{textAlign: 'center', marginBottom: '20px'}}>Todo Application</h1>
                        <div className={"alert " + ((todos.length > 0) ? "alert-info" : "alert-success") }>There are {todos.length} pending tasks</div>

                        <table className="table table-responsive table-bordered">
                            <tbody>
                            <tr>
                                <th>#</th>
                                <th>Task</th>
                                <th>Priority</th>
                                <th>Action</th>
                            </tr>

                            {
                                (todos.length > 0) ?
                                    todos.map((todo,index)=>
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{todo.text}</td>
                                            <td>{todo.priority}</td>
                                            <td>
                                                <div className="action-box">
                                                    <button className="btn btn-xs btn-primary" onClick={this.handle_edit_btn.bind(this,index)}><span className="fa fa-pencil" ></span></button>
                                                    <button className="btn btn-xs btn-danger" onClick={this.handle_delete_btn.bind(this,index)}><span className="fa fa-trash" ></span></button>

                                                </div>
                                            </td>
                                        </tr>
                                    ) :
                                    <tr>
                                        <td colSpan="4" className="text-center"> No Pending Task</td>
                                    </tr>
                            }
                            </tbody>
                        </table>
                        <div className="row">
                            <div className="form-group">
                                <div className="col-md-6 ">
                                    <input type="text" name="text" value={data.text} onChange={this.handle_change.bind(this)} className="form-control"/>
                                    { (errors.text) ?
                                        <p className="text-danger">{errors.text}</p>
                                        : null
                                    }
                                </div>
                                <div className="col-md-4 ">
                                    <select value={data.priority} name="priority" className="form-control" onChange={this.handle_change.bind(this)} >
                                        <option value="" >Select Priority</option>
                                        { priority_list.map((item) =>
                                            <option key={item}>{item}</option>
                                        )}
                                    </select>
                                    { (errors.priority) ?
                                        <p className="text-danger">{errors.priority}</p>
                                        : null
                                    }
                                </div>
                                <div className="col-md-2">
                                    <button type="button" className={"btn form-control " + ((!edit_mode) ?  "btn-primary" : "btn-info") } onClick={this.handle_todo_submit}>
                                        <i className={"fa " + ((!edit_mode) ?  "fa-plus" :  "fa-check")}></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default App;
