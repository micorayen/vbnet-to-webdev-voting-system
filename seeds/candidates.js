const mongoose = require("mongoose");
const Candidate = require("../models/candidates"); // Import your Candidate model

mongoose.connect("mongodb://127.0.0.1:27017/voting-app", {});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", async () => {
  console.log("Database connected.");

  // Delete all documents in the candidates collection
  // try {
  //   await Candidate.deleteMany({});
  //   console.log("All documents deleted from the candidates collection.");
  // } catch (err) {
  //   console.error("Error deleting documents:", err);
  //   return;
  // }

  function generateStudentID() {
    const prefix = "11";
    const randomDigits = Math.floor(Math.random() * 1000000); // Generates random 6-digit number
    const paddedRandomDigits = String(randomDigits).padStart(6, "0"); // Ensures 6 digits with leading zeros if necessary
    return prefix + "-" + paddedRandomDigits;
  }

  // const parties = ["Digital Innovators Coalition", "Tech Savvy Society"];
  const party = "Tech Savvy Society";
  const positions = [
    "President",
    "VP-Internal",
    "VP-External",
    "Auditor",
    "Treasurer",
    "Secretary",
    "PRO",
    "1st year representative",
    "2nd year representative",
    "3rd year representative",
    "4th year representative",
  ];
  const firstNames = [
    "Juan",
    "Maria",
    "Jose",
    "Ana",
    "Pedro",
    "Mariano",
    "Luis",
    "Carmen",
    "Ramon",
    "Sofia",
    "Gabriel",
    "Elena",
    "Diego",
    "Isabel",
    "Carlos",
    "Manuela",
    "Pablo",
    "Clara",
    "Fernando",
    "Valentina",
    "Javier",
    "Ines",
    "Antonio",
    "Lucia",
    "Alejandro",
    "Lorena",
    "Jorge",
    "Leticia",
    "Miguel",
    "Eva",
  ];

  const lastNames = [
    "Santos",
    "Gonzalez",
    "Lopez",
    "Cruz",
    "Reyes",
    "Garcia",
    "Martinez",
    "Fernandez",
    "Gomez",
    "Ruiz",
    "Hernandez",
    "Torres",
    "Diaz",
    "Perez",
    "Alvarez",
    "Romero",
    "Vargas",
    "Ramos",
    "Flores",
    "Acosta",
    "Ramirez",
    "Suarez",
    "Delgado",
    "Castillo",
    "Mendoza",
    "Aguilar",
    "Ortega",
    "Vazquez",
    "Jimenez",
  ];

  const courses = [
    "BS-Computer Science",
    "BS-Information Technology",
    "BS-Information Systems",
    "BS-Computer Engineering",
    "BS-Software Engineering",
  ];
  const yearLevels = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

  const candidates = [];

  // for (const position of positions) {
  //   console.log("+ ", position);
  // }
  // for (let i = 0; i < positions.length; i++) {
  //   console.log(`Position ${i + 1}: ${positions[i]}`);
  // }

  for (const position of positions) {
    const fullName = `${
      firstNames[Math.floor(Math.random() * firstNames.length)]
    } ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
    const candidateIdNumber = generateStudentID();

    const course = courses[Math.floor(Math.random() * courses.length)];
    const yearLevel = yearLevels[Math.floor(Math.random() * yearLevels.length)];

    await candidates.push({
      candidateIdNumber,
      party,
      position,
      fullName,
      course,
      yearLevel,
    });
  }

  // Seed candidates into MongoDB
  Candidate.insertMany(candidates)
    .then(() => {
      console.log("Candidates seeded successfully.");
      db.close();
    })
    .catch((err) => console.error(err));
});
