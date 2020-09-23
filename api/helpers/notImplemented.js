const NOT_IMPLEMENTED = (req, res) =>
  res.status(500).json({ message: "NOT IMPLEMENTED" });
module.exports = NOT_IMPLEMENTED;
