const db = require("../../data/db-config");
const getAll = () => {
  // db.select("*").from("accounts");
  return db("accounts");
  // KODLAR BURAYA
};

const getById = (id) => {
  return db("accounts")
    .where({ id: Number(id) })
    .first();
  // KODLAR BURAYA
};

const getByName = (name) => {
  return db("accounts").where("name", name).first();
};

const create = async (account) => {
  const id = await db("accounts").insert(account);
  return await getById(id);
  // KODLAR BURAYA
};

const updateById = async (id, account) => {
  await db("accounts").where("id", Number(id)).update(account);
  return await getById(id);
  // KODLAR BURAYA
};

const deleteById = (id) => {
  return db("accounts").where("id", id).del();
  // KODLAR BURAYA
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
  getByName,
};
