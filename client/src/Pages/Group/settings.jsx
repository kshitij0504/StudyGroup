import React, { useState, useEffect } from "react";
import { Card, Button, Badge, Tooltip } from "flowbite-react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { HiOutlineClipboardCopy, HiCheck } from "react-icons/hi";
import { FaRegCopy } from "react-icons/fa";

const Settings = () => {
  const [teamCode, setTeamCode] = useState("");
  const [copied, setCopied] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchTeamCode = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/groups/${id}`
        );
        console.log(response);
        setTeamCode(response.data.data.joinCode);
      } catch (error) {
        console.error("Error fetching team code:", error);
      }
    };

    fetchTeamCode();
  }, [id]);

  const handleCopy = () => {
    navigator.clipboard.writeText(teamCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto bg-gray-800 p-4 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-yellow-500">Settings</h2>
        <ul className="space-y-4">
          <li className="flex justify-between items-center p-4 bg-gray-700 rounded-lg">
            <div className="text-lg text-white">Team code</div>
            {teamCode ? (
              <div className="flex items-center">
                <Badge color="yellow" size="lg" className="text-2xl">
                  {teamCode}
                </Badge>
                <Tooltip content={copied ? "Copied!" : "Copy Code"}>
                  <Button
                    color="light"
                    onClick={handleCopy}
                    className="ml-4 p-2 rounded-full hover:bg-gray-600"
                  >
                    {copied ? (
                      <HiCheck className="text-green-400 text-2xl" />
                    ) : (
                      <FaRegCopy />
                    )}
                  </Button>
                </Tooltip>
              </div>
            ) : (
              <p className="text-gray-400">No team code found for this group.</p>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Settings;
