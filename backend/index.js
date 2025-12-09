// This old script code is correctly commented out
// import { PrismaClient } from "@prisma/client";
// import dotenv from "dotenv";
// dotenv.config(); // Loads DATABASE_URL from .env
// const prisma = new PrismaClient();
// async function main() {
//   const user = await prisma.user.create({
//     data: {
//       email: "geet@gmail.com",
//       name: "Geetika",
//     },
//   });
//   console.log("✅ User created:", user);
// }
// main()
//   .catch((e) => {
//     console.error("❌ Error:", e);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

// --- Server Code Starts Here ---
import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";

// Initialize express app and prisma
const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(cors()); // Allows requests from your frontend
app.use(express.json()); // Allows server to read JSON from request body

/*
 * POST /api/register
 * Creates a new user
 * Expects { email, name, password } in the request body
 */
app.post("/api/register", async (req, res) => {
  try {
    const { email, name, password } = req.body;

    // 1. Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ error: "Email already in use." });
    }

    // 2. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Create the new user
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    console.log("✅ User created:", user);
    // 4. Send back the created user (without the password)
    const { password: _, ...userWithoutPassword } = user;
    res.status(201).json(userWithoutPassword);

  } catch (e) {
    console.error("❌ Error:", e);
    res.status(500).json({ error: "Something went wrong." });
  }
});

/*
 * POST /api/login
 * Authenticates an existing user
 * Expects { email, password } in the request body
 */
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find the user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // 2. If user doesn't exist, send error
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    // 3. Check if the submitted password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    // 4. Send back user data (without the password)
    const { password: _, ...userWithoutPassword } = user;
    res.status(200).json(userWithoutPassword);

  } catch (e) {
    console.error("❌ Error:", e);
    res.status(500).json({ error: "Something went wrong." });
  }
});


// Start the server
const PORT = 3001; // We'll run the backend on port 3001
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

// Graceful shutdown for Prisma
process.on("beforeExit", async () => {
  await prisma.$disconnect();
});