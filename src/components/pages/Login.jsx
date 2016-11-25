import React from 'react';
import Router, {Link, RouteHandler, Navigation} from 'react-router';
import {Panel, Input, Button} from 'react-bootstrap';
import {History} from 'history';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import $ from "jquery";
import {browserHistory} from 'react-router';
import history from "../../app";

var LoginPage = React.createClass({

    getInitialState: function () {
        return {
            loginID: '',
            password: '',
            isSubmitted: false
        };
    },

    // mixins: [History],

    contextTypes: {
        router: React.PropTypes.object
    },

    render: function () {

        return (
            <div className="login-page ng-scope ui-view">
                <div className="row">
                    <div className="col-md-4 col-lg-4 col-md-offset-4 col-lg-offset-4">
                        <img src={require("../../common/images/flat-avatar.png")} className="user-avatar"/>
                        <h1>Sign in Go Store</h1>
                        <form role="form" onSubmit={this.handleLogin} className="ng-pristine ng-valid">
                            <div className="form-content">
                                <div className="form-group">
                                    <input type="text" className="form-control input-underline input-lg"
                                           placeholder="Email or User Name" id="emailOrUserName"/>
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control input-underline input-lg"
                                           placeholder="Password" id="password"/>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-white btn-outline btn-lg btn-rounded">Login
                            </button>
                            <Link to="/register" className="btn btn-white btn-link btn-lg">Sign Up</Link>
                        </form>
                    </div>
                </div>
            </div>

        );


    },

    setLoginID: function (e) {

        this.setState({
            loginID: e.target.value,
            loginError: ''
        });

    },

    setPassword: function (e) {

        this.setState({
            password: e.target.value,
            loginError: ''
        });

    },

    handleLogin: function (e) {
        e.preventDefault();

        var emailOrUserName = $('#emailOrUserName').val();
        var password = $('#password').val();

        var emptyData = false;
        if (emailOrUserName == '') {
            //notify empty email or username

            emptyData = true;
        }
        if (password == '') {
            //notify empty password

            emptyData = true;
        }
        var data;
        if (!emptyData) {
            data = {emailOrUserName: emailOrUserName, password: password};
            $.ajax({
                type: 'POST',
                url: 'http://localhost:8080/users/login/' + emailOrUserName + '/' + password,
                data: data
            }).done(function (result) {
                $('#emailOrUserName').val('');
                $('#password').val('');
                console.log('Login successful');
                history.push('/dashboard/categories');
            }).fail(function (jqXHR, status) {
                console.log('failed to login');
                return false;
            });
        }

        // this.transitionTo('dashboard');

    }

});

export default LoginPage;