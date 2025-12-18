// backend/index.js

import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";

const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(cors()); 
app.use(express.json()); 

// --- DEBUGGING LOG ---
// This will print your available models to the terminal when the server starts
console.log("Available Prisma Models:", Object.keys(prisma).filter(key => !key.startsWith('$') && !key.startsWith('_')));

// --- NEW TEST ROUTES ---

/*
 * POST /api/tests
 * Saves a new test created from Testcreatepage.jsx
 */
app.post("/api/tests", async (req, res) => {
  try {
    console.log("📥 Incoming data from frontend:", req.body);

    const { testName, variantAUrl, variantBUrl } = req.body;

    // Use lowercase 'test' to match standard Prisma generation
    const newTest = await prisma.test.create({
      data: {
        testName: testName || "Untitled Test",
        variantAUrl: variantAUrl || "",
        variantBUrl: variantBUrl || "",
        status: "Active", 
        visitors: 0,
      },
    });

    console.log("✅ Saved to database successfully:", newTest);
    res.status(201).json(newTest);
  } catch (error) {
    console.error("❌ CRITICAL DATABASE ERROR:", error);
    res.status(500).json({ error: "Could not save to database. Check terminal logs." });
  }
});
app.get("/api/insights", async (req, res) => {
  try {
    const insights = await prisma.insight.findMany({
      orderBy: { createdAt: "desc" }
    });
    res.json(insights);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch insights" });
  }
});


/*
 * GET /api/tests
 * Retrieves all tests to display on Pagename.jsx (Dashboard)
 */
app.get("/api/tests", async (req, res) => {
  try {
    // Use lowercase 'test' here as well
    const allTests = await prisma.test.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.status(200).json(allTests);
  } catch (e) {
    console.error("❌ Error fetching tests:", e);
    res.status(500).json({ error: "Could not retrieve tests." });
  }
});


// --- EXISTING USER ROUTES ---

app.post("/api/register", async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ error: "Email already in use." });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, name, password: hashedPassword },
    });

    const { password: _, ...userWithoutPassword } = user;
    res.status(201).json(userWithoutPassword);
  } catch (e) {
    res.status(500).json({ error: "Something went wrong." });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: "Invalid email or password." });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ error: "Invalid email or password." });

    const { password: _, ...userWithoutPassword } = user;
    res.status(200).json(userWithoutPassword);
  } catch (e) {
    res.status(500).json({ error: "Something went wrong." });
  }
});

const PORT = 3001; 
app.listen(PORT, () => {
  console.log(`🚀 Backend server running at http://localhost:${PORT}`);
});

process.on("beforeExit", async () => {
  await prisma.$disconnect();
});