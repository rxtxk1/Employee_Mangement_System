import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { addLeave, getLeave, getLeaves, getLeaveDetail, updateLeave } from '../controllers/leaveController.js'


const router = express.Router()

router.post('/add', authMiddleware, addLeave)
router.get('/detail/:id', authMiddleware, getLeaveDetail)
router.get('/:id/:role', authMiddleware, getLeave)
router.get('/', authMiddleware, getLeaves) // For admin to get all leaves
router.put('/:id', authMiddleware, updateLeave)

export default router;