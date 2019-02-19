import React, { Component } from 'react';
import { textValdation } from '../Helpers/validation';

export default class Name extends Component {
  constructor(props) {
    super(props);
    const { field: { inputs } } = props;
    this.state = {
      nameValues: inputs.map((input) => {
        const formattedId = input.id.replace('.', '_');
        return ({
          id: formattedId,
          value: ''
        });
      })
    };
  }
  componentWillMount() {
    const { nameValues } = this.state;
    this.updateField(nameValues, this.props.field);
  }
  componentWillReceiveProps(nextProps) {
    const { field: { inputs }, submitSuccess } = nextProps;
    if (this.props.submitSuccess !== submitSuccess) {
      const nameValues = inputs.map((input) => {
        const formattedId = input.id.replace('.', '_');
        return ({
          id: formattedId,
          value: ''
        });
      });
      this.setState({ nameValues }, () => {
        this.updateField(nameValues, nextProps.field);
      });
    }
  }
  updateField(event, field, inputId = '11_3') {
    const {
      id,
      required,
    } = field;
    const { nameValues } = this.state;
    const value = event.target ? event.target.value : null;
    const valid = textValdation(required, value);
    nameValues.find(item => item.id === inputId).value = value;
    this.setState({ nameValues }, () => {
      this.props.updateForm(nameValues, id, valid, true);
    });
  }
  render() {
    const {
      field,
      submitFailed,
      isValid,
    } = this.props;
    const { nameValues } = this.state;
    const {
      id,
      required,
      classes,
      placeholder,
      maxLength,
      inputs
    } = field;
    const getValue = (idValue) => {
      if (!nameValues || !idValue) return '';
      const fieldData = nameValues.find(item => item.id === idValue);
      if (!fieldData) return '';
      return fieldData.value;
    };
    return (
      <div className={!isValid && submitFailed ? `field error ${classes}` : `field ${classes}`}>
        {inputs.map((input) => {
          const {
            id: inputId,
            label,
            isHidden
          } = input;
          const formattedId = inputId.replace('.', '_');
          if (isHidden) return null;
          return (
            <div className="text" key={inputId}>
              <label htmlFor={id}>
                {label}{required ? <abbr>*</abbr> : null}
                <input
                  name={formattedId}
                  type="text"
                  value={getValue(formattedId)}
                  placeholder={placeholder}
                  maxLength={maxLength}
                  required={required}
                  onChange={event => this.updateField(event, field, formattedId)}
                />
              </label>
            </div>
          );
        })}
      </div>
    );
  }
}
