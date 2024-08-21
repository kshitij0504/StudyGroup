import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  Button,
  Modal,
  TextInput,
  Textarea,
  Label,
  Alert,
} from "flowbite-react"; // Import Button from Flowbite
import { HiPlus } from "react-icons/hi"; // Import an icon from react-icons
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast"; // Import toast for notifications

const DisplayGroup = () => {
  const { currentUser } = useSelector((state) => state.user || {});
  const [groups, setGroups] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [groupGradients, setGroupGradients] = useState({});

  useEffect(() => {
    const memberId = currentUser.id;
    if (memberId) {
      fetchGroups(memberId);
    }
  }, []);

  const fetchGroups = async (memberId) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/displaygroups?memberId=${memberId}`
      );
      const data = response.data.data || [];
      setGroups(Array.isArray(data) ? data : []);

      // Assign a random gradient to each group and store it in state
      const gradients = {};
      data.forEach((group) => {
        gradients[group.id] = getRandomGradient();
      });
      setGroupGradients(gradients);
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/creategroup",
        {
          name,
          description,
        },
        { withCredentials: true }
      );

      toast.success("Group created successfully!");

      const newGroup = response.data.data; 
      setGroups((prevGroups) => [...prevGroups, newGroup]);

      setGroupGradients((prevGradients) => ({
        ...prevGradients,
        [newGroup.id]: getRandomGradient(),
      }));

      setName("");
      setDescription("");
      setOpenModal(false); 
    } catch (err) {
      toast.error("Failed to create group. Please try again.");
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getRandomGradient = () => {
    const gradients = [
      "bg-gradient-to-r from-red-500 to-yellow-500",
      "bg-gradient-to-r from-blue-500 to-purple-500",
      "bg-gradient-to-r from-green-500 to-teal-500",
      "bg-gradient-to-r from-yellow-500 to-orange-500",
      "bg-gradient-to-r from-purple-500 to-pink-500",
      "bg-gradient-to-r from-teal-500 to-blue-500",
      "bg-gradient-to-r from-orange-500 to-red-500",
    ];
    return gradients[Math.floor(Math.random() * gradients.length)];
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Study Groups</h1>
        <Button
          gradientDuoTone="greenToBlue"
          className="flex items-center gap-2"
          onClick={() => setOpenModal(true)} 
        >
          <HiPlus className="h-5 w-5" />
          <span>Join Group / Create Group</span>
        </Button>
        <Modal show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Header>Create A Group</Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {error && <Alert color="failure">{error}</Alert>}
              <div>
                <Label htmlFor="name">Group Name</Label>
                <TextInput
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter group name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter group description"
                  rows={4}
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={handleSubmit}
              type="submit"
              pill
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Group"}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      {groups.length === 0 ? (
        <div className="text-center text-white font-semibold text-lg">
          You are not part of any groups. Please ask the leader to add you to a
          group.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {groups.map((group) => (
            <Link to={`/groups/${group.id}`} key={group.id}>
              <Card
                className={`p-4 ${
                  groupGradients[group.id]
                } rounded-lg shadow-md`}
              >
                <div className="text-center text-white font-semibold text-lg">
                  {group.name}
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default DisplayGroup;
