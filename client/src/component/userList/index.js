import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import './style.css'

class UserList extends Component {
    render() {
        return (
            <div className='list-group list-group-scroll' style={{ height: '100%' }}   >
                <NavLink className='list-group-item' to='/inbox/user' >user</NavLink>
                <NavLink className='list-group-item' to='/inbox/user1' >user</NavLink>
                <NavLink className='list-group-item' to='/inbox/user2' >user</NavLink>
                <NavLink className='list-group-item' to='/inbox/user3' >user</NavLink>
                <NavLink className='list-group-item' to='/inbox/user4' >user</NavLink>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return state;
}

export default connect(mapStateToProps, {})(UserList);