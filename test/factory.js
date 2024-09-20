const faker = require("@faker-js/faker").faker;
const PrismaClient = require("@prisma/client").PrismaClient;

const prismaClient = new PrismaClient();

const generateHTMLContent = () => {
  let content = "";
  const paragraphs = Math.floor(Math.random() * (100 - 50 + 1)) + 50;

  for (let i = 0; i < paragraphs; i++) {
    content += `<p>${faker.lorem.paragraph()}</p>`;
    if (faker.datatype.boolean()) {
      content += `<a href="${faker.internet.url()}">${faker.lorem.sentence()}</a>`;
    }
  }

  return content;
};

function getRandomItem(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

const createSampleCategory = async () => {
  const categories = [
    { name: "Networking" },
    { name: "Web Development" },
    { name: "Security" },
    { name: "Big Data" },
    { name: "Design" },
  ];

  let catIdList = [];

  for (let i = 0; i < categories.length; i++) {
    const category = await prismaClient.category.create({
      data: { name: categories[i].name },
    });

    catIdList.push(category.catId);
  }

  return catIdList;
};

const createSamplePosts = async (numPosts, imagesPerPost) => {
  const catIdList = await createSampleCategory();

  for (let i = 0; i < numPosts; i++) {
    const post = await prismaClient.post.create({
      data: {
        title: faker.lorem.sentence(),
        slug: faker.lorem.slug(),
        content: generateHTMLContent(),
        catId: getRandomItem(catIdList),
        thumbnail: faker.image.url(),
        postImages: {
          create: Array.from({ length: imagesPerPost }, () => ({
            fileName: faker.image.url(),
          })),
        },
        draft: Math.random() >= 0.5,
      },
    });
    console.log(`Created Post with ID: ${post.postId}`);
  }
};

createSamplePosts(20, 2);
