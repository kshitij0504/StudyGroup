import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import Header from "../Components/Header";
import { SiGooglemeet } from "react-icons/si";
import { AiFillSchedule } from "react-icons/ai";
import { TbClockCheck } from "react-icons/tb";

// Sample daily quotes array
const quotes = [
  "The only way to do great work is to love what you do.",
  "Success usually comes to those who are too busy to be looking for it.",
  "The harder you work for something, the greater you'll feel when you achieve it.",
  "Dream bigger. Do bigger.",
  "Don't watch the clock; do what it does. Keep going.",
];

const Home = () => {
  const { currentUser } = useSelector((state) => state.user || {});
  const now = new Date();
  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const date = new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(
    now
  );

  const [notifications, setNotifications] = useState(() => {
    const savedNotifications = localStorage.getItem("notifications");
    return savedNotifications ? JSON.parse(savedNotifications) : [];
  });

  // Generate a random quote for the day
  const dailyQuote = quotes[Math.floor(Math.random() * quotes.length)];

  useEffect(() => {
    if (!currentUser || !currentUser.id) return;

    const socket = io("http://localhost:8000", {
      withCredentials: true,
    });

    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on(`notification_${currentUser.id}`, (notification) => {
      setNotifications((prevNotifications) => {
        const updatedNotifications = [...prevNotifications, notification];

        localStorage.setItem(
          "notifications",
          JSON.stringify(updatedNotifications)
        );

        return updatedNotifications;
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [currentUser.id]);

  return (
    <section className="flex flex-col gap-5 p-4 text-white mt-0">
      <Header />
      <div className="h-[300px] w-full rounded-[20px] bg-hero bg-cover flex flex-col justify-between p-8 lg:p-12">
        <div className="flex flex-col gap-2">
          <h1 className="text-5xl font-extrabold lg:text-7xl">{time}</h1>
          <p className="text-lg font-medium text-sky-300 lg:text-2xl">{date}</p>
          <h2 className="text-2xl font-semibold mb-2">
            Welcome, {currentUser.username || "User"}!
          </h2>
          <p className="text-lg">{dailyQuote}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-4">
        {/* Upcoming Meetings */}
        <div className="bg-blue-600 text-black p-6 rounded-xl shadow-lg transition-transform hover:scale-105">
          <h3 className="text-xl font-bold mb-4">
            <span className="mr-1">
              <SiGooglemeet />
            </span>
            Upcoming Meetings
          </h3>
          <ul className="space-y-2">
            <li className="p-3 rounded-md">Meeting 1 - 12:30 PM</li>
            <li className="p-3 rounded-md">Meeting 2 - 2:00 PM</li>
            <li className="p-3 rounded-md">Meeting 3 - 4:15 PM</li>
          </ul>
        </div>

        {/* Daily Schedule */}
        <div className="bg-yellow-400 text-black p-6 rounded-xl shadow-lg transition-transform hover:scale-105">
          <h3 className="text-xl font-bold mb-4">
            <span className="mr-1">
              <AiFillSchedule />
            </span>
            Daily Schedule
          </h3>
          <ul className="space-y-2">
            <li className="p-3 rounded-md">Task 1 - 10:00 AM</li>
            <li className="p-3 rounded-md">Task 2 - 11:30 AM</li>
            <li className="p-3 rounded-md">Task 3 - 1:00 PM</li>
          </ul>
        </div>

        {/* Recent Activity */}
        <div className="bg-green-400 text-black p-6 rounded-xl shadow-lg transition-transform hover:scale-105">
          <h3 className="text-xl font-bold mb-4">
            <span className="mr-1">
              <TbClockCheck />
            </span>
            Recent Activity
          </h3>
          <ul className="space-y-2">
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <li key={index} className="p-3 rounded-md">
                  {notification.message}
                </li>
              ))
            ) : (
              <li className="p-3 rounded-md">No recent activity</li>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Home;
