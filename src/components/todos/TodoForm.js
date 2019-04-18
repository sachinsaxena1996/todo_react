import React from 'react';
import { Field, reduxForm } from 'redux-form';

class TodoForm extends React.Component {

    renderError({ error, touched }) {
        if (touched && error) {
            return(
                <div className="ui error message">
                    <div className="header"> {error} </div>
                </div>
            );
        }
    }

    renderInput = ( { input, label, meta } ) => {     
        const className = `field ${ meta.error && meta.touched ? 'error' : ''  }`;
        return (
            <div className={className} >
                <label> {label} </label>                        
                <input { ...input } autoComplete="off"/>                                
                {this.renderError(meta)}
            </div>
        );
    };

    onSubmit = (formValues) => {
        this.props.onSubmit(formValues);
    };

    render(){
        return(
            <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit) }>
                <Field name="name"  component={this.renderInput} label="Enter Name" />
                <Field name="description"  component={this.renderInput} label="Enter Description" />
                <Field name="status"  component={this.renderInput} label="Enter Status" />                    
                <button className="ui button primary">Submit</button>
            </form>
        );
    }   
}

const validate = (formValues) => {
    const errors = {};

    if (!formValues.name) {
        errors.name = "You must entered a name";
    }

    if (!formValues.description) {
        errors.description = "You must entered a description";
    }

    if (!formValues.status) {
        errors.status = "You must entered a status";
    }

    if ((formValues.status !== "start") && (formValues.status !== "finish") && (formValues.status !== "not_start") ) {
        errors.status = "You must enter a valid status";
    }

    return errors;
};

export default reduxForm({
    form: 'TodoForm',
    validate
}) (TodoForm);

