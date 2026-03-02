import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { restrictTo } from '../middleware/roleMiddleware.js';
import {viewAllMarks, getIndividualMarks, updateMarks, viewSchedule} from '../controllers/taskController.js';

const router = express.Router();

router.get("/view-all-marks/:teacher_id", protect, restrictTo("admin","teacher"), viewAllMarks);
router.get("/individual-marks/:student_id", protect,restrictTo("admin","teacher","student"), getIndividualMarks);
router.get("/parent/individual-marks", protect,restrictTo("admi","parent"), getIndividualMarks);
router.put("/update-marks/:student_id", updateMarks);

router.get("/view-schedule/:teacher_id", protect, restrictTo("admin","teacher"), viewSchedule)

export default router;