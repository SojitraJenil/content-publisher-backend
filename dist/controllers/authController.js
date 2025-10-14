"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const User_1 = __importDefault(require("../models/User"));
const generateToken_1 = __importDefault(require("../utils/generateToken"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const userExists = yield User_1.default.findOne({ email });
    if (userExists)
        return res.status(400).json({ message: 'User already exists' });
    const user = yield User_1.default.create({ email, password });
    res.status(201).json({
        _id: user._id,
        email: user.email,
        token: (0, generateToken_1.default)(user._id.toString()),
    });
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield User_1.default.findOne({ email });
    if (user && (yield user.comparePassword(password))) {
        res.json({
            _id: user._id,
            email: user.email,
            token: (0, generateToken_1.default)(user._id.toString()),
        });
    }
    else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
});
exports.login = login;
