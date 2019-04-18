import React from 'react';
import { connect } from 'react-redux';
import { fetchTodo } from '../../actions';

class TodoShow extends React.Component {
    componentDidMount(){
        this.props.fetchTodo(this.props.match.params.id);
    }
    render() {
        if (!this.props.todo){
            return <div>Loading </div>;
        }

        const {name, description, status, is_deleted} = this.props.todo;
        return(
            <div>
                <h5>Name: {name}</h5>
                <h5>Description: {description}</h5>
                <h5>Status: {status}</h5>
                <h5>Is Deleted: {JSON.stringify(is_deleted)}</h5>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {todo: state.todos[ownProps.match.params.id]};
};

export default connect(mapStateToProps, { fetchTodo }) (TodoShow);