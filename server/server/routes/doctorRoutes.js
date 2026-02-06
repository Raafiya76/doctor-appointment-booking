// 3rd Party Imports
const express = require("express");
// Custom Imports
const authController = require("../controllers/authController");
const doctorController = require("../controllers/doctorController");

const router = express.Router();

// DOCTOR CONTROLLER
router.get("/", doctorController.getAllDoctors);
router.get("/approved-doctors", doctorController.getAllApprovedDoctors);

router.use(authController.protect);

router.post("/signup", doctorController.doctorSignup);
router.get("/:id", doctorController.getDoctor);
router.put("/:id", doctorController.updateDoctor);
router.get("/appointments/:id", doctorController.doctorAppointments);
router.get("/booked-appointments/:id", doctorController.getBookAppointments);
router.post(
  "/change-appointment-status",
  doctorController.changeAppointmentStatus
);
router.post(
  "/check-booking-availability",
  doctorController.checkBookingAvailability
);

module.exports = router;
