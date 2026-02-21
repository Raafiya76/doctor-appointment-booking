import { useState, useRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  Alert,
} from "@mui/material";
import { useCreateAppointmentMutation } from "../../../redux/api/userSlice";
import Spinner from "../../../components/Spinner";
import ToastAlert from "../../../components/ToastAlert/ToastAlert";

interface BookAppointmentModalProps {
  open: boolean;
  onClose: () => void;
  doctor: any;
  userId: string;
}

const BookAppointmentModal = ({
  open,
  onClose,
  doctor,
  userId,
}: BookAppointmentModalProps) => {
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [medicalReport, setMedicalReport] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [toast, setToast] = useState({
    message: "",
    appearence: false,
    type: "",
  });

  const [createAppointment, { isLoading }] = useCreateAppointmentMutation();

  const handleFileSelect = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setMedicalReport(file);
    }
  };

  const handleBooking = async () => {
    if (!appointmentDate || !appointmentTime) {
      setToast({
        message: "Please select both date and time",
        appearence: true,
        type: "error",
      });
      return;
    }

    try {
      const payload = {
        userId,
        doctorId: doctor._id,
        userInfo: {
          name: "", // This will be fetched from user data in actual implementation
          email: "",
          phoneNumber: "",
        },
        doctorInfo: {
          prefix: doctor.prefix,
          fullName: doctor.fullName,
          phoneNumber: doctor.phoneNumber,
          specialization: doctor.specialization,
        },
        date: appointmentDate,
        time: appointmentTime,
        status: "pending",
        medicalReport: medicalReport?.name || null,
      };

      const result: any = await createAppointment(payload);

      if (result?.data?.status) {
        setToast({
          message: "Appointment booked successfully!",
          appearence: true,
          type: "success",
        });
        setTimeout(() => {
          onClose();
          setAppointmentDate("");
          setAppointmentTime("");
          setMedicalReport(null);
        }, 1500);
      } else {
        setToast({
          message: result?.error?.data?.message || "Failed to book appointment",
          appearence: true,
          type: "error",
        });
      }
    } catch (error) {
      console.error("Booking error:", error);
      setToast({
        message: "Something went wrong",
        appearence: true,
        type: "error",
      });
    }
  };

  const handleClose = () => {
    setAppointmentDate("");
    setAppointmentTime("");
    setMedicalReport(null);
    onClose();
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: "bold", bgcolor: "#f5f5f5" }}>
          Book Appointment
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          {/* Doctor Details */}
          <Box
            sx={{
              mb: 3,
              p: 2,
              bgcolor: "rgba(102, 126, 234, 0.05)",
              borderRadius: "8px",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
              {`${doctor?.prefix} ${doctor?.fullName}`}
            </Typography>
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              <strong>Specialization:</strong> {doctor?.specialization}
            </Typography>
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              <strong>Experience:</strong> {doctor?.experience}
            </Typography>
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              <strong>Fees:</strong> ${doctor?.feePerConsultation}
            </Typography>
            <Typography variant="body2">
              <strong>Available:</strong> {doctor?.fromTime} - {doctor?.toTime}
            </Typography>
          </Box>

          {/* Appointment Details */}
          <Alert severity="info" sx={{ mb: 2 }}>
            Please select your preferred date and time for the appointment
          </Alert>

          <TextField
            fullWidth
            label="Appointment Date"
            type="date"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 2 }}
            inputProps={{
              min: new Date().toISOString().split("T")[0],
            }}
          />

          <TextField
            fullWidth
            label="Appointment Time"
            type="time"
            value={appointmentTime}
            onChange={(e) => setAppointmentTime(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 2 }}
          />

          {/* File Upload */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ fontWeight: "bold", mb: 1 }}>
              Medical Report (Optional)
            </Typography>
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileSelect}
              accept=".pdf,.jpg,.jpeg,.png"
              style={{ display: "none" }}
            />
            <Button
              variant="outlined"
              fullWidth
              onClick={() => fileInputRef.current?.click()}
              sx={{ mb: 1 }}
            >
              Choose File
            </Button>
            {medicalReport && (
              <Typography variant="body2" sx={{ color: "green" }}>
                ✓ {medicalReport.name}
              </Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2, bgcolor: "#f5f5f5" }}>
          <Button onClick={handleClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleBooking}
            disabled={isLoading}
            sx={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            }}
          >
            {isLoading ? <Spinner size={20} /> : "Book Appointment"}
          </Button>
        </DialogActions>
      </Dialog>

      <ToastAlert
        appearence={toast.appearence}
        type={toast.type}
        message={toast.message}
        handleClose={() => setToast({ ...toast, appearence: false })}
      />
    </>
  );
};

export default BookAppointmentModal;
