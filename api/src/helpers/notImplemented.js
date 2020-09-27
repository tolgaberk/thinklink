const NOT_IMPLEMENTED = (req, res) =>
  res.status(500).json({ message: "NOT IMPLEMENTED", request: req.body });
module.exports = NOT_IMPLEMENTED;
