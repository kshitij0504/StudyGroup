import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Card,
  Button,
  Spinner,
  Avatar,
  Badge,
  Modal,
  TextInput,
  Label,
} from "flowbite-react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  FaUsers,
  FaRegCalendarAlt,
  FaCogs,
  FaUserPlus,
  FaBell,
  FaComments,
} from "react-icons/fa";

const GroupDetail = () => {
  const { currentUser } = useSelector((state) => state.user || {});
  const { id } = useParams();
  const [group, setGroup] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState([]);
  const [events, setEvents] = useState([]);
  const [newMember, setNewMember] = useState("");
  const [isLeader, setIsLeader] = useState(false);

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/groups/${id}`
        );
        console.log(response);
        setGroup(response.data.data);
        setMembers(response.data.data?.members || []);
        setEvents(response.data.data?.events || []);
        console.log(response.data.data.leaderId);
        console.log(currentUser.id);
        if (currentUser.id === response.data.data.leaderId) {
          setIsLeader(true);
        }
      } catch (error) {
        console.error("Error fetching group details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGroup();
  }, [id]);

  const handleAddMember = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/groups/${id}/add-member`,
        { username: newMember }
      );
      setMembers((prevMembers) => [...prevMembers, response.data.member]);
      setShowModal(false);
      setNewMember("");
    } catch (error) {
      console.error("Error adding member:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <Spinner color="light" size="xl" />
      </div>
    );
  }

  if (!group) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        No group found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      <SidebarComponent setShowModal={setShowModal} isLeader={isLeader} />
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold">{group.name}</h1>
          <div>
            <Button color="success">Join Group</Button>
            <Button color="danger" className="ml-2">
              Leave Group
            </Button>
          </div>
        </div>
        <Card className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6 border border-gray-700">
          <h2 className="text-2xl font-semibold mb-4">Group Details</h2>
          <p className="mb-4">
            <strong>Description:</strong>{" "}
            {group.description || "No description available."}
          </p>
          <p className="mb-4">
            <strong>Members:</strong> {members.length}
          </p>
        </Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700">
            <FaRegCalendarAlt className="text-3xl text-yellow-500 mb-4" />
            <h3 className="text-xl font-semibold">Upcoming Events</h3>
            {events.length > 0 ? (
              events.map((event) => (
                <div key={event.id} className="mt-2">
                  <p>
                    {event.name} - {event.date}
                  </p>
                  <Button color="primary" size="sm" className="mt-2">
                    RSVP
                  </Button>
                </div>
              ))
            ) : (
              <p>No events scheduled. Check back later!</p>
            )}
          </Card>
          <Card className="bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700">
            <FaUsers className="text-3xl text-yellow-500 mb-4" />
            <h3 className="text-xl font-semibold">Group Members</h3>
            {members.length > 0 ? (
              members.map((member) => (
                <div key={member?.id} className="flex items-center mt-2">
                  <Avatar
                    img={member?.avatar}
                    rounded={true}
                  />
                  <div className="ml-4">
                    <p>{member?.username}</p>
                    <Badge color={member?.role === "leader" ? "info" : "gray"}>
                      {member?.role || "member"}
                    </Badge>
                  </div>
                </div>
              ))
            ) : (
              <p>No members listed. Add members to start collaborating!</p>
            )}
          </Card>
        </div>
      </div>

      {isLeader && (
        <Modal show={showModal} onClose={() => setShowModal(false)} size="md">
          <Modal.Header>Add a New Member</Modal.Header>
          <Modal.Body>
            <div className="space-y-4">
              <div>
                <Label htmlFor="username" value="Username or Email" />
                <TextInput
                  id="username"
                  type="text"
                  placeholder="Enter username or email"
                  value={newMember}
                  onChange={(e) => setNewMember(e.target.value)}
                  required
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button color="success" onClick={handleAddMember}>
              Add Member
            </Button>
            <Button color="danger" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

const SidebarComponent = ({ setShowModal, isLeader }) => (
  <div className="w-64 bg-gray-800 p-4 flex flex-col min-h-screen border-r border-gray-700">
    <h2 className="text-2xl font-semibold text-white mb-6">Menu</h2>
    <ul className="flex-1">
      <li className="mb-4">
        <Link
          to="/overview"
          className="text-white flex items-center hover:bg-[#5271ff] p-2 rounded transition-colors duration-300"
        >
          <FaUsers className="mr-2" />
          Overview
        </Link>
      </li>
      {isLeader && (
        <li className="mb-4">
          <button
            className="text-white flex items-center hover:bg-[#5271ff] p-2 rounded transition-colors duration-300 w-full text-left"
            onClick={() => setShowModal(true)}
          >
            <FaUserPlus className="mr-2" />
            Add Members
          </button>
        </li>
      )}
      <li className="mb-4">
        <Link
          to="/settings"
          className="text-white flex items-center hover:bg-[#5271ff] p-2 rounded transition-colors duration-300"
        >
          <FaCogs className="mr-2" />
          Settings
        </Link>
      </li>
      <li className="mb-4">
        <Link
          to="/chat"
          className="text-white flex items-center hover:bg-[#5271ff] p-2 rounded transition-colors duration-300"
        >
          <FaComments className="mr-2" />
          Chat
        </Link>
      </li>
      <li className="mb-4">
        <Link
          to="/notifications"
          className="text-white flex items-center hover:bg-[#5271ff] p-2 rounded transition-colors duration-300"
        >
          <FaBell className="mr-2" />
          Notifications
        </Link>
      </li>
    </ul>
  </div>
);

export default GroupDetail;