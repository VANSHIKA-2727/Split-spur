// backend/index.js

import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";

const app = express();
const prisma = new PrismaClient();

// -----------------------------
// MIDDLEWARE
// -----------------------------
app.use(cors());
app.use(express.json());

// -----------------------------
// CONSTANTS
// -----------------------------
const VALID_EVENT_TYPES = ["view", "click", "conversion"];

// -----------------------------
// TEST ROUTES
// -----------------------------

app.post("/api/tests", async (req, res) => {
  try {
    const { testName, variantAUrl, variantBUrl } = req.body;

    const newTest = await prisma.test.create({
      data: {
        testName: testName || "Untitled Test",
        variantAUrl: variantAUrl || "",
        variantBUrl: variantBUrl || "",
        status: "Active",
        visitors: 0,
      },
    });

    res.status(201).json(newTest);
  } catch (error) {
    console.error("❌ Create test error:", error);
    res.status(500).json({ error: "Could not create test" });
  }
});

app.get("/api/tests", async (req, res) => {
  try {
    const tests = await prisma.test.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(tests);
  } catch {
    res.status(500).json({ error: "Could not fetch tests" });
  }
});

app.get("/api/tests/:id", async (req, res) => {
  try {
    const test = await prisma.test.findUnique({
      where: { id: req.params.id },
    });

    if (!test) {
      return res.status(404).json({ error: "Test not found" });
    }

    res.json(test);
  } catch {
    res.status(500).json({ error: "Failed to fetch test" });
  }
});

// -----------------------------
// ✅ SHOPIFY-SAFE ASSIGN VARIANT
// -----------------------------
app.post("/api/assign-variant", async (req, res) => {
  try {
    const test = await prisma.test.findFirst({
      where: { status: "Active" },
      orderBy: { createdAt: "desc" },
    });

    if (!test) {
      return res.status(404).json({ error: "No active test found" });
    }

    const variant = Math.random() < 0.5 ? "A" : "B";
    const url = variant === "A" ? test.variantAUrl : test.variantBUrl;

    await prisma.test.update({
      where: { id: test.id },
      data: { visitors: { increment: 1 } },
    });

    res.json({
      testId: test.id,
      variant,
      url,
    });
  } catch (error) {
    console.error("❌ Assign variant error:", error);
    res.status(500).json({ error: "Failed to assign variant" });
  }
});

async function assignVariant() {
  console.log("🚀 assignVariant triggered");

  const res = await fetch(`${API_BASE}/api/assign-variant`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      page: window.location.pathname,
    }),
  });

  const data = await res.json();
  console.log("✅ Variant response:", data);
}


// -----------------------------
// ✅ TRACK EVENT (SAFE + VALIDATED)
// -----------------------------
app.post("/api/track-event", async (req, res) => {
  try {
    const { testId, variant, type } = req.body;

    if (!testId || !variant || !type) {
      return res.status(400).json({
        error: "testId, variant, and type are required",
      });
    }

    if (!VALID_EVENT_TYPES.includes(type)) {
      return res.status(400).json({
        error: `Invalid event type. Allowed: ${VALID_EVENT_TYPES.join(", ")}`,
      });
    }

    const event = await prisma.$queryRaw`
      INSERT INTO "Event" ("test_id", "variant", "type")
      VALUES (${testId}, ${variant}, ${type})
      RETURNING *;
    `;

    res.status(201).json({ success: true, event });
  } catch (error) {
    console.error("❌ Track event error:", error);
    res.status(500).json({ error: "Failed to track event" });
  }
});

// -----------------------------
// REPORTS
// -----------------------------
app.get("/api/reports/:testId", async (req, res) => {
  try {
    const events = await prisma.$queryRaw`
      SELECT variant, type, COUNT(*) as count
      FROM "Event"
      WHERE test_id = ${req.params.testId}
      GROUP BY variant, type
    `;

    const base = { view: 0, click: 0, conversion: 0 };
    const stats = { A: { ...base }, B: { ...base } };

    events.forEach((e) => {
      stats[e.variant][e.type] = Number(e.count);
    });

    const calc = (d) => ({
      views: d.view,
      clicks: d.click,
      conversions: d.conversion,
      ctr: d.view ? (d.click / d.view) * 100 : 0,
      conversionRate: d.click ? (d.conversion / d.click) * 100 : 0,
    });

    res.json({
      A: calc(stats.A),
      B: calc(stats.B),
    });
  } catch (error) {
    console.error("❌ Report error:", error);
    res.status(500).json({ error: "Failed to generate report" });
  }
});

// -----------------------------
// AUTH
// -----------------------------
app.post("/api/register", async (req, res) => {
  try {
    const { email, name, password } = req.body;

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { email, name, password: hashed },
    });

    const { password: _, ...safeUser } = user;
    res.status(201).json(safeUser);
  } catch {
    res.status(500).json({ error: "Registration failed" });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: req.body.email },
    });

    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const { password: _, ...safeUser } = user;
    res.json(safeUser);
  } catch {
    res.status(500).json({ error: "Login failed" });
  }
});

// -----------------------------
// SERVER
// -----------------------------
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});

process.on("beforeExit", async () => {
  await prisma.$disconnect();
});
