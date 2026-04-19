import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { quizHint, chat } from '../controllers/aiController.js';

const router = Router();

router.post('/quiz-hint', requireAuth, quizHint);
router.post('/chat',      requireAuth, chat);

export default router;
