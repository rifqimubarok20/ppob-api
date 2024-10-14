const express = require("express");
const membershipRoutes = require("./routes/membershipRoutes");
const informationRoutes = require("./routes/informationRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const { swaggerUi, swaggerDocs } = require("./swagger");
require("dotenv").config();

const app = express();
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/api", membershipRoutes);
app.use("/api", informationRoutes);
app.use("/api", transactionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
