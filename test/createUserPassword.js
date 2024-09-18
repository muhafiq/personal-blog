import bcrypt from "bcrypt";

async function main() {
  const password = "@Rahasiabanget18";

  const salt = await bcrypt.genSalt();
  const hashed = await bcrypt.hash(password, salt);

  console.log(hashed);
}

main();
