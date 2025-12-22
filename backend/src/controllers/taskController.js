import db from '../db/db.js';
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export const viewAllMarks = async (req, res) => {
  const { teacher_id } = req.params;

  try {
    const data = await db("marks as m").select(
      "m.student_id",
      "m.telugu",
      "m.hindi",
      "m.english",
      "m.maths",
      "m.science",
      "m.social",
      "m.total",
      "m.percentage"
    ).join('students as s','m.student_id','s.roll_no').whereIn('s.class_id', function(){
      this.select('id').from('classes').where('class_teacher_id', teacher_id);
    }).orderBy("m.student_id", "asc");
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getIndividualMarks = async (req, res) => {
  const { student_id } = req.params;

  if (!student_id) {
    return res.status(400).json({ error: "student_id required" });
  }

  try {
    const data = await db("marks").select(
      "student_id",
      "telugu",
      "hindi",
      "english",
      "maths",
      "science",
      "social",
      "total",
      "percentage"
    ).where({ student_id: student_id }).first();
    if (!data) {
      return res.status(404).json({ error: "No records found" });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const updateMarks = async(req,res) => {
  const {student_id} = req.params;
  let {telugu, hindi, english, maths, science, social} = req.body;

  if(!student_id){
    return res.status(400).json({error: 'student_id required'});
  }

  try{
    const teluguNum = Number(telugu) || 0;
    const hindiNum = Number(hindi) || 0;
    const englishNum = Number(english) || 0;
    const mathsNum = Number(maths) || 0;
    const scienceNum = Number(science) || 0;
    const socialNum = Number(social) || 0;

    const total = teluguNum + hindiNum + englishNum + mathsNum + scienceNum + socialNum;
    const percentage = Math.round((total / 600) * 100);

    const data = await db('marks').where({student_id: student_id}).update({
      telugu: teluguNum,
      hindi: hindiNum,
      english: englishNum,
      maths: mathsNum,
      science: scienceNum,
      social: socialNum,
      total,
      percentage
    });

    if(data === 0){
      return res.status(404).json({error: 'No marks record found for this student'});
    }

    return res.status(200).json({success: true, message: 'Marks updated successfully'});
  } catch (e){
    console.error('Update marks error:', e.message);
    return res.status(500).json({error: 'Internal server error', details: e.message});
  }
}