import app from "./src/app.js";
import 'dotenv/config';
import { connectDB } from "./src/common/configs/db.js";
import { createServer } from 'node:http'

await connectDB();

const PORT = process.env.PORT || 5000;

const server = createServer(app)

server.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});