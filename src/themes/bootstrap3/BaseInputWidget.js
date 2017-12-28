import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Field } from "redux-form";

const renderInput = field => {
  const className = classNames([
    "form-group",
    { "has-error": field.meta.touched && field.meta.error }
  ]);
  return (
    <div className={className}>
      <label className="control-label" htmlFor={field.id}>
        {field.label}
      </label>
      <input
        {...field.input}
        type={field.type}
        required={field.required}
        className="form-control"
        placeholder={field.placeholder}
      />
      {field.meta.touched &&
        field.meta.error && (
          <span className="help-block">{field.meta.error}</span>
        )}
      {field.description && (
        <span className="help-block">{field.description}</span>
      )}
    </div>
  );
};

class BaseInputWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    }
  }

  toggleHovering = () => {
    var hover = this.state.hover;
    this.setState({
      hover: !hover
    });
  }

  render() {
    var isHovering = ((this.state && this.state.hover) || false),
        props = this.props,
        isEditMode = props.isEditMode || false;
    
    return (
      <div onMouseEnter={this.toggleHovering} onMouseLeave={this.toggleHovering}>
        <div style={{height: 20}}>
          {
            isEditMode && isHovering && <div>
                <a href="#" onClick={() => console.log('Edit clicked')}><span className='glyphicon glyphicon-edit'/></a>
                <a href="#" onClick={() => console.log('Remove clicked')}><span className='glyphicon glyphicon-remove-circle'/></a>
              </div>
          }
        </div>
        <Field
          component={renderInput}
          label={props.label}
          name={props.fieldName}
          required={props.required}
          id={"field-" + props.fieldName}
          placeholder={props.schema.default}
          description={props.schema.description}
          type={props.type}
          normalize={props.normalizer}
        />
      </div>
    )
  }
}

BaseInputWidget.propTypes = {
  schema: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  required: PropTypes.bool,
  fieldName: PropTypes.string,
  label: PropTypes.string,
  normalizer: PropTypes.func
};

export default BaseInputWidget;
