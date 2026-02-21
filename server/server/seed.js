const mongoose = require("mongoose");
const Doctor = require("./models/doctorModel");

// Connection to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/doc-app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedDoctors = async () => {
  try {
    // Clear existing doctors (optional)
    // await Doctor.deleteMany({});

    const sampleDoctors = [
      {
        userId: "doctor_1",
        prefix: "Dr.",
        fullName: "Ahmed Hassan",
        email: "ahmed.hassan@example.com",
        phoneNumber: "+201001234567",
        address: "123 Medical Center, Cairo",
        specialization: "Cardiology",
        experience: "10 years",
        feePerConsultation: 100,
        fromTime: "09:00",
        toTime: "17:00",
        status: "approved",
      },
      {
        userId: "doctor_2",
        prefix: "Dr.",
        fullName: "Fatima Ahmed",
        email: "fatima.ahmed@example.com",
        phoneNumber: "+201001234568",
        address: "456 Health Plaza, Giza",
        specialization: "Pediatrics",
        experience: "8 years",
        feePerConsultation: 80,
        fromTime: "10:00",
        toTime: "18:00",
        status: "approved",
      },
      {
        userId: "doctor_3",
        prefix: "Dr.",
        fullName: "Mohamed Ali",
        email: "mohamed.ali@example.com",
        phoneNumber: "+201001234569",
        address: "789 Hospital Road, Alexandria",
        specialization: "Dermatology",
        experience: "12 years",
        feePerConsultation: 90,
        fromTime: "08:00",
        toTime: "16:00",
        status: "approved",
      },
      {
        userId: "doctor_4",
        prefix: "Dr.",
        fullName: "Laila Mohsen",
        email: "laila.mohsen@example.com",
        phoneNumber: "+201001234570",
        address: "321 Clinic Street, Cairo",
        specialization: "Neurology",
        experience: "15 years",
        feePerConsultation: 120,
        fromTime: "09:00",
        toTime: "17:00",
        status: "approved",
      },
      {
        userId: "doctor_5",
        prefix: "Dr.",
        fullName: "Osama Ibrahim",
        email: "osama.ibrahim@example.com",
        phoneNumber: "+201001234571",
        address: "654 Medical Complex, Giza",
        specialization: "Orthopedics",
        experience: "11 years",
        feePerConsultation: 110,
        fromTime: "10:00",
        toTime: "18:00",
        status: "approved",
      },
      {
        userId: "doctor_6",
        prefix: "Dr.",
        fullName: "Noor Salem",
        email: "noor.salem@example.com",
        phoneNumber: "+201001234572",
        address: "987 Health Center, Helwan",
        specialization: "Gynecology",
        experience: "9 years",
        feePerConsultation: 95,
        fromTime: "09:00",
        toTime: "17:00",
        status: "approved",
      },
    ];

    // Insert doctors
    const insertedDoctors = await Doctor.insertMany(sampleDoctors);
    console.log("✅ Sample doctors added successfully!");
    console.log(`Total doctors added: ${insertedDoctors.length}`);

    // Disconnect
    mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding doctors:", error.message);
    mongoose.disconnect();
    process.exit(1);
  }
};

seedDoctors();
