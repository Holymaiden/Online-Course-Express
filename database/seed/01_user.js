const faker = require("faker");

exports.seed = async function (knex) {
  await knex("users").del();

  await knex("users").insert([
    {
      id: 1,
      username: "fihaa",
      email: "fihaa@gmail.com",
      password: "$2b$10$IzU2QhBUZlOuQDonBl8pHu21haXy6ZTRGS2JDGAmESXvBBNrlbyly",
    },
    {
      id: 2,
      username: "user",
      email: "user@gmail.com",
      password: "$2b$10$c3siYJ3H/qXaYI/.bjP2tuYwA5T/QBdKYWtBqripwI0OfBQ8u9mR.",
    },
  ]);

  // for (let index = 3; index <= 2003; index++) {
  // 	await knex("users").insert(createUserFaker(index));
  // }
};

// const createUserFaker = (id) => ({
// 	id: id,
// 	username: faker.name.findName(),
// 	email: faker.internet.email(),
// 	password: "$2a$12$jqU0F.lXN2x2FZFTExLygO.ku4Pay8k3usPLTS7RF5XgTUE.h7MUC",
// 	displayName: faker.name.firstName(),
// 	avatar: faker.image.avatar(),
// });
