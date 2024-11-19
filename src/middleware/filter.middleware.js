const options = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  fractionalSecondDigits: 3,
  hour12: false,
  timeZone: "Europe/Samara",
};

export function filterMiddleware(req, res, next) {
  const plu = req.query.plu;
  const shopUid = req.query.shopUid;
  const action = req.query.action;
  const createdAt = req.query.date;
  const filterObj = {};
  if (plu) filterObj.plu = plu;
  if (shopUid) filterObj.shopUid = shopUid;
  if (action) filterObj.action = action;
  if (createdAt) {
    const dateRanges = createdAt.split("-");

    filterObj.createdAt = dateRanges.map((date) => {
      const [day, month, year] = date.split(".");

      const dateObj = new Date(`${year}-${month}-${day}T00:00:00`);

      const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };

      const formDate = new Intl.DateTimeFormat("en-GB", options).format(
        dateObj,
      );

      const [formattedDay, formattedMonth, formattedYear] = formDate
        .slice(0, 10)
        .split("/");
      const time = formDate.split(",")[1].trim();

      return `${formattedYear}-${formattedMonth}-${formattedDay} ${time} +0400`;
    });
  }

  req["filterParams"] = filterObj;
  next();
}
