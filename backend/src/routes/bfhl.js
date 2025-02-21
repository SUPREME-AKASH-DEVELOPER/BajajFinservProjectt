import { Router } from 'express';
import { getOperationCode, processArray } from '../controllers/bfhl.js';

const router = Router();

router.get('/', getOperationCode);
router.post('/', processArray);

export { router };