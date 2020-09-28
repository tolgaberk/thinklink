function returnInvalidObjectIdError(res) {
  res.status(500).json({ error: "Invalid Object Id" });
}
module.exports = returnInvalidObjectIdError;
