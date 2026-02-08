

// import bcrypt from 'bcryptjs'; // <- use bcryptjs

// export const hashPassword = async (password) => {
//   const saltRounds = 10;
//   return await bcrypt.hash(password, saltRounds);
// };

// export const comparePassword = async (password, hash) => {
//   return await bcrypt.compare(password, hash);
// };


import bcrypt from 'bcryptjs';

export const hashPassword = async (password) => {
  const saltRounds = 10;
  const hashed = await bcrypt.hash(password, saltRounds);
  return hashed;
};

export const comparePassword = async (password, hash) => {
  const isMatch = await bcrypt.compare(password, hash);
  return isMatch;
};
