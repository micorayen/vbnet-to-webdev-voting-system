const mongoose = require("mongoose");

// Import exported-models & files:
const { Party, Course, Title } = require("../models/additionals");

mongoose.connect("mongodb://127.0.0.1:27017/voting-app", {});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database connected.");
});

const partyData = [
  { party: "Tech Vanguard Alliance" },
  { party: "Digital Innovators Coalition" },
  { party: "Byte Brigade Coalition" },
  { party: "Tech Savvy Society" },
  { party: "CodeCrafters Alliance" },
];

const courseData = [
  { course: "BS-Computer Science" },
  { course: "BS-Information Technology" },
  { course: "BS-Information Systems" },
  { course: "BS-Computer Engineering" },
  { course: "BS-Software Engineering" },
];

const titleData = [{ title: "Automated Voting System" }];

// COURSES SEEDS ==============================
// async function seedCourses() {
//   try {
//     // Remove existing parties
//     await Course.deleteMany({});

//     // Seed new parties
//     await Course.create(courseData);

//     console.log("Course seeded successfully.");
//   } catch (error) {
//     console.error("Error seeding coursees:", error);
//   } finally {
//     // Close the connection
//     mongoose.connection.close();
//   }
// }
async function seedParties() {
  try {
    // Remove existing parties
    await Party.deleteMany({});

    // Seed new parties
    await Party.create(partyData);

    console.log("Parties seeded successfully.");
  } catch (error) {
    console.error("Error seeding parties:", error);
  } finally {
    // Close the connection
    mongoose.connection.close();
  }
}

// async function seedTitles() {
//   try {
//     // Remove existing parties
//     await Title.deleteMany({});

//     // Seed new parties
//     await Title.create(titleData);

//     console.log("Title seeded successfully.");
//   } catch (error) {
//     console.error("Error seeding title:", error);
//   } finally {
//     // Close the connection
//     mongoose.connection.close();
//   }
// }
// seedTitles();

// seedCourses();
seedParties();
