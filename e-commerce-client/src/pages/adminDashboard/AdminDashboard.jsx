import React, { useEffect, useMemo, useState } from 'react'
import Chart from '../../components/chart/Chart'
import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo'
import "./adminDashboard.css"
// import {userData} from "../../dummyData"
import WidgetSm from '../../components/widgetSm/WidgetSm'
import WidgetLg from '../../components/widgetLg/WidgetLg'
import { userRequest } from '../../requestMethods'
import AdminLayout from '../adminLayout/AdminLayout'

export default function AdminDashboard() {

  const[userStats,setUserStats] = useState([])

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async ()=>{
      try{
        const res = await userRequest.get("/user/stats")
        res.data.map(item=>
          setUserStats(prev=> [
            ...prev,
            {
              name:MONTHS[item._id],
              "Active User" : item.total
            }
          ])
          )
      } catch{ }
    }
  
    getStats()
  }, [MONTHS])
  // console.log(userStats)
  return (
    <AdminLayout>

    <div className='home'>
        <FeaturedInfo/>
        <Chart data={userStats} title="User Analytics" grid dataKey="Active User"/>
        <div className="homeWidgets">
            <WidgetSm/>
            <WidgetLg/>
        </div>
    </div>
    </AdminLayout>
  )
}
