"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const publicationController_1 = require("../controllers/publicationController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.use(authMiddleware_1.protect);
router.get('/', publicationController_1.getPublications);
router.post('/', publicationController_1.createPublication);
router.put('/:id', publicationController_1.updatePublication);
router.delete('/:id', publicationController_1.deletePublication);
exports.default = router;
