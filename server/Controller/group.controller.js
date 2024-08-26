const prisma = require("../config/connectDB");

async function createGroup(req, res) {
  const { name, description } = req.body;
  const leaderId = req.user.id;
  if (!name || typeof name !== "string" || name.trim() === "") {
    return res
      .status(400)
      .json({ error: "Group name is required and must be a non-empty string" });
  }

  if (name.length > 50) {
    return res
      .status(400)
      .json({ error: "Group name cannot exceed 50 characters" });
  }

  if (description && description.length > 200) {
    return res
      .status(400)
      .json({ error: "Description cannot exceed 200 characters" });
  }

  try {
    const leaderExists = await prisma.user.findUnique({
      where: { id: leaderId },
    });
    if (!leaderExists) {
      return res.status(404).json({ error: "Leader not found" });
    }

    const group = await prisma.group.create({
      data: {
        name: name.trim(),
        description: description?.trim() || null,
        leaderId,
        members: {
          connect: { id: leaderId },
        },
      },
    });

    res.status(201).json({
      message: "Group Created Successfully",
      data: group,
    });
  } catch (error) {
    console.error("Error creating group:", error); 
    res.status(500).json({ error: "Failed to create group" });
  }
}

async function getGroups(req, res) {
  const memberId = parseInt(req.query.memberId);

  if (!memberId) {
    return res.status(400).json({ error: "Member ID is required" });
  }

  try {
    const groups = await prisma.group.findMany({
      where: {
        members: {
          some: {
            id: memberId,
          },
        },
      },
      include: {
        leader: true,
        members: true,
      },
    });

    if (groups.length === 0) {
      return res
        .status(404)
        .json({ message: "No groups found for this member" });
    }

    res.status(200).json({
      message: "Groups with members retrieved successfully",
      data: groups,
    });
  } catch (error) {
    console.error("Error retrieving groups:", error);
    res.status(500).json({ error: "Failed to retrieve groups" });
  }
}

async function getparticularGroup(req, res) {
  const { id } = req.params;
  if (!Number.isInteger(parseInt(id))) {
    return res.status(400).json({ error: "Invalid group ID" });
  }

  try {
    const group = await prisma.group.findUnique({
      where: { id: parseInt(id) },
      include: {
        leader: true,
        members: true,
      },
    });

    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }

    res.status(200).json({
      message: "Group retrieved successfully",
      data: group,
    });
  } catch (error) {
    console.error("Error retrieving group:", error);
    res.status(500).json({ error: "Failed to retrieve group" });
  }
}

async function addMemberToGroup(req, res) {
  const { groupId } = req.params;  
  const groupIdInt = parseInt(groupId, 10);
  const { email, username } = req.body;

  console.log(`Received groupId: ${groupId}, email: ${email}, name: ${username}`);

  if (!Number.isInteger(groupIdInt)) {
    return res.status(400).json({ error: "Invalid group ID" });
  }

  if (!email && !username) {
    return res.status(400).json({ error: "Either email or name must be provided" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: email ? { email } : { username },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const group = await prisma.group.update({
      where: { id: groupIdInt }, 
      data: {
        members: {
          connect: { id: user.id },
        },
      },
    });

    res.status(200).json({
      message: "Member added to group successfully",
      data: group,
    });
  } catch (error) {
    console.error("Error adding member to group:", error);
    res.status(500).json({ error: "Failed to add member to group" });
  }
}


async function deleteGroup(req, res) {
  const { id } = req.params;
  const userId = req.user.id; 
  console.log(userId)
  if (!Number.isInteger(parseInt(id))) {
    return res.status(400).json({ error: "Invalid group ID" });
  }

  try {
    const group = await prisma.group.findUnique({
      where: { id: parseInt(id) },
      include: {
        leader: true,
      },
    });

    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }

    
    if (group.leaderId !== userId) {
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this group" });
    }

    
    await prisma.group.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({
      message: "Group deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting group:", error);
    res.status(500).json({ error: "Failed to delete group" });
  }
}

module.exports = {
  createGroup,
  getGroups,
  getparticularGroup,
  addMemberToGroup,
  deleteGroup
};
