// ==========================
// CARETAKER FRONTEND SCRIPT
// ==========================

document.addEventListener("DOMContentLoaded", () => {
  // Export functions to global window
  window.loadProfile = loadProfile;
  window.loadMedicines = loadMedicines;
  window.loadAppointments = loadAppointments;
  window.loadNotifications = loadNotifications;
  window.loadPrescriptions = loadPrescriptions;
  window.uploadPrescription = uploadPrescription;
  window.showUploader = showUploader;
  window.loadDoctor = loadDoctor;
  window.showSection = showSection;
  window.addMedicine = addMedicine;
  window.deleteMedicine = deleteMedicine;

  renderMedicines(); // Initial render
});

// ==========================
// GLOBAL MEDICINE ARRAY
// ==========================
let medicines = [
  { name: "Paracetamol", qty: 20, expiry: "2025-02-10" },
  { name: "Amoxicillin", qty: 5, expiry: "2024-12-20" },
  { name: "Cetirizine", qty: 50, expiry: "2026-04-05" }
];

// ==========================
// LOAD PROFILE
// ==========================
async function loadProfile() {
  try {
    const res = await fetch("http://localhost:5000/profile");
    const data = await res.json();
    const html = `
      <div class="w-full flex justify-center">
        <div class="bg-white w-full md:w-3/4 lg:w-2/3 p-8 rounded-2xl shadow-xl border border-[#90CAF9]">
          <div class="flex items-center space-x-5 mb-6">
            <img src="https://cdn-icons-png.flaticon.com/512/2922/2922510.png" class="w-20 h-20 rounded-full" />
            <h2 class="text-3xl font-bold text-[#0D47A1]">Patient Profile</h2>
          </div>
          <div class="space-y-3 text-lg">
            <p><strong class="text-[#0D47A1]">Name:</strong> ${data.name}</p>
            <p><strong class="text-[#0D47A1]">Age:</strong> ${data.age}</p>
            <p><strong class="text-[#0D47A1]">Condition:</strong> ${data.condition}</p>
            <p><strong class="text-[#0D47A1]">Blood Group:</strong> ${data.blood_group}</p>
          </div>
        </div>
      </div>
    `;
    document.getElementById("result").innerHTML = html;
  } catch {
    document.getElementById("result").innerHTML = `<p class="text-red-600 text-center">Error loading profile.</p>`;
  }
}

// ==========================
// LOAD DOCTOR
// ==========================
// =======================
// LOAD DOCTOR INFO
// =======================
function loadDoctor() {
  const html = `
    <div class="w-full flex justify-center">
      <div class="bg-white w-full md:w-3/4 lg:w-2/3 p-8 rounded-2xl shadow-xl">

        <div class="flex items-center space-x-4 mb-6">
          <img src="https://cdn-icons-png.flaticon.com/512/387/387561.png" class="w-20 h-20 rounded-full" />
          <h2 class="text-3xl font-bold text-[#0D47A1]">Doctor Details</h2>
        </div>

        <p class="text-lg"><strong class="text-[#0D47A1]">Name:</strong> Dr. Meera Sharma</p>
        <p class="text-lg"><strong class="text-[#0D47A1]">Specialization:</strong> Endocrinologist (Diabetes)</p>
        <p class="text-lg"><strong class="text-[#0D47A1]">Hospital:</strong> Apollo Hospital, Delhi</p>
        <p class="text-lg"><strong class="text-[#0D47A1]">Phone:</strong> +91 98321xxxxx</p>

        <button class="mt-6 bg-green-600 text-white px-5 py-2 rounded-xl shadow hover:bg-green-700">
          📞 Call Doctor
        </button>

      </div>
    </div>
  `;

  document.getElementById("result").innerHTML = html;
  // Hide the medicine stock section if visible
  document.getElementById("medicine-stock").classList.add("hidden");
}


// ==========================
// LOAD MEDICINES
// ==========================
async function loadMedicines() {
  try {
    const res = await fetch("http://localhost:5000/medicines");
    const data = await res.json();
    let items = data.map(m => `
      <div class="p-4 bg-[#E3F2FD] rounded-xl border border-[#90CAF9] shadow mb-3">
        <p class="text-lg"><strong class="text-[#0D47A1]">💊 ${m.name}</strong></p>
        <p class="text-gray-700">⏰ Time: ${m.time}</p>
      </div>
    `).join("");
    document.getElementById("result").innerHTML = `
      <div class="w-full flex justify-center">
        <div class="bg-white w-full md:w-3/4 lg:w-2/3 p-8 rounded-2xl shadow-xl">
          <h2 class="text-3xl font-bold text-[#0D47A1] mb-5">Medicines</h2>
          ${items}
        </div>
      </div>
    `;
  } catch {
    document.getElementById("result").innerHTML = `<p class="text-red-600">Error loading medicines.</p>`;
  }
}

// ==========================
// LOAD APPOINTMENTS
// ==========================
async function loadAppointments() {
  try {
    const res = await fetch("http://localhost:5000/appointments");
    const data = await res.json();
    const items = data.map(a => `
      <div class="p-4 bg-[#E3F2FD] rounded-xl border border-[#90CAF9] shadow mb-3">
        <p class="text-lg font-semibold text-[#0D47A1]">📅 ${a.type}</p>
        <p class="text-gray-700">📆 Date: ${a.date}</p>
      </div>
    `).join("");
    document.getElementById("result").innerHTML = `
      <div class="w-full flex justify-center">
        <div class="bg-white w-full md:w-3/4 lg:w-2/3 p-8 rounded-2xl shadow-xl">
          <h2 class="text-3xl font-bold text-[#0D47A1] mb-5">Appointments</h2>
          ${items}
        </div>
      </div>
    `;
  } catch {
    document.getElementById("result").innerHTML = `<p class="text-red-600">Error loading appointments.</p>`;
  }
}

