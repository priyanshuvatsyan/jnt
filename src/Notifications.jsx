import React, { useEffect, useState } from 'react'
import AdminNav from './AdminNav'
import { collection, getDocs, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';
import './styles/Notifications.css';

export default function Notifications() {

    const [notification, setnotification] = useState([]);
    const fetchNotifications = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "notifications"));
            const notificationList = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }))
            setnotification(notificationList);
        } catch (error) {
            console.error("Error fetching notifications:", error);
        }
    }
    const handleDelete = async (id) => {
        try {
            await deleteDoc(db, "notifications", id);
            alert("Product notification successfully!");
            setnotification((preNoti) => preNoti.filter((noti) => noti.id != id));
        } catch (error) {
            console.error("Error deleting notifications:", error);
        }
    }
    useEffect(() => {
        fetchNotifications();
    }, []);

    return (
        <div className="notifications-container">
            <h1>Notifications</h1>
            <div className="noti-inside-container">
                <div className="noti-nav">
                    <AdminNav />
                </div>
                <div className="notifications">
                    {notification.length>0?(
                    notification.map((noti)=>(
                        <div key={noti.id} className="noti-card">
                            
                            <p className="noti-card-message">{noti.message}</p>
                            <button onClick={()=>handleDelete(noti.id)} className="noti-card-delete">Delete</button>
                        </div>
                    )
            )):
            (
                <p>No notifications</p>
            )}

                    {/* <div className="noti-card">
                        <p> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est, voluptatem quod officiis unde necessitatibus optio exercitationem ex! Voluptatem quisquam, provident similique dolore distinctio, laudantium nam numquam dolorem ipsum neque veritatis. </p>
                        <button onClick={() => handleDelete(noti.id)} className="noti-card-delete">Delete</button>
                    </div> <div className="noti-card">
                        <p> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est, voluptatem quod officiis unde necessitatibus optio exercitationem ex! Voluptatem quisquam, provident similique dolore distinctio, laudantium nam numquam dolorem ipsum neque veritatis. </p>
                        <button onClick={() => handleDelete(noti.id)} className="noti-card-delete">Delete</button>
                    </div> <div className="noti-card">
                        <p> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est, voluptatem quod officiis unde necessitatibus optio exercitationem ex! Voluptatem quisquam, provident similique dolore distinctio, laudantium nam numquam dolorem ipsum neque veritatis. </p>
                        <button onClick={() => handleDelete(noti.id)} className="noti-card-delete">Delete</button>
                    </div> <div className="noti-card">
                        <p> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est, voluptatem quod officiis unde necessitatibus optio exercitationem ex! Voluptatem quisquam, provident similique dolore distinctio, laudantium nam numquam dolorem ipsum neque veritatis. </p>
                        <button onClick={() => handleDelete(noti.id)} className="noti-card-delete">Delete</button>
                    </div> <div className="noti-card">
                        <p> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est, voluptatem quod officiis unde necessitatibus optio exercitationem ex! Voluptatem quisquam, provident similique dolore distinctio, laudantium nam numquam dolorem ipsum neque veritatis. </p>
                        <button onClick={() => handleDelete(noti.id)} className="noti-card-delete">Delete</button>
                    </div> <div className="noti-card">
                        <p> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est, voluptatem quod officiis unde necessitatibus optio exercitationem ex! Voluptatem quisquam, provident similique dolore distinctio, laudantium nam numquam dolorem ipsum neque veritatis. </p>
                        <button onClick={() => handleDelete(noti.id)} className="noti-card-delete">Delete</button>
                    </div> <div className="noti-card">
                        <p> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est, voluptatem quod officiis unde necessitatibus optio exercitationem ex! Voluptatem quisquam, provident similique dolore distinctio, laudantium nam numquam dolorem ipsum neque veritatis. </p>
                        <button onClick={() => handleDelete(noti.id)} className="noti-card-delete">Delete</button>
                    </div> <div className="noti-card">
                        <p> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est, voluptatem quod officiis unde necessitatibus optio exercitationem ex! Voluptatem quisquam, provident similique dolore distinctio, laudantium nam numquam dolorem ipsum neque veritatis. </p>
                        <button onClick={() => handleDelete(noti.id)} className="noti-card-delete">Delete</button>
                    </div> <div className="noti-card">
                        <p> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est, voluptatem quod officiis unde necessitatibus optio exercitationem ex! Voluptatem quisquam, provident similique dolore distinctio, laudantium nam numquam dolorem ipsum neque veritatis. </p>
                        <button onClick={() => handleDelete(noti.id)} className="noti-card-delete">Delete</button>
                    </div> <div className="noti-card">
                        <p> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est, voluptatem quod officiis unde necessitatibus optio exercitationem ex! Voluptatem quisquam, provident similique dolore distinctio, laudantium nam numquam dolorem ipsum neque veritatis. </p>
                        <button onClick={() => handleDelete(noti.id)} className="noti-card-delete">Delete</button>
                    </div> */}
                </div>
            </div>
        </div>
    )
}
