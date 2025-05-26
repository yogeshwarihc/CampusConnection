const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Normalize full name: remove spaces and lowercase
const normalizeName = (name) =>
  name.toLowerCase().replace(/\s+/g, '');

exports.register = async (req, res) => {
  const { fullName, email, usn, admittedYear, password, confirmPassword } = req.body;

  const errors = {};
  const nameInEmail = normalizeName(fullName);

  const emailRegex = new RegExp(`^${admittedYear}(cs|is|ec|ee|me|cv)_${nameInEmail}_[a-zA-Z]@nie\\.ac\\.in$`);
  

  // Email must start with admitted year
  if (!email.startsWith(admittedYear)) {
    errors.email = 'Email must start with the admitted year.';
  }

  // Email format validation
  if (!emailRegex.test(email)) {
    errors.email = `Email format is invalid. Expected: ${admittedYear}XX_${nameInEmail}_section@nie.ac.in`;
  }

  // USN format validation
  // USN format validation (strict)
const usnRegex = new RegExp(`^4NI${admittedYear.slice(2)}(CS|IS|EC|EE|ME|CV)[0-9]{3}$`, 'i');

if (!usnRegex.test(usn)) {
  errors.usn = `USN format is invalid. Expected: 4NI${admittedYear.slice(2)}<BRANCH><ROLL>, e.g., 4NI22IS001`;
}


  // Passwords match
  if (password !== confirmPassword) {
    errors.password = 'Passwords do not match.';
  }

  // If errors exist, return them
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      email,
      usn,
      admittedYear,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};