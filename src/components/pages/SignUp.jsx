import React from 'react';
import Router, {Link, RouteHandler} from 'react-router';
import {Panel, Input, Button} from 'react-bootstrap';
import {History} from 'history';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import $ from "jquery";
import history from "../../app";

var SignUpPage = React.createClass({

    getInitialState: function () {
        return {
            loginID: '',
            password: '',
            isSubmitted: false
        };
    },

    mixins: [History],

    render: function () {

        return (
            <div className="login-page main ng-scope ui-view">
                <div className="row">
                    <div className="col-md-4 col-lg-5 col-md-offset-4 col-lg-offset-4">
                        <h1>Sign Up in GoStore</h1>
                        <form role="form" onSubmit={this.handleSignUp} className="ng-pristine ng-valid">
                            <div className="form-content">
                                <div className="form-group">
                                    <label className="label-primary" htmlFor="email">Email :</label>
                                    <input type="text" className="form-control input-underline input-sm"
                                           placeholder="Email" id="email"/>
                                </div>
                                <div className="form-group">
                                    <label className="label-primary" htmlFor="username">User Name :</label>
                                    <input type="text" className="form-control input-underline input-sm"
                                           placeholder="User Name" id="username"/>
                                </div>
                                <div className="form-group">
                                    <label className="label-primary" htmlFor="password">Your Password :</label>
                                    <input type="password" className="form-control input-underline input-sm"
                                           placeholder="Your Password" id="password"/>
                                </div>
                                <div className="form-group">
                                    <label className="label-primary" htmlFor="passwordConfirm">Confirm Password :</label>
                                    <input type="password" className="form-control input-underline input-sm"
                                           placeholder="Confirm Password" id="passwordConfirm"/>
                                </div>
                                <div className="form-group">
                                    <label className="label-primary" htmlFor="celPhone">Cel Phone :</label>
                                    <input type="text" className="form-control input-underline input-sm"
                                           placeholder="Cel Phone" id="celPhone"/>
                                </div>
                                <div className="form-group">
                                    <label className="label-primary" htmlFor="firstAddress">First Address :</label>
                                    <input type="text" className="form-control input-underline input-sm"
                                           placeholder="First Address" id="firstAddress"/>
                                </div>
                                <div className="form-group">
                                    <label className="label-primary" htmlFor="secondAddress">Second Address :</label>
                                    <input type="text" className="form-control input-underline input-sm"
                                           placeholder="Second Address" id="secondAddress"/>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-white btn-outline btn-lg btn-rounded">Sign Up
                            </button>
                            <Link to="/" className="btn btn-white btn-link btn-lg">Cancel</Link>
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

    handleSignUp: function (e) {
        e.preventDefault();

        var mail = $('#email').val();
        var username = $('#username').val();
        var celPhone = $('#celPhone').val();
        var firstAddress = $('#firstAddress').val();
        var secondAddress = $('#secondAddress').val();
        var password = $('#password').val();
        var passwordConfirm = $('#passwordConfirm').val();

        var emptyData = false;
        if (mail == '') {
            //notify empty email or username

            emptyData = true;
        }
        if (password == '') {
            //notify empty password

            emptyData = true;
        }
        var data;
        if (!emptyData) {
            data = {
                'userName': username,
                'password': password,
                'mail': mail,
                'celPhone': celPhone,
                'firstAddress': firstAddress,
                'secondAddress': secondAddress
            };
            $.ajax({
                type: 'POST',
                url: 'http://localhost:8080/users/register',
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify(data)
            }).done(function (result) {
                $('#email').val('');
                $('#password').val('');
                $('#celPhone').val('');
                $('#username').val('');
                $('#firstAddress').val('');
                $('#secondAddress').val('');
                history.push('/');
            }).fail(function (jqXHR, status) {
                console.log('failed to login');
                return false;
            });
        }

        // this.transitionTo('dashboard');

    }

});

export default SignUpPage;