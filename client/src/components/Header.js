import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../actions';

class Header extends Component {
  constructor(props) {
    super(props);

    this.handleSignOut = this.handleSignOut.bind(this);
  }

  handleSignOut() {
    console.log('signOut got called!');
    this.props.signOut();
  }

  render() {

    const isAuth = () => {
      if (this.props.isAuth) {
        return null;
      }

      return [
        <li className="nav-item" key="signup">
          <Link className="nav-link" to="/signup">Sign Up</Link>
        </li>,
        <li className="nav-item" key="signin">
          <Link className="nav-link" to="/signin">Sign In</Link>
        </li>
      ]
    }

    const signOutLink = () => {
      if (!this.props.isAuth) {
        return null;
      }

      return <li className="nav-item">
        <Link className="nav-link" to="/signout" onClick={this.handleSignOut}>Sign Out</Link>
      </li>
    }

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ marginBottom: '30px' }}>
        <Link className="navbar-brand" to="/">React Authenticate</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">Dashboard</Link>
            </li>
          </ul>

          <ul className="nav navbar-nav ml-auto">

            { isAuth() }

            { signOutLink() }
          </ul>
        </div>
      </nav>
    )
  }
}

function mapStateToProps(state) {
  return {
    isAuth: state.auth.isAuthenticated
  };
}

export default connect(mapStateToProps, actions)(Header);
