const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");
const Appointment = require("../models/appointmentModel");
const moment = require("moment");
const Doctor = require("../models/doctorModel");

exports.verifyUser = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "User verified successfully.",
    data: req.user,
  });
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  const filteredUsers = users.map((user) => {
    return {
      id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      isAdmin: user.isAdmin,
      isDoctor: user.isDoctor,
    };
  });

  res.status(200).json({
    status: "success",
    message: "Users fetched successfully.",
    data: filteredUsers,
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  res.status(200).json({
    status: "success",
    message: "User fetched successfully.",
    data: user,
  });
});

exports.bookAppointment = catchAsync(async (req, res, next) => {
  req.body.status = "pending";
  req.body.date = moment(req.body.date);
  req.body.time = moment(req.body.time);

  const newAppointment = new Appointment(req.body);
  await newAppointment.save();

  // Find doctor and send notification
  const user = await User.findById(req.body.doctorInfo.userId);
  user.unseenNotifications.push({
    type: "new-appointment-request",
    message: `A new appointment request has been made by ${req.body.userInfo.name}`,
    data: {
      name: req.body.userInfo.name,
    },
    onClickPath: "/doctor/appointments",
  });
  await user.save();

  res.status(200).json({
    status: "success",
    message: "Appointment booked successfully.",
  });
});

exports.userAppointments = catchAsync(async (req, res, next) => {
  const appointments = await Appointment.find({
    userId: req.params.id,
  });

  res.status(200).json({
    status: "success",
    message: "Appointments fetched successfully.",
    data: appointments,
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const userId = req.params.id;

  // 1) Find USer Delete User
  await User.findByIdAndDelete(userId);
  // 2) Delete Doctor
  await Doctor.findOneAndDelete({ userId });
  // 3) Delete associated appointments
  await Appointment.deleteMany({ doctorId: userId });

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.notificationSeen = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  const unseenNotifications = user.unseenNotifications;
  user.seenNotifications = unseenNotifications;

  user.unseenNotifications = [];

  const updatedUser = await user.save();
  updatedUser.password = undefined;

  res.status(200).send({
    status: true,
    message: "All notifications seen",
    data: updatedUser,
  });
});

exports.deleteNotifications = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  user.seenNotifications = [];
  user.unseenNotifications = [];

  const updatedUser = await user.save();
  updatedUser.password = undefined;

  res.status(200).send({
    status: true,
    message: "All notifications deleted",
    data: updatedUser,
  });
});

exports.doctorStatus = catchAsync(async (req, res, next) => {
  const { doctorId, status, userId } = req.body;

  const doctor = await Doctor.findByIdAndUpdate(doctorId, { status });
  if (!doctor) return next(new AppError("Doctor not found", 404));

  // Send Notification To User
  const user = await User.findById(userId);
  const unseenNotifications = user.unseenNotifications;
  unseenNotifications.push({
    type: "new-doctor-request-changed",
    message: `Your doctor request has been ${status}`,
    data: {
      name: user.name,
      doctorId: user._id,
    },
    onClickPath: "/notifications",
  });
  user.isDoctor = status === "approved" ? true : false;
  await user.save();

  const doctors = await Doctor.find();

  res.status(200).send({
    status: true,
    message: "Doctor status changed successfully",
    data: doctors,
  });
});
