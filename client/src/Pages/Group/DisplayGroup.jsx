import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  Button,
  Modal,
  Dropdown,
  TextInput,
  Textarea,
  Label,
  Alert,
  Card,
} from "flowbite-react";
import { HiPlus, HiTrash } from "react-icons/hi";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

const DisplayGroup = () => {
  const { currentUser } = useSelector((state) => state.user || {});
  const [groups, setGroups] = useState([]);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [groupGradients, setGroupGradients] = useState({});
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [groupToDelete, setGroupToDelete] = useState(null);

  useEffect(() => {
    const memberId = currentUser.id;
    if (memberId) {
      fetchGroups(memberId);
    }
  }, [currentUser]);

  const fetchGroups = async (memberId) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/displaygroups?memberId=${memberId}`
      );
      const data = response.data.data || [];
      setGroups(Array.isArray(data) ? data : []);

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
        { name, description },
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
      setOpenCreateModal(false);
    } catch (err) {
      toast.error("Failed to create group. Please try again.");
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (deleteConfirmation !== "delete") {
      toast.error("Please type 'delete' to confirm.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await axios.delete(`http://localhost:8000/api/group/${groupToDelete}`, {
        withCredentials: true,
      });

      toast.success("Group deleted successfully!");

      setGroups((prevGroups) =>
        prevGroups.filter((group) => group.id !== groupToDelete)
      );
      setOpenDeleteModal(false);
      setDeleteConfirmation("");
    } catch (err) {
      toast.error("Failed to delete group. Please try again.");
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const openDeleteConfirmationModal = (groupId) => {
    setGroupToDelete(groupId);
    setOpenDeleteModal(true);
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

  const leaderGroups = groups.filter(
    (group) => group.leaderId === currentUser.id
  );
  const memberGroups = groups.filter(
    (group) => group.leaderId !== currentUser.id
  );

  return (
    <>
      <Navbar className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-white">Study Groups</h1>
          <Dropdown label="Join/Create Group" dismissOnClick={false}>
            <Dropdown.Item onClick={() => setOpenCreateModal(true)}>
              Create Group
            </Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
          </Dropdown>
        </div>
      </Navbar>
      <div className="bg-gray-900 text-white p-4">
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Groups You Lead</h2>
          <hr className="border-gray-700 mb-4" />
          {leaderGroups.length === 0 ? (
            <div className="text-center text-white font-semibold text-lg">
              You are not leading any groups.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {leaderGroups.map((group) => (
                <div key={group.id} className="relative">
                  <Link to={`/groups/${group.id}`}>
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
                  <button
                    onClick={() => openDeleteConfirmationModal(group.id)}
                    className="absolute top-2 right-2 text-black hover:text-red-700"
                  >
                    <HiTrash className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">
            Groups You Are a Member Of
          </h2>
          <hr className="border-gray-700 mb-4" />
          {memberGroups.length === 0 ? (
            <div className="text-center text-white font-semibold text-lg">
              You are not part of any groups. Please ask the leader to add you
              to a group.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {memberGroups.map((group) => (
                <div key={group.id} className="relative">
                  <Link to={`/groups/${group.id}`}>
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
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Create Group Modal */}
        <Modal show={openCreateModal} onClose={() => setOpenCreateModal(false)}>
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
                  className="text-black"
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
                  className="text-black"
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
              className="bg-blue-500 hover:bg-blue-700 text-white"
            >
              {loading ? "Creating..." : "Create"}
            </Button>
            <Button onClick={() => setOpenCreateModal(false)} pill color="gray">
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Delete Group Confirmation Modal */}
        <Modal
          show={openDeleteModal}
          onClose={() => setOpenDeleteModal(false)}
        >
          <Modal.Header>Confirm Group Deletion</Modal.Header>
          <Modal.Body>
            <p className="text-black">
              Are you sure you want to delete this group? This action cannot be
              undone.
            </p>
            <p className="text-black mt-4">
              Please type <strong>delete</strong> to confirm.
            </p>
            <TextInput
              id="deleteConfirmation"
              type="text"
              value={deleteConfirmation}
              onChange={(e) => setDeleteConfirmation(e.target.value)}
              placeholder="Type 'delete' to confirm"
              required
              className="text-black mt-2"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={handleDelete}
              pill
              disabled={loading}
              className="bg-red-500 hover:bg-red-700 text-white"
            >
              {loading ? "Deleting..." : "Delete"}
            </Button>
            <Button onClick={() => setOpenDeleteModal(false)} pill color="gray">
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default DisplayGroup;