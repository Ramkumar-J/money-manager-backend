const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const app = express();
const cors = require("cors");
app.use(
  cors(
    {
    origin:["http://localhost:3000","https://visionary-stardust-352866.netlify.app"]
  }
  )
);
app.use(express.json());
const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
const URL =
  "mongodb+srv://ramkumar:admin123@cluster0.5pqfc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

function authenticate(req,res,next){
  if(req.headers.authorization){
    let decode=jwt.verify(req.headers.authorization,"mysecretkey");
    if(decode){
      req.userId=decode.id;
      next();
    }
    else{
      res.status(400).json({message:"Unauthorized"});
    }
  }
  else{
    res.status(400).json({message:"Unauthorized"});
  }
}

// Register
app.post("/register", async (req,res) => {
  try {
    let connection=await mongoClient.connect(URL);
    let db=connection.db("money");
    let salt=bcrypt.genSaltSync(10);
    let hash=bcrypt.hashSync(req.body.password,salt);
    req.body.password=hash;
    await db.collection("register").insertOne(req.body);
    await connection.close();
    res.json({message:"Registered Successfully"});
  } catch (error) {
    res.status(500).json({message:"Something went wrong"});
  }
});

// Login
app.post("/login", async (req,res) => {
  try {
    let connection=await mongoClient.connect(URL);
    let db=connection.db("money");
    let userinfo=await db.collection("register").findOne({email:req.body.email});
    if(userinfo){
      let compare=bcrypt.compareSync(req.body.password,userinfo.password);
      if(compare){
        let token = jwt.sign({name:userinfo.name,id:userinfo._id}, "mysecretkey");
        res.json({jwtToken:token});
        return;
      }
      else{
        res.status(401).json({message:"Credential not found"})
      }
    }
    else{
      res.status(401).json({message:"Credential not found"})
    }
    await connection.close();
    res.json({message:"Login Successfully"});
  } catch (error) {
    res.status(500).json({message:"Something went wrong"});
  }
});

// Homepage
// Daily Plan
app.post("/DailyPlanform",authenticate, async (req, res) => {
  try {
    let connection = await mongoClient.connect(URL);
    let db = connection.db("money");
    req.body.createdBy = req.userId;
    await db.collection("dailyplans").insertOne(req.body);
    await connection.close();
    res.json({ message: "Daily Plan created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.get("/DailyPlans",authenticate, async (req, res) => {
  try {
    let connection = await mongoClient.connect(URL);
    let db = connection.db("money");
    let dailyplans = await db.collection("dailyplans").find({ createdBy: req.userId }).toArray();
    await connection.close();
    res.json(dailyplans);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.delete("/DailyPlans/:id",authenticate, async (req, res) => {
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

app.get("/DailyPlans/:id",authenticate, async (req, res) => {
  try {
    let connection = await mongoClient.connect(URL);
    let db = connection.db("money");
    let dailyplan=await db
      .collection("dailyplans")
      .findOne({ _id: mongodb.ObjectId(req.params.id) });
    await connection.close();
    res.json(dailyplan);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Monthly Plan
app.post("/MonthlyPlanform",authenticate, async (req, res) => {
  try {
    let connection = await mongoClient.connect(URL);
    let db = connection.db("money");
    req.body.createdBy = req.userId;
    await db.collection("monthlyplans").insertOne(req.body);
    await connection.close();
    res.json({ message: "Monthly Plan created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.get("/MonthlyPlans",authenticate, async (req, res) => {
  try {
    let connection = await mongoClient.connect(URL);
    let db = connection.db("money");
    let monthlyplans = await db.collection("monthlyplans").find({ createdBy: req.userId }).toArray();
    await connection.close();
    res.json(monthlyplans);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.delete("/MonthlyPlans/:id",authenticate, async (req, res) => {
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
app.post("/YearlyPlanform",authenticate, async (req, res) => {
  try {
    let connection = await mongoClient.connect(URL);
    let db = connection.db("money");
    req.body.createdBy = req.userId;
    await db.collection("yearlyplans").insertOne(req.body);
    await connection.close();
    res.json({ message: "Yearly Plan created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.get("/YearlyPlans",authenticate, async (req, res) => {
  try {
    let connection = await mongoClient.connect(URL);
    let db = connection.db("money");
    let yearlyplans = await db.collection("yearlyplans").find({ createdBy: req.userId }).toArray();
    await connection.close();
    res.json(yearlyplans);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.delete("/YearlyPlans/:id",authenticate, async (req, res) => {
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
app.post("/AddIncomes",authenticate, async (req, res) => {
  try {
    let connection = await mongoClient.connect(URL);
    let db = connection.db("money");
    req.body.createdBy = req.userId;
    await db.collection("addincomes").insertOne(req.body);
    await connection.close();
    res.json({ message: "Income Added" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.get("/AddIncomes", authenticate ,async (req, res) => {
  try {
    let connection = await mongoClient.connect(URL);
    let db = connection.db("money");
    let addincomes = await db.collection("addincomes").find({ createdBy: req.userId }).toArray();
    await connection.close();
    res.json(addincomes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.delete("/AddIncomes/:id",authenticate, async (req, res) => {
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
app.post("/AddExpenses",authenticate, async (req, res) => {
  try {
    let connection = await mongoClient.connect(URL);
    let db = connection.db("money");
    req.body.createdBy = req.userId;
    await db.collection("addexpenses").insertOne(req.body);
    await connection.close();
    res.json({ message: "Expense Added" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.get("/AddExpenses",authenticate, async (req, res) => {
  try {
    let connection = await mongoClient.connect(URL);
    let db = connection.db("money");
    let addexpenses = await db.collection("addexpenses").find({ createdBy: req.userId }).toArray();
    await connection.close();
    res.json(addexpenses);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.delete("/AddExpenses/:id",authenticate, async (req, res) => {
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

// DailyPlan View
app.post("/DailyPlanView",authenticate, async (req,res) => {
  try {
    let connection=await mongoClient.connect(URL);
    let db=connection.db("money");
    req.body.createdBy = req.userId;
    await db.collection("dailyplanview").insertOne(req.body);
    await connection.close();
    res.json({message:"DailyPlan inserted successfully"});
  } catch (error) {
    res.status(500).json({message:"Something went wrong"});
  }
});

app.get("/DailyPlanView",authenticate, async (req,res) => {
  try {
    let connection=await mongoClient.connect(URL);
    let db=connection.db("money");
    let dailyview=await db.collection("dailyplanview").find({ createdBy: req.userId }).toArray();
    await connection.close();
    res.json(dailyview);
  } catch (error) {
    res.status(500).json({message:"Something went wrong"});
  }
});

const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`webserver on at ${port}`);
});
