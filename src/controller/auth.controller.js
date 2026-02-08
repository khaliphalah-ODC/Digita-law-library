import bookStoreDB from '../model/connect.js';
import { hashPassword, comparePassword } from '../utils/password.js';
import jwt from 'jsonwebtoken';
import {
  userQuery,
  createUserQuery,
  findUserByEmailQuery
} from '../model/auth.model.js';

//const JWT_SECRET = process.env.JWT_SECRET_KEY

const JWT_SECRET = process.env.JWT_SECRET_KEY || 'devsecret123';



export const CreateUsersTable = () => {
  bookStoreDB.run(userQuery, (err) => {
    if (err) {
      console.error('Error creating users table:', err.message);
    } else {
      console.log('Users table created or already exists');
    }
  });
};



// export const signupUser = async (req, res) => {
//   const { full_name, email, password, role } = req.body;

//   if (!full_name || !email || !password) {
//     return res.status(400).json({ message: 'Full name, email, and password are required' });
//   }

//   bookStoreDB.get(findUserByEmailQuery, [email], async (err, row) => {
//     if (err) return res.status(500).json({ message: err.message });
//     if (row) return res.status(400).json({ message: 'Email already in use' });

//     try {
//       const hashedPassword = await hashPassword(password);
//       console.log('Hashed:', hashed);

//       bookStoreDB.run(
//         createUserQuery,
//         [full_name, email, hashedPassword, role || 'student'],
//         function (err) {
//           if (err) return res.status(500).json({ message: 'Failed to create user', error: err.message });

//           res.status(201).json({
//             message: 'User created successfully',
//             data: { id: this.lastID, full_name, email, role: role || 'student' }
//           });
//         }
//       );
//     } catch (error) {
//       res.status(500).json({ message: 'Server error', error: error.message });
//     }
//   });
// };


//regisger/signup user
export const signupUser = async (req, res) => {
  const { full_name, email, password, role } = req.body;

  if (!full_name || !email || !password) {
    return res.status(400).json({ message: 'Full name, email, and password are required' });
  }

  bookStoreDB.get(findUserByEmailQuery, [email], async (err, row) => {
    if (err) return res.status(500).json({ message: err.message });
    if (row) return res.status(400).json({ message: 'Email already in use' });

    try {
      const hashedPassword = await hashPassword(password);
      //console.log('Hashed password:', hashedPassword); // ✅ log correctly

      bookStoreDB.run(
        createUserQuery,
        [full_name, email, hashedPassword, role || 'student'],
        function (err) {
          if (err) return res.status(500).json({ message: 'Failed to create user', error: err.message });

          res.status(201).json({
            message: 'User created successfully',
            data: { id: this.lastID, full_name, email, role: role,  password_hash: user.password_hash || 'student' }
          });
        }
      );
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });
};


//login user
export const loginUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });

  bookStoreDB.get(findUserByEmailQuery, [email], async (err, user) => {
    if (err) return res.status(500).json({ message: err.message });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await comparePassword(password, user.password_hash);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: { id: user.id, full_name: user.full_name, email: user.email, role: user.role,  password_hash: user.password_hash }
    });
  });
};

//update user
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { full_name, email, password, role } = req.body;

  if (!full_name && !email && !password && !role) {
    return res.status(400).json({ message: 'At least one field is required to update' });
  }

  const hashedPassword = password ? await hashPassword(password) : undefined;

  const query = `
    UPDATE users
    SET full_name = COALESCE(?, full_name),
        email = COALESCE(?, email),
        password_hash = COALESCE(?, password_hash),
        role = COALESCE(?, role)
    WHERE id = ?;
  `;

  bookStoreDB.run(query, [full_name, email, hashedPassword, role, id], function (err) {
    if (err) return res.status(500).json({ message: 'Failed to update user', error: err.message });

    res.status(200).json({
      message: 'User updated successfully',
      data: { id, full_name, email, role }
    });
  });
};

//delete user
export const deleteUser = (req, res) => {
  const { id } = req.params;

  bookStoreDB.run('DELETE FROM users WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).json({ message: 'Failed to delete user', error: err.message });

    res.status(200).json({
      message: 'User deleted successfully',
      data: { id }
    });
  });
};

export const logoutUser = (req, res) => {
  // JWT is stateless; instruct client to delete token
  res.status(200).json({ message: 'Logout successful. Remove token from client.' });
};
