import { faker } from "@faker-js/faker";
import prismaClient from "../src/config/database.js";

// const generateHTMLContent = () => {
//   let content = "";
//   const paragraphs = Math.floor(Math.random() * (100 - 50 + 1)) + 50;

//   for (let i = 0; i < paragraphs; i++) {
//     content += `<p>${faker.lorem.paragraph()}</p>`;
//     if (faker.datatype.boolean()) {
//       content += `<a href="${faker.internet.url()}">${faker.lorem.sentence()}</a>`;
//     }
//   }

//   return content;
// };

const generateHTMLContent = () => {
  const elements = ["img", "h1", "h2", "h3", "p", "a", "button"];
  const content = [];
  const numElements = Math.floor(Math.random() * 15) + 5;

  for (let i = 0; i < numElements; i++) {
    const randomElement = faker.helpers.arrayElement(elements);

    switch (randomElement) {
      case "img":
        content.push(
          `<img src="${faker.image.url()}" alt="${faker.lorem.words(3)}" />`
        );
        break;
      case "h1":
      case "h2":
      case "h3":
        content.push(
          `<${randomElement}>${faker.lorem.sentence()}</${randomElement}>`
        );
        break;
      case "p":
        content.push(`<p>${faker.lorem.paragraph()}</p>`);
        break;
      case "a":
        content.push(
          `<a href="${faker.internet.url()}">${faker.lorem.sentence()}</a>`
        );
        break;
      case "button":
        content.push(`<button>${faker.lorem.words(2)}</button>`);
        break;
    }
  }

  return content.join("\n");
};

const createSamplePosts = async (numPosts, imagesPerPost) => {
  for (let i = 0; i < numPosts; i++) {
    const post = await prismaClient.post.create({
      data: {
        title: faker.lorem.sentence(),
        slug: faker.lorem.slug(),
        content: generateHTMLContent(),
        category: faker.lorem.word(),
        thumbnail: faker.image.url(),
        postImages: {
          create: Array.from({ length: imagesPerPost }, () => ({
            fileName: faker.image.url(),
          })),
        },
      },
    });
    console.log(`Created Post with ID: ${post.postId}`);
  }
};

await createSamplePosts(5, 2);
