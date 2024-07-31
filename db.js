import "dotenv/config";
import pg from "pg";

const dbPool = new pg.Pool({
  connectionString: process.env.DATABASE_CONNECTION_STRING,
});

const db = {
  categories: {
    getAll: async () => {
      const { rows } = await dbPool.query("SELECT * FROM categories");
      return rows;
    },
    getOfId: async (id) => {
      const { rows } = await dbPool.query(
        "SELECT * FROM categories WHERE id=$1",
        [id]
      );
      return rows[0];
    },
    getAllOfIds: async (ids) => {
      const { rows } = await dbPool.query(
        "SELECT * FROM categories WHERE id=ANY($1::int[])",
        [ids]
      );
      return rows;
    },
    insert: (name, description) => {
      return dbPool.query(
        "INSERT INTO categories(name,description) VALUES($1,$2)",
        [name, description]
      );
    },
  },
  instruments: {
    getAll: async () => {
      const { rows } = await dbPool.query(
        `
        SELECT i.id, i.name, i.description, i.price, i.count, i.img_url, i.category_id,
          c.name AS category_name, c.description AS category_description
        FROM instruments AS i
        INNER JOIN categories AS c ON c.id=i.category_id
        `
      );
      return rows;
    },
    getOfId: async (id) => {
      const { rows } = await dbPool.query(
        `
        SELECT i.id, i.name, i.description, i.price, i.count, i.img_url, i.category_id,
          c.name AS category_name, c.description AS category_description
        FROM instruments AS i
        INNER JOIN categories AS c ON c.id=i.category_id
        WHERE id=$1
        `,
        [id]
      );
      return rows[0];
    },
    getAllOfIds: async (ids) => {
      const { rows } = await dbPool.query(
        `
        SELECT i.id, i.name, i.description, i.price, i.count, i.img_url, i.category_id,
          c.name AS category_name, c.description AS category_description
        FROM instruments AS i
        INNER JOIN categories AS c ON c.id=i.category_id
        WHERE id=ANY($1)
        `,
        [ids]
      );
      return rows;
    },
    getAllOfCategoryIds: async (categoryIds) => {
      const { rows } = await dbPool.query(
        `
        SELECT i.id, i.name, i.description, i.price, i.count, i.img_url, i.category_id,
          c.name AS category_name, c.description AS category_description
        FROM instruments AS i
        INNER JOIN categories AS c ON c.id=i.category_id
        WHERE i.category_id=ANY($1)
        `,
        [categoryIds]
      );
      return rows;
    },
  },
  users: {
    getOfId: async (id) => {
      const { rows } = await dbPool.query("SELECT * FROM users WHERE id=$1", [
        id,
      ]);
      return rows[0];
    },
    getOfUsername: async (username) => {
      const { rows } = await dbPool.query(
        "SELECT * FROM users WHERE username=$1",
        [username]
      );
      return rows[0];
    },
  },
};

export { dbPool, db };
