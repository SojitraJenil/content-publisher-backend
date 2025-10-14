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
app.use((0, cors_1.default)({
    origin: 'https://content-publisher-backend-blfn.onrender.com',
    credentials: true
}));
app.use(express_1.default.json());
app.use('/api/auth', authRoutes_1.default);
app.use('/api/publications', publicationRoutes_1.default);
app.get('/', (req, res) => {
    res.send('Welcome to the API');
});
exports.default = app;
