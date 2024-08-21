import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Button } from "flowbite-react";
import axios from "axios";
import { Link } from 'react-router-dom'; 
const GroupDetail = () => {
  const { id } = useParams();
  const [group, setGroup] = useState(null);

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/groups/${id}`);
        setGroup(response.data.data);
      } catch (error) {
        console.error("Error fetching group details:", error);
      }
    };

    fetchGroup();
  }, [id]);

  if (!group) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="flex">
        <SidebarComponent />
        <div className="flex-1 p-4">
          <h1 className="text-2xl font-semibold mb-6">{group.name}</h1>
          <Card className="bg-gray-800 p-4">
            <p><strong>Description:</strong> {group.description || "No description available."}</p>
            <Button color="light" className="mt-4">Take Action</Button>
          </Card>
        </div>
      </div>
    </div>
  );
};


const SidebarComponent = () => (
  <div className="w-64 bg-gray-800 p-4">
  <ul>
    <li>
      <Link to="/overview" className="text-white">Overview</Link>
    </li>
    <li>
      <Link to="/addmembers" className="text-white">Add Members</Link>
    </li>
    <li>
      <Link to="/settings" className="text-white">Settings</Link>
    </li>
  </ul>
</div>
);

export default GroupDetail;
