const router = require("express").Router();
const {
  checkAccountId,
  checkAccountNameUnique,
  checkAccountPayload,
} = require("./accounts-middleware");
const accountsModel = require("./accounts-model");

router.get("/", async (req, res, next) => {
  // KODLAR BURAYA
  try {
    let accounts = await accountsModel.getAll();
    res.json(accounts);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", checkAccountId, async (req, res, next) => {
  try {
    res.json(req.currentAccount);
  } catch (error) {
    next(error);
  }
  // KODLAR BURAYA
});

router.post(
  "/",
  checkAccountPayload,
  checkAccountNameUnique,
  async (req, res, next) => {
    try {
      let { name, budget } = req.body;
      let created = await accountsModel.create({ name: name, budget: budget });
      res.status(201).json(created);
    } catch (error) {
      next(error);
    }
    // KODLAR BURAYA
  }
);

router.put(
  "/:id",
  checkAccountId,
  checkAccountNameUnique,
  checkAccountPayload,
  async (req, res, next) => {
    try {
      let { name, budget } = req.body;
      let updatedAccount = await accountsModel.updateById(req.params.id, {
        name: name,
        budget: budget,
      });
      res.status(200).json(updatedAccount);
    } catch (error) {
      next(error);
    }
    // KODLAR BURAYA
  }
);

router.delete("/:id", checkAccountId, async (req, res, next) => {
  // KODLAR BURAYA
  try {
    await accountsModel.deleteById(req.params.id);
    res.json({ message: `${req.params.id}ID'li kayıt silindi` });
  } catch (error) {
    next(error);
  }
});

router.use((err, req, res, next) => {
  // eslint-disable-line
  // KODLAR BURAYA
  res.status(err.status || 400).json({
    message: err.message,
    customMessage: "Hata oluştu",
  });
});

module.exports = router;
