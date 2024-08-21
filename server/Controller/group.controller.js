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
          connect: { id: leaderId }, // Automatically add the creator as a member of the group
        },
      },
    });

    res.status(201).json({
      message: "Group Created Successfully",
      data: group,
    });
  } catch (error) {
    console.error("Error creating group:", error); // Log the error details
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
  const { groupId, userId } = req.body;
  console.log(`Received groupId: ${groupId}, userId: ${userId}`);

  if (!Number.isInteger(groupId) || !Number.isInteger(userId)) {
    return res.status(400).json({ error: "Invalid group or user ID" });
  }

  try {
    const group = await prisma.group.update({
      where: { id: groupId },
      data: {
        members: {
          connect: { id: userId },
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

module.exports = {
  createGroup,
  getGroups,
  getparticularGroup,
  addMemberToGroup,
};
