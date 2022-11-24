import React, { Component } from 'react'
import { NavLink, Outlet } from 'react-router-dom'

export default class HomeTemplate extends Component {
    render() {
        return (
            <>
                <header>
                    <div className='bg-primary p-2 nav'>
                        <NavLink className={({isActive})=> isActive? 'nav-link bg-light text-primary' : 'nav-link text-light'} to="">Home</NavLink>
                        <NavLink className={({isActive})=> isActive? 'nav-link bg-light text-primary' : 'nav-link text-light'} to="/sinhvien">Danh Sách Sinh Viên</NavLink>
                    </div>
                </header>
                <div><Outlet/></div>
            </>
        )
    }
}
