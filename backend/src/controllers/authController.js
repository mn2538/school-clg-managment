import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "A_long_string_with_some_CAPITALS";

/**
 * MOCK USERS (in-memory)
 */
const mockUsers = [
  {
    id: 1,
    username: "mn",
    email: "mohant@gmail.com",
    password_hash: bcrypt.hashSync("hthththt", 10),
    role: "teacher",
  },
  {
    id: 2,
    username: "mns",
    email: "mohans@gmail.com",
    password_hash: bcrypt.hashSync("hshshshs", 10),
    role: "student",
  },
  {
    id: 3,
    username: "mnp",
    email: "mohanp@gmail.com",
    password_hash: bcrypt.hashSync("hphphphp", 10),
    role: "parent",
  },
];

/**
 * CHECK EMAIL
 */
export const checkEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "send the email." });
  }

  const existing = mockUsers.find((user) => user.email === email);

  return res.status(200).json({ exists: !!existing });
};

/**
 * REGISTER USER (mock)
 */
export const registerUser = async (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !password || !email || !role) {
    return res.status(400).json({ error: "all details are required." });
  }

  const emailExists = mockUsers.find((u) => u.email === email);
  if (emailExists) {
    return res.status(400).json({ error: "email already in use." });
  }

  const usernameExists = mockUsers.find((u) => u.username === username);
  if (usernameExists) {
    return res.status(409).json({ error: "Username already taken." });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: mockUsers.length + 1,
    username,
    email,
    password_hash: hashedPassword,
    role,
  };

  mockUsers.push(newUser);

  return res.status(201).json({
    message: "User registered successfully",
    userId: newUser.id,
  });
};

/**
 * LOGIN USER
 */
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = mockUsers.find((u) => u.email === email);
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: "1d" }
  );

  return res.status(200).json({
    message: "Login successful",
    token,
    user: {
      id: user.id,
      username: user.username,
      role: user.role,
    },
  });
};
