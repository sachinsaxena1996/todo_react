import React from 'react';
import { reduxForm } from 'redux-form';

class TodoFilterForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {tag_name: ''};
      this.handleChange = this.handleChange.bind(this);
    }
  
    handleChange(event) {
      this.setState({tag_name: event.target.value});
    }
  
    onSubmit = (formValues) => {
        this.props.onSubmit(formValues, this.state.tag_name);
    };
  
    render() {
      return (
        <form onSubmit={this.props.handleSubmit(this.onSubmit) }>
            <input type="text" value={this.state.tag_name} onChange={this.handleChange} name="tag_name" placeholder="Filter by Tag Name" autoComplete="off"/>
            <button title="Apply Filter" type="submit" value="Submit" ><i className="filter icon"></i></button>        
        </form>
      );
    }
  }
  
export default reduxForm({
    form: 'TodoFilterForm'
}) (TodoFilterForm);