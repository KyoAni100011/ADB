import express from "express";
import cors from "cors";
import routerUser from "./routes/user.routes.js";
import routerCourse from "./routes/course.routes.js";

const app = express();
const PORT = 3000;

// Middleware setup
app.use(express.json());
app.use(cors());

// Route setup
app.use("/api/v1/user", routerUser);
app.use("/api/v1/course", routerCourse);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
