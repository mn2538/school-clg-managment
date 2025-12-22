import axios from 'axios';
import { DataTable } from '../components/DataTable';
import {Modal} from '../components/Modal'
import { useEffect, useState } from 'react';
import './css/MarksPage.css';

export const MarksPage = () => {

    const user = JSON.parse(localStorage.getItem("user"));

    const [marks, setMarks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [formData, setFormData] = useState({
        roll_no: '',
        telugu: '',
        hindi: '',
        english: '',
        maths: '',
        science: '',
        social: '',
        total: ''
    });

    const handleEdit = async (row) => {
        try{
            const token = localStorage.getItem("token");
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/individual-marks/${row.student_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(res.data);
            setFormData({
                roll_no: res.data.student_id,
                telugu: res.data.telugu,
                hindi: res.data.hindi,
                english: res.data.english,
                maths: res.data.maths,
                science: res.data.science,
                social: res.data.social,
                total: res.data.total
            });
      
            setSelectedRow(row);
            setShowModal(true);

        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const fetchMarks = async () => {
            try{
                const token = localStorage.getItem("token");

                const res = await axios.get(`${process.env.REACT_APP_API_URL}/view-all-marks/${user.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setMarks(res.data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchMarks();
    }, []);

    const saveMarks = async (e) => {
        e.preventDefault();

        try{
            const token = localStorage.getItem("token");
            const res = await axios.put(`${process.env.REACT_APP_API_URL}/update-marks/${selectedRow.student_id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(res.data);
            setShowModal(false);
            const updatedRes = await axios.get(`${process.env.REACT_APP_API_URL}/view-all-marks/${user.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setMarks(updatedRes.data);
        } catch (e) {
            console.error("Error saving marks:", e);
            alert("Error saving marks: " + (e.response?.data?.error || e.message));
        }

    }

    return (
        <div>
            <h3>All Student Marks</h3>
            <DataTable data={marks} 
            editable={user && user.role === "teacher"}  
            handleEdit={handleEdit}/>

            <Modal 
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            title = "Edit Marks">
            {selectedRow && (
                <form onSubmit={saveMarks}
                    className="marks-form">
                    Roll. no : <input className="form-row"
                    type="text" 
                    name="roll_no"
                    value={formData.roll_no}
                    disabled
                    />
                    Telugu : <input className="form-row"
                    type="number" 
                    name="telugu"
                    value={formData.telugu}
                    onChange={(e) => setFormData({...formData, telugu: e.target.value})}
                    />
                    hindi : <input className="form-row"
                    type="number" 
                    name="hindi"
                    value={formData.hindi}
                    onChange={(e) => setFormData({...formData, hindi: e.target.value})}
                    />
                    English : <input className="form-row"
                    type="number" 
                    name="english"
                    value={formData.english}
                    onChange={(e) => setFormData({...formData, english: e.target.value})}
                    />
                    Maths : <input className="form-row"
                    type="number" 
                    name="maths"
                    value={formData.maths}
                    onChange={(e) => setFormData({...formData, maths: e.target.value})}
                    />
                    Science : <input className="form-row"
                    type="number" 
                    name="science"
                    value={formData.science}
                    onChange={(e) => setFormData({...formData, science: e.target.value})}
                    />
                    Social : <input className="form-row"
                    type="number" 
                    name="social"
                    value={formData.social}
                    onChange={(e) => setFormData({...formData, social: e.target.value})}
                    />
                    Total : <input className="form-row"
                    type="number" 
                    name="total"
                    value={formData.total}
                    onChange={(e) => setFormData({...formData, total: e.target.value})}
                    disabled 
                    />
                    <button type="submit">Save</button>
                </form>
            )}
            </Modal>
        </div>
    );
};