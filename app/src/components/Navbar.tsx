"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import NotificationModal from './NotificationModal';
import { socket } from '@/util/socketConfig';

const Navbar = () => {
   const [notifications, setNotifications] = useState<any[]>([]);
  
      useEffect(() => {
          // Listen for new notifications
          socket.on("newNotification", (notification) => {
              // Ensure notification is an object
              const notificationObject =
                  typeof notification === "string"
                      ? { message: notification, timestamp: new Date().toISOString() }
                      : notification;
  
              setNotifications((prev) => [notificationObject, ...prev]);
          });
         
          return () => {
              socket.off("newNotification");
          };
      }, []);
  return (
    <div className='flex flex-row lg:px-16 px-8 justify-between py-4  bg-gray-200 sticky top-0 z-100'>
      <div className='flex gap-6 lg:gap-10' >
      <Link href="/">
          <span className="text-gray-600 font-bold hover:text-blue-500 transition-colors duration-200">
            Products
          </span>
        </Link>
        <Link href="/add-products">
          <span className="text-gray-600 font-bold hover:text-blue-500 transition-colors duration-200">
            Add Products
          </span>
        </Link>
      </div>
      <div className='relative'>
        <span>
            <NotificationModal notifications = {notifications} setNotifications={setNotifications} />
        </span>
        <span className='inline-block absolute bg-white w-5 h-5 top-0 left-4 text-center text-sm rounded-lg font-bold'>
          {notifications.length}
        </span>
      </div>
    </div>
  )
}

export default Navbar
