import { Request, Response } from 'express';
import Publication from '../models/Publication';

interface AuthRequest extends Request {
    user?: any;
}

export const getPublications = async (req: AuthRequest, res: Response) => {
    const publications = await Publication.find({ user: req.user._id });
    res.json(publications);
};

export const createPublication = async (req: AuthRequest, res: Response) => {
    const { title, content, status } = req.body;
    const publication = await Publication.create({
        user: req.user._id,
        title,
        content,
        status,
    });
    res.status(201).json(publication);
};

export const updatePublication = async (req: AuthRequest, res: Response) => {
    const publication = await Publication.findById(req.params.id);
    if (!publication) return res.status(404).json({ message: 'Publication not found' });

    if (publication.user.toString() !== req.user._id.toString())
        return res.status(403).json({ message: 'Not authorized' });

    const { title, content, status } = req.body;
    publication.title = title || publication.title;
    publication.content = content || publication.content;
    publication.status = status || publication.status;

    const updated = await publication.save();
    res.json(updated);
};

export const deletePublication = async (req: AuthRequest, res: Response) => {
    const publication: any = await Publication.findById(req.params.id);
    if (!publication) return res.status(404).json({ message: 'Publication not found' });

    if (publication.user.toString() !== req.user._id.toString())
        return res.status(403).json({ message: 'Not authorized' });

    await publication.remove();
    res.json({ message: 'Publication deleted' });
};
