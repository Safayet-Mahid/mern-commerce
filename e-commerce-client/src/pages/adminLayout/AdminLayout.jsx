import React, { Children } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Topbar from '../../components/topbar/Topbar'
import "./adminLayout.css"

export default function AdminLayout({children}) {
    const admin = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser?.isAdmin

  return (
   <div>
        {admin && <Topbar />}
        <div className="container">

          {admin && <Sidebar />}
          <div className='child-container'>
            {children}
          </div>
        </div>
    </div>
  )
}
