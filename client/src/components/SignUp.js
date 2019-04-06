import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';

import CustomInput from './CustomInput';

class SignUp extends Component {

  onSubmit(formData) {
    console.log('onSubmit() got called');
    console.log('formData ', formData)
  }

  render() {
    const { handleSubmit } = this.props; // handleSubmit -> redux-form method

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

export default reduxForm({ form: 'signup' })(SignUp);
