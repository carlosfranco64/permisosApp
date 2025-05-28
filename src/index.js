// const app = require("./app");

// const port = process.env.PORT || 3001;

// app.listen(port, () => console.log(`Example app listening on port ${port}!`));

const app = require("./app");

const PORT = process.env.PORT || 3001;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on port ${PORT}`);
});