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
exports.deletePublication = exports.updatePublication = exports.createPublication = exports.getPublications = void 0;
const Publication_1 = __importDefault(require("../models/Publication"));
const getPublications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const publications = yield Publication_1.default.find({ user: req.user._id });
    res.json(publications);
});
exports.getPublications = getPublications;
const createPublication = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content, status } = req.body;
    const publication = yield Publication_1.default.create({
        user: req.user._id,
        title,
        content,
        status,
    });
    res.status(201).json(publication);
});
exports.createPublication = createPublication;
const updatePublication = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const publication = yield Publication_1.default.findById(req.params.id);
    if (!publication)
        return res.status(404).json({ message: 'Publication not found' });
    if (publication.user.toString() !== req.user._id.toString())
        return res.status(403).json({ message: 'Not authorized' });
    const { title, content, status } = req.body;
    publication.title = title || publication.title;
    publication.content = content || publication.content;
    publication.status = status || publication.status;
    const updated = yield publication.save();
    res.json(updated);
});
exports.updatePublication = updatePublication;
const deletePublication = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const publication = yield Publication_1.default.findById(req.params.id);
    if (!publication)
        return res.status(404).json({ message: 'Publication not found' });
    if (publication.user.toString() !== req.user._id.toString())
        return res.status(403).json({ message: 'Not authorized' });
    yield publication.remove();
    res.json({ message: 'Publication deleted' });
});
exports.deletePublication = deletePublication;
