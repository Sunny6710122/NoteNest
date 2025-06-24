const ConnMongoDB = require("./db");
const express = require("express");
const User = require("./models/User");
const Notes = require("./models/Notes");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
var cors = require("cors");
const app = express();
const port = 5000;

const JWT_SECRET = "SunnyAndaniisGoodBoy";

ConnMongoDB();
app.use(cors())
app.use(express.json());

app.post(
  "/createuser",
  [
    body("Name", "Enter a valid name").isLength({ min: 3 }),
    body("Email", "Enter a valid email").isEmail(),
    body("Password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.Email });
      if (user) {
        return res
          .status(400)
          .json({ success,error: "Sorry a user with this email already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.Password, salt);

      user = await User.create({
        Name: req.body.Name,
        Password: secPass,
        Email: req.body.Email,
      });
      console.log("fgfdgfd");

      const data = {
        user1: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      console.log(authtoken);
      success = true;
      // res.json(user)
      res.json({ success,authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error occured");
    }

    //   .then(user => res.json(user))
    //   .catch(err=> {console.log(err)
    // res.json({error: 'Please enter a unique value for email', message: err.message})})
    // console.log(req.body);
    // const user = User(req.body);
    // user.save();
  }
);

app.post(
  "/login",
  [
    body("Email", "Enter a valid email").isEmail(),
    body("Password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { Email, Password } = req.body;
    try {
      let user = await User.findOne({ Email });
      if (!user) {
        return res
          .status(400)
          .json({ success: success, error: "Please try to login with correct credentials" });
      }
      console.log("udsdfgd");
      
      const passwordCompare = await bcrypt.compare(Password, user.Password);
      if (!passwordCompare) {
        return res
        .status(400)
        .json({ success: success, error: "Please try to login with correct credentials" });
      }
      success = true;
      const data = {
        user: {
          id: user.id,
        },
      };
      console.log("udsdfgd");
      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({ success: success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

app.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userid = req.user.id;

    const user1 = await User.findById(userid).select("-Password");
    res.send(user1);
  } catch (error) {
    console.log(error.message);

    res.status(500).send("Internal Server Issue");
  }
});

app.get("/fetchnotes", fetchuser, async (req, res) => {
  try {
    const userid1 = req.user.id;
    const notes = await Notes.find({ user: userid1 });
    console.log(notes);

    res.send(notes);
  } catch (error) {
    console.log(error.message);

    res.status(500).send("Internal Server Issue");
  }
});

app.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Enter a valid email").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { title, description, tag } = req.body;
      console.log(title);
      
      const note = new Notes({ title, description, tag, user: req.user.id });
      const savenote = await note.save();

      res.json(savenote);
    } catch (error) {
      console.log(error.message);

      res.status(500).send("Internal Server Issue");
    }
  }
);



app.put('/updatenote/:id', fetchuser, async(req,res)=>{ 
  try {
    const updateNote = {};
    const { title, description, tag } = req.body;
    if(title){updateNote.title = title}
    if(description){updateNote.description = description}
    if(tag){updateNote.tag = description}

    let note = await Notes.findById(req.params.id);

    if(!note)
    {
      res.status(404).send("Not Found");
    }
    
    if(req.user.id !== note.user.toString())
    {
      res.status(401).send("Not Allowed");
    }

    note = await Notes.findByIdAndUpdate(req.params.id, {$set: updateNote}, {new:true});
    res.json({note});

  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Issue");
  }
});





app.delete('/deletenote/:id', fetchuser, async(req,res)=>{ 
  try {

    let note = await Notes.findById(req.params.id);

    if(!note)
    {
      res.status(404).send("Not Found");
    }
    
    if(req.user.id !== note.user.toString())
    {
      res.status(401).send("Not Allowed");
    }
    Notes.findByIdAndUpdate(req.params.id,{},)
    await Notes.findByIdAndDelete(req.params.id,)
    res.send("Deleted");

  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Issue");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
