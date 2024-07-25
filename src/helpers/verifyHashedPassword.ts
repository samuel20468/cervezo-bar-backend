import * as bcrypt from 'bcrypt';

const verifyPassword = async (
  inputPassword: string,
  hashedPassword: string,
): Promise<boolean> => {

  const isMatch = await bcrypt.compare(inputPassword, hashedPassword);
  
  return isMatch;
};

export default verifyPassword;
