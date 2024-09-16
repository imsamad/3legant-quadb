const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');
const bcryptjs = require('bcryptjs');
const { titleImages } = require('./seedImages');

// @ts-ignore
const prisma = new PrismaClient();

async function generateCategories() {
  const categories = [];

  for (let i = 0; i < 5; i++) {
    categories.push({
      title: faker.commerce.department(),
    });
  }

  // Insert categories into the database
  await prisma.category.createMany({
    data: categories,
  });

  console.log('100 categories have been added.');
}

async function main() {
  const salt = await bcryptjs.genSalt(parseInt(process.env.SALT_SIZE!) || 10);

  const password = bcryptjs.hashSync('Password@123', salt);

  await generateCategories();

  const categories = (await prisma.category.findMany({})).map(
    ({ id }: any) => id
  );

  // Seed Users
  await prisma.user.createMany({
    data: [
      {
        email: `user@gmail.com`,
        password,

        phoneNumber: faker.datatype.number({
          min: 1000000000,
          max: 9999999999,
        }),
        username: faker.internet.userName(),
        fullName: faker.name.fullName(),
        image: faker.image.avatar(),
        emailVerifiedAt: new Date(),
        phoneNumberVerifiedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: `admin@gmail.com`,
        password,
        phoneNumber: faker.datatype.number({
          min: 1000000000,
          max: 9999999999,
        }),
        username: faker.internet.userName(),
        fullName: faker.name.fullName(),
        image: faker.image.avatar(),
        emailVerifiedAt: new Date(),
        phoneNumberVerifiedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        role: 'ADMIN',
      },
    ],
  });
  const users = await prisma.user.findMany();

  const productsSeed = () => ({
    data: {
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: parseFloat(faker.commerce.price()),

      medias: faker.helpers
        .arrayElements(
          titleImages,
          faker.datatype.number({ min: 1, max: titleImages.length / 4 })
        )
        .map((url: string, index: number) => ({
          url,
          isDefault: false,
          orderNo: index,
          type: 'IMAGE',
        })),
      categoryId: faker.helpers.arrayElement(categories),
      slug: faker.lorem.slug(),
      quantityInStock: faker.datatype.number({ min: 1, max: 100 }),
      userId: faker.helpers.arrayElement(users).id,
      status: faker.helpers.arrayElement(['PUBLISHED']),
    },
  });

  // Seed Products
  await Promise.all(
    Array.from({ length: 15 }).map(() => prisma.product.create(productsSeed()))
  );

  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
