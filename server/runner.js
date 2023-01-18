var model = require("./models.js");

let derp = async (id) => {
  let info = await model.getSeriesInfo(id);
  console.log(info);
};

derp();
