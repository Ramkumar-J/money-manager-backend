const express = require("express");
const app = express();
const cors = require("cors");
app.use(
  cors({
    origin:"http://localhost:3000,https://voluble-torrone-9375e0.netlify.app"
  })
);
app.use(express.json());
const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
const URL =
  "mongodb+srv://ramkumar:admin123@cluster0.5pqfc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

// Homepage
// Daily Plan
app.post("/DailyPlanform", async (req, res) => {
  try {
    let connection = await mongoClient.connect(URL);
    let db = connection.db("money");
    await db.collection("dailyplans").insertOne(req.body);
    await connection.close();
    res.json({ message: "Daily Plan created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.get("/DailyPlans", async (req, res) => {
  try {
    let connection = await mongoClient.connect(URL);
    let db = connection.db("money");
    let dailyplans = await db.collection("dailyplans").find().toArray();
    await connection.close();
    res.json(dailyplans);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.delete("/DailyPlans/:id", async (req, res) => {
  try {
    let connection = await mongoClient.connect(URL);
    let db = connection.db("money");
    await db
      .collection("dailyplans")
      .deleteOne({ _id: mongodb.ObjectId(req.params.id) });
    await connection.close();
    res.json({ message: "Daily Plan deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Weekly Plan
app.post("/WeeklyPlanform", async (req, res) => {
  try {
    let connection = await mongoClient.connect(URL);
    let db = connection.db("money");
    await db.collection("weeklyplans").insertOne(req.body);
    await connection.close();
    res.json({ message: "Weekly Plan created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.get("/WeeklyPlans", async (req, res) => {
  try {
    let connection = await mongoClient.connect(URL);
    let db = connection.db("money");
    let weeklyplans = await db.collection("weeklyplans").find().toArray();
    await connection.close();
    res.json(weeklyplans);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.delete("/WeeklyPlans/:id", async (req, res) => {
  try {
    let connection = await mongoClient.connect(URL);
    let db = connection.db("money");
    await db
      .collection("weeklyplans")
      .deleteOne({ _id: mongodb.ObjectId(req.params.id) });
    await connection.close();
    res.json({ message: "Weekly Plan deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Monthly Plan
app.post("/MonthlyPlanform", async (req, res) => {
  try {
    let connection = await mongoClient.connect(URL);
    let db = connection.db("money");
    await db.collection("monthlyplans").insertOne(req.body);
    await connection.close();
    res.json({ message: "Monthly Plan created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.get("/MonthlyPlans", async (req, res) => {
  try {
    let connection = await mongoClient.connect(URL);
    let db = connection.db("money");
    let monthlyplans = await db.collection("monthlyplans").find().toArray();
    await connection.close();
    res.json(monthlyplans);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.delete("/MonthlyPlans/:id", async (req, res) => {
  try {
    let connection = await mongoClient.connect(URL);
    let db = connection.db("money");
    await db
      .collection("monthlyplans")
      .deleteOne({ _id: mongodb.ObjectId(req.params.id) });
    await connection.close();
    res.json({ message: "Monthly Plan deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Yearly Plan
app.post("/YearlyPlanform", async (req, res) => {
  try {
    let connection = await mongoClient.connect(URL);
    let db = connection.db("money");
    await db.collection("yearlyplans").insertOne(req.body);
    await connection.close();
    res.json({ message: "Yearly Plan created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.get("/YearlyPlans", async (req, res) => {
  try {
    let connection = await mongoClient.connect(URL);
    let db = connection.db("money");
    let yearlyplans = await db.collection("yearlyplans").find().toArray();
    await connection.close();
    res.json(yearlyplans);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.delete("/YearlyPlans/:id", async (req, res) => {
  try {
    let connection = await mongoClient.connect(URL);
    let db = connection.db("money");
    await db
      .collection("yearlyplans")
      .deleteOne({ _id: mongodb.ObjectId(req.params.id) });
    await connection.close();
    res.json({ message: "Yearly Plan deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Add Incomes
app.post("/AddIncomes", async (req, res) => {
  try {
    let connection = await mongoClient.connect(URL);
    let db = connection.db("money");
    await db.collection("addincomes").insertOne(req.body);
    await connection.close();
    res.json({ message: "Income Added" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.get("/AddIncomes", async (req, res) => {
  try {
    let connection = await mongoClient.connect(URL);
    let db = connection.db("money");
    let addincomes = await db.collection("addincomes").find().toArray();
    await connection.close();
    res.json(addincomes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.delete("/AddIncomes/:id", async (req, res) => {
  try {
    let connection = await mongoClient.connect(URL);
    let db = connection.db("money");
    await db
      .collection("addincomes")
      .deleteOne({ _id: mongodb.ObjectId(req.params.id) });
    await connection.close();
    res.json({ message: "Income data deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Add Expenses
app.post("/AddExpenses", async (req, res) => {
  try {
    let connection = await mongoClient.connect(URL);
    let db = connection.db("money");
    await db.collection("addexpenses").insertOne(req.body);
    await connection.close();
    res.json({ message: "Expense Added" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.get("/AddExpenses", async (req, res) => {
  try {
    let connection = await mongoClient.connect(URL);
    let db = connection.db("money");
    let addexpenses = await db.collection("addexpenses").find().toArray();
    await connection.close();
    res.json(addexpenses);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.delete("/AddExpenses/:id", async (req, res) => {
  try {
    let connection = await mongoClient.connect(URL);
    let db = connection.db("money");
    await db
      .collection("addexpenses")
      .deleteOne({ _id: mongodb.ObjectId(req.params.id) });
    await connection.close();
    res.json({ message: "Expenses data deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.listen(process.env.PORT || 3002, () => {
  console.log("webserver on");
});
