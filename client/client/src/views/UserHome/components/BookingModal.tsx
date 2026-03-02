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
  IconButton,
} from "@mui/material";
import { IoClose } from "react-icons/io5";

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  doctor: any;
  onBook: (dateTime: string, file: File | null) => void;
  isLoading: boolean;
}

const BookingModal = ({
  open,
  onClose,
  doctor,
  onBook,
  isLoading,
}: BookingModalProps) => {
  const [dateTime, setDateTime] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleBook = () => {
    onBook(dateTime, selectedFile);
  };

  const handleClose = () => {
    setDateTime("");
    setSelectedFile(null);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #eee",
          pb: 1,
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          Booking appointment
        </Typography>
        <IconButton onClick={handleClose} size="small">
          <IoClose size={24} />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        {/* Doctor Details */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
            Doctor Details:
          </Typography>
          <Typography variant="body2" sx={{ mb: 0.5 }}>
            <strong>Name:</strong> {doctor?.fullName}
          </Typography>
          <Typography variant="body2">
            <strong>Specialization:</strong> {doctor?.specialization}
          </Typography>
        </Box>

        {/* Appointment Date and Time */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Appointment Date and Time:
          </Typography>
          <TextField
            type="datetime-local"
            fullWidth
            size="small"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            inputProps={{
              min: new Date().toISOString().slice(0, 16),
            }}
          />
        </Box>

        {/* File Upload */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*,.pdf"
            style={{ display: "none" }}
          />
          <Button
            variant="outlined"
            size="small"
            onClick={() => fileInputRef.current?.click()}
            sx={{ textTransform: "none" }}
          >
            Choose file
          </Button>
          <Typography variant="body2" color="textSecondary">
            {selectedFile ? selectedFile.name : "No file chosen"}
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2, borderTop: "1px solid #eee" }}>
        <Button
          variant="contained"
          onClick={handleClose}
          sx={{
            bgcolor: "#6c757d",
            textTransform: "none",
            "&:hover": { bgcolor: "#5a6268" },
          }}
        >
          Close
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleBook}
          disabled={isLoading}
          sx={{
            textTransform: "none",
          }}
        >
          {isLoading ? "Booking..." : "Book"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookingModal;
