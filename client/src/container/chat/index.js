import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import { connect } from 'react-redux';
import UserList from '../../component/userList/index';
import './style.css';

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: ''
        }
    }
    componentDidMount() {
        console.log(this.props.match.params.username)
        let decode = jwt_decode(localStorage.usertoken);
        this.setState({
            username: decode.username,
            email: decode.email
        })
    }
    render() {
        return (
            <div className="row main-container" style={{ height: window.innerHeight - 20 }} >
                <div className='col-md-2' >
                    <UserList />
                </div>
                <div className='col-md-10' >
                    
                </div>
            </div>

        )
    }
}

const mapStateToProps = state => {
    return state.AuthReducer
}

export default connect(mapStateToProps, {})(Chat);