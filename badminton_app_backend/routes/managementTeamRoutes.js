const express = require("express");

const router = express.Router();

const managementTeamController = require("../controllers/managementTeamController");

// Get all members
router.get("/", managementTeamController.getMembers);

// Get single member
router.get("/:id", managementTeamController.getMember);

// Create member
router.post("/", managementTeamController.createMember);

// Update member
router.put("/:id", managementTeamController.updateMember);

// Delete member
router.delete("/:id", managementTeamController.deleteMember);

module.exports = router;