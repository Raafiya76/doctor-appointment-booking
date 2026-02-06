// 3rd Party Imports
const express = require("express");
// Custom Imports
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const router = express.Router();

// AUTH CONTROLLER
router.post("/signup", authController.signup);
router.post("/login", authController.login);

// USER ConTROLLER
router.get("/", userController.getAllUsers);

router.use(authController.protect);

router
  .route("/:id")
  .get(userController.getUser)
  .delete(userController.deleteUser);
router.get("/verify-user/:id", userController.verifyUser);
router.post("/book-appointment", userController.bookAppointment);
router.get("/user-appointments/:id", userController.userAppointments);
// NOTIFICATIONS
router.post("/mark-all-notification-as-seen", userController.notificationSeen);
router.post("/delete-all-notifications", userController.deleteNotifications);
// ADMIN
router.post("/change-doctor-status", userController.doctorStatus);

module.exports = router;
