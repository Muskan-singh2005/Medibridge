const express = require("express");
const app = express();
const cors = require("cors");
const multer = require("multer");
const path = require("path");

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve uploads

// File upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

// Mock Data
const data = {
  medicines: [
    { name: "Paracetamol 500mg", time: "9:00 AM" },
    { name: "Vitamin D", time: "7:00 PM" },
  ],
  prescriptions: [],
  appointments: [
    { date: "12 Jan 2025", type: "General Checkup" },
    { date: "20 Jan 2025", type: "Follow-Up" }
  ],
  notifications: [
    "Missed Medicine: Vitamin D at 7PM",
    "Upcoming Appointment: 12 Jan 2025"
  ],
  profile: {
    name: "Aditi Khanna",
    age: 44,
    condition: "Diabetes",
    blood_group: "O+"
  },
  doctor: {
    name: "Dr. Meera Sharma",
    specialization: "Endocrinologist",
    hospital: "Apollo Hospital, Delhi",
    phone: "+91 98321xxxxx",
    email: "meera.sharma@apollo.com"
  }
};

// API Routes
app.get("/medicines", (req, res) => res.json(data.medicines));
app.get("/prescriptions", (req, res) => res.json(data.prescriptions));
app.get("/appointments", (req, res) => res.json(data.appointments));
app.get("/notifications", (req, res) => res.json(data.notifications));
app.get("/profile", (req, res) => res.json(data.profile));
app.get("/doctor", (req, res) => res.json(data.doctor));

// Upload prescription
app.post("/upload-prescription", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });

  const fileUrl = `http://localhost:5000/uploads/${req.file.filename}`;
  data.prescriptions.push(fileUrl);
  res.json({ message: "Uploaded!", fileUrl });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
