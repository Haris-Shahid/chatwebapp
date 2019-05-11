import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import { Paper, FormControl, InputLabel, Input, IconButton, InputAdornment, } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import './style.css';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showPassword: false,
            password: '',
            email: ''
        }
    }
    handleChange(v, e) {
        this.setState({
            [v]: e.target.value
        })
    }
    render() {
        return (
            <div>
                <Paper className='paper-center' elevation={1}>
                    <FormControl className='input-container' >
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <Input id="email" className='input-field' type='text' value={this.state.email} onChange={(e) => this.handleChange('email', e)} />
                    </FormControl>
                    <FormControl className='input-container' >
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input id="password" className='input-field' type={this.state.showPassword ? 'text' : 'password'} value={this.state.password} onChange={(e) => this.handleChange('password', e)} endAdornment={
                            <InputAdornment position="end">
                                <IconButton aria-label="Toggle password visibility" onClick={() => this.setState({ showPassword: !this.state.showPassword })} >
                                    {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                        />
                    </FormControl>
                    <button type="button" className="btn-primary btn-lg btn-block">Log In</button>
                    <div className='condition-Txt' >
                        Don't have an Account <Link to='/signup' >Sign Up</Link>
                    </div>
                </Paper>
            </div>
        )
    }
}

export default Login;