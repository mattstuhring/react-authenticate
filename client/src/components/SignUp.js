import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';

import CustomInput from './CustomInput';
import * as actions from '../actions';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(formData) {
    console.log('onSubmit() got called');
    console.log('formData ', formData);
    // We need to call some ActionCreator
    this.props.signUp(formData);

    if (!this.props.errorMessage) {
      this.props.history.push('/dashboard');
    }
  }

  render() {
    const { handleSubmit } = this.props; // handleSubmit -> redux-form method

    let errorMessage;
    if (this.props.errorMessage) {
      errorMessage = <div className="alert alert-danger">
                      { this.props.errorMessage }
                    </div>;
    } else {
      errorMessage = null;
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <form onSubmit={handleSubmit(this.onSubmit)}>
              <div className="row">
                <div className="col-sm-6 offset-sm-3">
                  <fieldset>
                    <Field
                      name="email"
                      type="text"
                      id="email"
                      label="Enter your email"
                      placeholder="example@example.com"
                      component={ CustomInput }
                    />
                  </fieldset>
                  <fieldset>
                    <Field
                      name="password"
                      type="password"
                      id="password"
                      label="Enter your password"
                      placeholder="yoursuperpassword"
                      component={ CustomInput }
                    />
                  </fieldset>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6 offset-sm-3">

                  { errorMessage }

                  <button type="submit" className="btn btn-primary float-right">Sign Up</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.errorMessage
  }
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'signup' })
)(SignUp)
