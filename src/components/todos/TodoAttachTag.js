import React from 'react';
import { reduxForm } from 'redux-form';

class TodoAttachTag extends React.Component {
    constructor(props) {
      super(props);
      this.state = {tag_name: ''};
      this.handleChange = this.handleChange.bind(this);
    }
  
    handleChange(event) {
      this.setState({tag_name: event.target.value});
    }
  
    onSubmit = () => {
        this.props.onSubmit(this.state.tag_name);

    };
  
    render() {
      return (
        <div style={{display: 'inline-block'}}>
            <input type="text" value={this.state.tag_name} onChange={this.handleChange} name="tag_name" placeholder="Attach Tag" autoComplete="off"/>
            <button title="Attach Tag" type="button" onClick={this.onSubmit }  ><i className="tag icon"></i></button>        
        </div>
      );
    }
  }
  
export default reduxForm({
    form: 'TodoAttachTag'
}) (TodoAttachTag);