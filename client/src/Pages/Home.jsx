import React from "react";

const Home = () => {
  const now = new Date();
  const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const date = new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(now);

  return (
    <section className="flex flex-col gap-5 p-4 text-white">
      {/* Hero Section */}
      <div className="h-[300px] w-full rounded-[20px] bg-hero bg-cover flex flex-col justify-between p-8 lg:p-12">
        <h2 className="bg-black/50 backdrop-blur-md rounded py-2 px-4 text-center text-base font-normal">
          Upcoming Meeting at: 12:30 PM
        </h2>
        <div className="flex flex-col gap-2">
          <h1 className="text-5xl font-extrabold lg:text-7xl">{time}</h1>
          <p className="text-lg font-medium text-sky-300 lg:text-2xl">{date}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Upcoming Meetings */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-6 rounded-[20px] shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Upcoming Meetings</h3>
          <ul className="space-y-2">
            <li className="bg-white/20 p-3 rounded-md">Meeting 1 - 12:30 PM</li>
            <li className="bg-white/20 p-3 rounded-md">Meeting 2 - 2:00 PM</li>
            <li className="bg-white/20 p-3 rounded-md">Meeting 3 - 4:15 PM</li>
          </ul>
        </div>

        {/* Daily Schedule */}
        <div className="bg-gradient-to-r from-green-400 to-teal-400 p-6 rounded-[20px] shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Daily Schedule</h3>
          <ul className="space-y-2">
            <li className="bg-white/20 p-3 rounded-md">Task 1 - 10:00 AM</li>
            <li className="bg-white/20 p-3 rounded-md">Task 2 - 11:30 AM</li>
            <li className="bg-white/20 p-3 rounded-md">Task 3 - 1:00 PM</li>
          </ul>
        </div>

        {/* Recent Activity */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-[20px] shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
          <ul className="space-y-2">
            <li className="bg-white/20 p-3 rounded-md">Activity 1</li>
            <li className="bg-white/20 p-3 rounded-md">Activity 2</li>
            <li className="bg-white/20 p-3 rounded-md">Activity 3</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Home;
