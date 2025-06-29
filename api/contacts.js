const express = require("express");
const router = express.Router();

const {
  getAllContacts,
  getContact,
  initiateContact,
  patchContact,
  putContact,
  deleteContact,
  patchFavorite,
} = require("../controllers/contacts/index");

router.get("/", getAllContacts);
router.get("/:id", getContact);
router.post("/", initiateContact);
router.patch("/:id", patchContact);
router.put("/:id", putContact);
router.delete("/:id", deleteContact);
router.patch("/:id/favorite", patchFavorite);

module.exports = router;
