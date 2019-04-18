import React from 'react';
import { connect } from 'react-redux';
import { fetchTodos, fetchTodosByTag, updateTodoStatus, attachTagToTodo} from '../../actions';
import { Link } from 'react-router-dom';
import TodoFilterForm from './TodoFilterForm';
import TodoAttachTag from './TodoAttachTag';

class TodoList extends React.Component {

    componentDidMount() {        
        this.props.fetchTodos();
    }

    renderAction(todo){
        if (todo.is_deleted === false){
            return(<Link to={`/todos/delete/${todo._id.$oid}`} className="ui icon button negative">
                <i className="trash alternate outline icon"></i>
            </Link>);
        }
        else {
            return(<Link to={`/todos/${todo._id.$oid}/is_deleted`} className="ui icon button negative">
            <i className="undo alternate icon"></i>
            </Link>);
        }
    }

    renderList(){
        if (!this.props.todos){
            return <div>Loading </div>;
        }
       
        if (this.props.todos.length > 0){             
            return this.props.todos.map( todo => {
                return(                
                    <tr className="item" key={todo._id.$oid}>
                        <td data-label="Name"><Link to={`/todos/${todo._id.$oid}`} className="header">
                            {todo.name}
                        </Link></td>
                        <td data-label="Description">{todo.description}</td>
                        <td data-label="Status">
                            <select value={todo.status} onChange={(e) => this.handleChange(todo._id.$oid, e)} >
                                <option value="start">Start</option>
                                <option value="not_start">Not Start</option>
                                <option value="finish">Finish</option>
                            </select>
                        </td>
                        <td data-label="Is_Deleted">{JSON.stringify(todo.is_deleted)}</td>
                        <td data-label="Actions">
                            <Link to={`/todos/edit/${todo._id.$oid}`} className="ui icon button primary">
                                <i className="edit outline icon"></i>
                            </Link>                            
                            {this.renderAction(todo)}
                            <TodoAttachTag onSubmit={(tag_name) => this.attachTag(todo._id.$oid, tag_name)} />
                        </td>
                    </tr>                
                );
            });
        }
    }

    handleChange = (todo_id, event) => {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        this.setState({status: event.target.value});
        this.props.updateTodoStatus(todo_id, event.target.value);
        alert("Todo status updated successfully");
    }

    renderCreate() {        
        return(
            <div style={{textAlign: 'right'}}>
                <Link to="/todos/new" className="ui button primary">
                    Create Todo
                </Link>
            </div>
        );        
    }

    onSubmit = (formValues, tag_name) => {        
        if( tag_name.length > 0 ){
            this.props.fetchTodosByTag(formValues, tag_name);
        }        
        else {
            this.props.fetchTodos();
        }
    };

    attachTag = (todo_id, tag_name) => {        
        this.props.attachTagToTodo(todo_id, tag_name);
        alert("Todo attached successfully");    
    };

    render(){        
        return(
            <div>
                <TodoFilterForm onSubmit={this.onSubmit} />
                <h2> ToDos </h2>
                <table className="ui celled table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Is_Deleted</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderList()}
                    </tbody>
                </table>
                {this.renderCreate()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {    
    return {
        todos: Object.values(state.todos)
    };
};

export default connect(mapStateToProps, {fetchTodos, fetchTodosByTag, updateTodoStatus, attachTagToTodo}) (TodoList);