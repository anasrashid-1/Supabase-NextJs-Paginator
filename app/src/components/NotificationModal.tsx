"use client"
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { IoMdNotifications } from "react-icons/io";


interface Notification {
    message: string;
    timestamp?: string; // Optional timestamp
}

interface NotificationModalProps {
    notifications: Notification[];
    setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>; 
}


const NotificationModal: React.FC<NotificationModalProps> = ({ notifications, setNotifications }) => {

    const handleMarkAsRead = (index: number) => {
        const filteredNotifications = notifications.filter((notification: Notification, i: number) => {
            return i !== index;
        })
        setNotifications(filteredNotifications);
        
    }

    return (
        <div>
            <Dialog>
                <DialogTrigger><IoMdNotifications size={30} className="text-gray-600" /></DialogTrigger>
                <DialogContent className='top-right'>
                    <DialogHeader>
                        <DialogTitle>Product Notifications</DialogTitle>
                        <div className="max-h-40 overflow-y-auto">
                            <hr />
                            {notifications.length > 0 ? (
                                notifications.map((notification: Notification, index: number) => (
                                    <div key={index} className="flex justify-between py-1">
                                        <span className="text-gray-600 ">
                                            {index + 1}) {" "} {notification.message}
                                        </span>
                                        <span>
                                            <button onClick={() => {
                                                handleMarkAsRead(index)
                                            }} className="text-gray-600 font-semibold hover:text-blue-500">Mark as Read</button>
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <div className="h-20 flex justify-center items-center">
                                    <p>No new notifications 💤</p>
                                </div>
                            )}
                        </div>

                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default NotificationModal
