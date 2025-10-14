"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const publicationRoutes_1 = __importDefault(require("./routes/publicationRoutes"));
dotenv_1.default.config();
(0, db_1.default)();
const app = (0, express_1.default)();
const allowedOrigins = ['https://content-publisher-assessment.vercel.app'];
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        // allow requests with no origin (like Postman)
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true // <-- important if frontend sends cookies/JWT in headers
}));
app.use(express_1.default.json());
app.use('/api/auth', authRoutes_1.default);
app.use('/api/publications', publicationRoutes_1.default);
app.get('/', (req, res) => {
    res.send('Welcome to the API');
});
exports.default = app;