// ==========================
// LOAD NOTIFICATIONS
// ==========================
async function loadNotifications() {
  try {
    const res = await fetch("http://localhost:5000/notifications");
    const data = await res.json();
    const items = data.map(n => `
      <div class="p-4 bg-yellow-100 rounded-xl border border-yellow-300 shadow mb-3">
        <p class="text-lg">🔔 ${n}</p>
      </div>
    `).join("");
    document.getElementById("result").innerHTML = `
      <div class="w-full flex justify-center">
        <div class="bg-white w-full md:w-3/4 lg:w-2/3 p-8 rounded-2xl shadow-xl">
          <h2 class="text-3xl font-bold text-[#0D47A1] mb-5">Notifications</h2>
          ${items}
        </div>
      </div>
    `;
  } catch {
    document.getElementById("result").innerHTML = `<p class="text-red-600">Error loading notifications.</p>`;
  }
}

// ==========================
// LOAD PRESCRIPTIONS
// ==========================
async function loadPrescriptions() {
  try {
    const res = await fetch("http://localhost:5000/prescriptions");
    const data = await res.json();
    const items = data.length
      ? data.map(url => `
        <div class="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-3 flex items-center justify-between">
          <span class="text-blue-600 font-semibold">📄 Prescription</span>
          <a href="${url}" target="_blank" class="text-[#0D47A1] underline">View</a>
        </div>
      `).join("")
      : `<p class="text-gray-600 text-center mt-8">No prescriptions uploaded yet.</p>`;
    document.getElementById("result").innerHTML = `
      <div class="w-full flex justify-center">
        <div class="bg-white w-full md:w-3/4 lg:w-2/3 p-8 rounded-2xl shadow-xl">
          <h2 class="text-3xl font-bold text-[#0D47A1] mb-5">Prescriptions</h2>
          ${items}
        </div>
      </div>
    `;
  } catch {
    document.getElementById("result").innerHTML = `<p class="text-red-600">Error loading prescriptions.</p>`;
  }
}

// ==========================
// UPLOAD PRESCRIPTION
// ==========================
async function uploadPrescription() {
  const fileInput = document.getElementById('prescriptionFile');
  const file = fileInput.files[0];
  if (!file) {
    alert("Please select a file to upload");
    return;
  }

  const formData = new FormData();
  formData.append('file', file);

  try {
    const res = await fetch("http://localhost:5000/upload-prescription", {
      method: "POST",
      body: formData
    });
    const data = await res.json();
    if (res.ok) {
      alert("Prescription uploaded successfully!");
      loadPrescriptions();
    } else {
      alert("Upload failed");
    }
  } catch {
    alert("Error during upload");
  }
}

// ==========================
// SHOW UPLOADER
// ==========================
function showUploader() {
  document.getElementById("result").innerHTML = `
    <div class="w-full flex justify-center">
      <div class="bg-white w-full md:w-3/4 lg:w-2/3 p-8 rounded-2xl shadow-xl text-center">
        <h2 class="text-2xl font-bold text-[#0D47A1] mb-4">Upload Prescription</h2>
        <input type="file" id="prescriptionFile" class="border p-3 rounded w-full" />
        <button onclick="uploadPrescription()" class="bg-[#0D47A1] text-white px-4 py-2 rounded mt-4">
          Upload
        </button>
      </div>
    </div>
  `;
}

// ==========================
// SECTION SHOW/HIDE
// ==========================
function showSection(id) {
  document.querySelectorAll("section").forEach(s => s.classList.add("hidden"));
  document.getElementById(id)?.classList.remove("hidden");
}

// ==========================
// MEDICINE STOCK FUNCTIONS
// ==========================
function addMedicine() {
  const name = document.getElementById("med-name").value;
  const qty = parseInt(document.getElementById("med-qty").value);
  const exp = document.getElementById("med-exp").value;

  if (!name || !qty || !exp) {
    alert("Please fill all fields");
    return;
  }

  medicines.push({ name, qty, expiry: exp });
  renderMedicines();

  document.getElementById("med-name").value = "";
  document.getElementById("med-qty").value = "";
  document.getElementById("med-exp").value = "";
}

function deleteMedicine(index) {
  medicines.splice(index, 1);
  renderMedicines();
}

function renderMedicines() {
  const table = document.getElementById("medicine-table");
  if (!table) return;
  table.innerHTML = "";

  medicines.forEach((med, index) => {
    const today = new Date();
    const expDate = new Date(med.expiry);
    const diffDays = (expDate - today) / (1000*60*60*24);

    let expiryClass = "";
    if (diffDays < 0) expiryClass = "bg-red-500 text-white";
    else if (diffDays <= 30) expiryClass = "bg-orange-300 text-black";

    let stockClass = med.qty <= 10 ? "bg-red-200 font-semibold" : "";

    table.innerHTML += `
      <tr>
        <td class="${expiryClass} p-2 border">${med.name}</td>
        <td class="${stockClass} p-2 border">${med.qty}</td>
        <td class="${expiryClass} p-2 border">${med.expiry}</td>
        <td class="p-2 border text-center">
          <button class="bg-red-500 text-white px-3 py-1 rounded" onclick="deleteMedicine(${index})">Delete</button>
        </td>
      </tr>
    `;
  });
}
