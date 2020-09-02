import bcrypt from "bcrypt";

export async function bcryptPassword(password: string) {
  return await bcrypt.hash(password, 10);
}
