import axios from 'axios';
import React, { useContext } from 'react'
import { useQuery } from 'react-query';
import './profile.css'
import { UserContext } from '../contex/User';
import { Link, Outlet } from 'react-router-dom';

export default function Profile() {

  return (
    <aside className='Profile'>
        <div className="profileLink">
            <nav>
                <Link to="" className='mt-5'> Informaion</Link>
                <Link to="contact">Contact</Link>
                <Link to="order">Order</Link>


            </nav>
        </div>
        <div className="UserData mt-5">
        <Outlet/>
        </div>

    </aside>

    )
}
