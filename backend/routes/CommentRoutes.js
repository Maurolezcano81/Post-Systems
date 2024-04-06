import express from 'express';
import CommentControllers from "../controllers/CommentController.js";
import authMiddlewares from '../middlewares/Auth.js';

const router = express.Router();

router.patch('/:id/comment',authMiddlewares.checkLoggin ,CommentControllers.createComment);
router.delete('/:id/comment',authMiddlewares.checkLoggin ,CommentControllers.deleteComment);

export default router;