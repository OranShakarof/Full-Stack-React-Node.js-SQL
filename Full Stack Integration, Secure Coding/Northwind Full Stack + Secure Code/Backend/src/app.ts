require("dotenv").config()
import express from "express";
import appConfig from "./2-utils/app-config";
import productsController from "./6-controllers/products-controller"
import authController from "./6-controllers/auth-controller"
import verbose from "./4-middleware/verbose";
import doorman from "./4-middleware/doorman";
import shabbat from "./4-middleware/shabbat-forbidden";
import catchAll from "./4-middleware/catch-all";
import routeNotFound from "./4-middleware/route-not-found";
import expressFileUpload from "express-fileupload";
import expressRateLimit from "express-rate-limit"
import cors from "cors";
import sanitize from "./4-middleware/sanitize";


// Create the server:
const server = express();

// Rate Limit: 
server.use(expressRateLimit({
    windowMs: 1000, // Time window
    max: 2 // Max request allowed in that time window
}));

// Enable cors: 
server.use(cors()); // Enable cors for any frontend.
// server.use(cors({ origin: "http://mysite.com" })); // Enable cors for that specific frontend;
// server.use(cors({ origin: ["http://mysite.com", "http://yoursite.com", "http://othersite.com"] })); // Enable cors for more then 1 website frontend;

// Support request.body as JSON:
server.use(express.json());

server.use(sanitize)

// Support file upload:
server.use(expressFileUpload());

// Connect app-level middleware:
server.use(verbose);
// server.use(doorman);
server.use(shabbat);

// Route requests to our controller: 
server.use("/api", productsController);
server.use("/api", authController);

// Route Not Found:
server.use("*",routeNotFound);

// Catch all middleware: 
server.use(catchAll);

// Run Server: 
server.listen(appConfig.port, () => console.log("Listening on http://localhost:" + appConfig.port));