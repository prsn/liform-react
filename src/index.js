import React, { Component } from "react";
import PropTypes from "prop-types";
import DefaultTheme from "./themes/bootstrap3";
import { reduxForm } from "redux-form";
import renderFields from "./renderFields";
import renderField from "./renderField";
import processSubmitErrors from "./processSubmitErrors";
import buildSyncValidation from "./buildSyncValidation";
import { setError } from "./buildSyncValidation";
import compileSchema from "./compileSchema";

class BaseForm extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { schema, handleSubmit, theme, error, submitting, context } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        {renderField(schema, null, theme || DefaultTheme, "", context)}
        <div>{error && <strong>{error}</strong>}</div>
        <button className="btn btn-primary" type="submit" disabled={submitting}>
          Submit
        </button>
      </form>
    );
  }

}

class Liform extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    console.log('Liform - componentWillMount...');
    var props = this.props;
    props.schema.showLabel = false;
    const schema = compileSchema(props.schema);
    const formName = props.formKey || props.schema.title || "form";
    const FinalForm = reduxForm({
      form: props.formKey || props.schema.title || "form",
      validate: props.syncValidation || buildSyncValidation(schema, props.ajv),
      initialValues: props.initialValues,
      context: { ...props.context, formName }
    })(props.baseForm || BaseForm);

    this.FinalForm = FinalForm;
  }

  render() {
    var FinalForm = this.FinalForm;
    const schema = compileSchema(this.props.schema);
    return (
      <FinalForm
        renderFields={renderField.bind(this)}
        {...this.props}
        schema={schema}
      />
    );
  }

}

Liform.propTypes = {
  schema: PropTypes.object,
  onSubmit: PropTypes.func,
  initialValues: PropTypes.object,
  syncValidation: PropTypes.func,
  formKey: PropTypes.string,
  baseForm: PropTypes.func,
  context: PropTypes.object,
  ajv: PropTypes.object
};

export default Liform;

export {
  renderFields,
  renderField,
  processSubmitErrors,
  DefaultTheme,
  setError
};
