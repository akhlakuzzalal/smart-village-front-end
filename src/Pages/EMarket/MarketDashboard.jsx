import React, { useState } from 'react';
import { MdOutlineProductionQuantityLimits } from 'react-icons/md';
import { RiDashboard2Line } from 'react-icons/ri';
import { SiHomebridge } from 'react-icons/si';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../../Components/Sidebar';
import MyOrder from './Dashboard/partials/dashboardItem/MyOrder';
import Header from './Dashboard/partials/Header';
const links = [
  {
    name: 'Market Home',
    icon: <SiHomebridge size={30} />,
    path: '/e-market',
  },
  {
    name: 'My Orders',
    icon: <MdOutlineProductionQuantityLimits size={30} />,
    path: '/marketdashboard/myorder',
  },
  {
    name: 'analytics',
    icon: <RiDashboard2Line size={30} />,
    path: '/marketdashboard/analytics',
  },
];

const TeacherDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showText, setShowText] = useState(true);

  const location = useLocation();
  const initial =
    location.pathname === '/marketdashboard' ||
    location.pathname === '/marketdashboard/';

  return (
    <div className="flex" style={{ minHeight: 'calc(100vh - 700px)' }}>
      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        showText={showText}
        setShowText={setShowText}
        links={links}
      />

      {/* contents */}
      <div className="flex-1">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {initial ? <MyOrder /> : <Outlet />}
      </div>
    </div>
  );
};

export default TeacherDashboard;
