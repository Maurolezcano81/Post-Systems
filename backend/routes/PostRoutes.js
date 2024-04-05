import express from 'express';
import PostController from '../controllers/PostController.js';
import authMiddlewares from '../middlewares/Auth.js';

const router = express.Router();

// AUTH
router.post('/',authMiddlewares.checkLoggin, PostController.createPost);
router.delete('/:id',authMiddlewares.checkLoggin ,PostController.deletePost);
router.patch('/:id',authMiddlewares.checkLoggin ,PostController.editPost);


// NO AUTH
router.get('/', PostController.showPosts);
router.get('/:id', PostController.showPost);

export default router;