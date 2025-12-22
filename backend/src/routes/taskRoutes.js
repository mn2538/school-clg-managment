import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { restrictTo } from '../middleware/roleMiddleware.js';
import {viewAllMarks, getIndividualMarks, updateMarks} from '../controllers/taskController.js';

const router = express.Router();

router.get("/view-all-marks/:teacher_id", protect, restrictTo("admin","teacher"), viewAllMarks);
router.get("/individual-marks/:student_id", getIndividualMarks);
router.put("/update-marks/:student_id", updateMarks);

export default router;