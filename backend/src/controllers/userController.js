const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


//register User
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user exists
    const userExists = await pool.query('SELECT * FROM users WHERE email = $1 OR username = $2', [email, username]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: "Username or Email already taken" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Matches your table: user_id, password_hash
    const newUser = await pool.query(
      'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING user_id, username, email',
      [username, email, hashedPassword]
    );

    res.status(201).json({ message: "User registered successfully", user: newUser.rows[0] });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


//Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    //Find user by email
    const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userResult.rows.length === 0) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    const user = userResult.rows[0];

    // Compare and verify passwords 
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }


    // Create JWT Token (Valid for 24 hours)
    const token = jwt.sign(
      { userId: user.user_id 

      }, // Payload
      process.env.JWT_SECRET,   // Secret Key
      { expiresIn: '1h' }      // Expiration
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.user_id,
        username: user.username,
        email: user.email
      }
    });

  } catch (error) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
};

//logout User


//delete user
const deleteUser = async (req,res) =>{
    const user_id = req.user;

try {
    const result = await pool.query(
        'DELETE FROM users WHERE user_id = $1', [user_id]
    );
if (result.rowCount === 0){
    return res.status(404).json ({
        error: "User Not Found"
    });
}    

res.json({
    message:"User Account Deleted Successfully"
});

} catch (error) {
    console.error(error.message);
    res.status(500).json({
        error: "Internal Server Error"
    });
    
}    
};

module.exports = { 
    registerUser,
    loginUser,
    deleteUser
 };