import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getForm, updateForm, submitForm } from '../../actions/gravityforms';
import { RenderFields } from './RenderFields';
import { Button } from './Button';
import { FormError } from './FormError';
import { FormConfirmation } from './FormConfirmation';

const getButtonClasses = (isValid, loading) => {
  if (loading) return 'loading';
  else if (!isValid) return 'disabled';
  return 'active';
};

class GravityForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitFailed: false
    };
  }
  componentWillMount() {
    if (!this.props.gravityforms[this.props.formId]) this.props.getForm(this.props.formId);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.formId !== nextProps.formId) {
      this.props.getForm(nextProps.formId);
    }
  }
  updateFormHandler = (value, field, valid, isName) => {
    this.props.updateForm(value, field, valid, this.props.formId, isName);
  }
  submit = (event) => {
    event.preventDefault();
    const { formId, gravityforms } = this.props;
    if (gravityforms[formId].isValid) {
      this.setState({submitFailed: false});
      this.props.submitForm(formId, gravityforms[formId].formValues);
    } else this.setState({submitFailed: true});
  }
  render() {
    const {
      gravityforms,
      formId,
      showTitle,
      showDescription,
      location
    } = this.props;
    // Handle no form with formId
    if (!gravityforms[formId]) return <p>No form found with ID {formId}</p>;
    // Pluck values from Gravity Form API response made in componentWillMount
    const {
      activeForm,
      formValues,
      loading,
      submitting,
      submitSuccess,
      isValid
    } = gravityforms[formId];
    // Handle form loading
    if (loading) return <p className="loading">Loading</p>;
    // Handle error
    if (!activeForm) return <span>Something went wrong loading form with ID: {formId}</span>;
    // Pluck values from activeForm in the Gravity Forms API response
    const {
      title,
      description,
      button,
      fields,
      confirmation
    } = activeForm;
    // Submit failed watcher
    const { submitFailed } = this.state;
    const currentForm = this.props.gravityforms[this.props.formId];
    const postFailed = currentForm && currentForm.hasSubmitted && !currentForm.submitting && !currentForm.submitSuccess;
    // Handle form with zero fields
    if (!fields) return <span>Form with ID {formId} has no fields</span>;
    return (
      <div className="form" id={`gravity_form_${formId}`}>
        {showTitle ? <h3 className="form_title">{title}</h3> : null}
        {showDescription ? <p className="form_description">{description}</p> : null}
        <FormError
          errorMessage="There was a problem with your submission"
          showError={submitFailed || postFailed}
        />
        <FormConfirmation
          confirmation={confirmation}
          showConfirmation={submitSuccess && confirmation}
        />
        <form onSubmit={this.submit} noValidate>
          <RenderFields
            fields={fields}
            formValues={formValues}
            submitFailed={submitFailed}
            submitSuccess={submitSuccess}
            updateForm={this.updateFormHandler}
            location={location}
          />
          <Button
            text={button}
            className={getButtonClasses(isValid, loading)}
            showLoading={submitting}
          />
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({gravityforms}) => {
  return {
    gravityforms
  };
};

export default connect(mapStateToProps, { getForm, updateForm, submitForm })(GravityForm);
