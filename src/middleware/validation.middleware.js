export default function validation(err, req, res, next) {
  const data = req.body["event"];
  console.log(data);
  if (data["shopUid"] && typeof data["shopUid"] !== "string") {
    res.status(400).json({ error: "not valid" });
  }
  if (!data["action"] || !data["plu"]) {
    res.status(400).json({ error: "not valid" });
  }
  if (typeof data["action"] !== "string" || typeof data["plu"] !== "string") {
    res.status(400).json({ error: "not valid" });
  }
  next();
}
