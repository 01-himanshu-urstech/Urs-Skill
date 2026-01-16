import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10;

/**
 * Hash plain text password
 */
export const hashPassword = async (plainPassword) => {
  try {
    if (!plainPassword) {
      throw new Error('Password is required for hashing');
    }

    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hash = await bcrypt.hash(plainPassword, salt);

    return hash;
  } catch (error) {
    console.error('❌ Error hashing password:', error.message);
    throw error;
  }
};

/**
 * Compare plain password with hashed password
 */
export const comparePassword = async (plainPassword, hashedPassword) => {
  try {
    if (!plainPassword || !hashedPassword) {
      throw new Error('Both passwords are required for comparison');
    }

    return await bcrypt.compare(plainPassword, hashedPassword);
  } catch (error) {
    console.error('❌ Error comparing password:', error.message);
    throw error;
  }
};
