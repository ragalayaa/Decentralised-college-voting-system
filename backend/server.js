const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const studentRoutes = require("./routes/students");
const adminRoutes = require("./routes/admin");
const electionRoutes = require("./routes/elections");
const candidateRoutes = require("./routes/candidates");
const voteRoutes = require("./routes/votes");
const grievanceRoutes = require("./routes/grievances");
const pollRoutes = require("./routes/polls");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/students", studentRoutes);
app.use("/api/elections", electionRoutes);
app.use("/api/candidates", candidateRoutes);
app.use("/api/votes", voteRoutes);
app.use("/api/grievances", grievanceRoutes);
app.use("/api/polls", pollRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
