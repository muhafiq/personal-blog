import prismaClient from "../src/config/database.js";

const deleteAll = async () => {
  await prismaClient.postImage.deleteMany();
  await prismaClient.post.deleteMany();
  await prismaClient.category.deleteMany();
};

deleteAll();
