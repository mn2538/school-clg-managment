    import React, {useState} from 'react';
    import { useNavigate } from "react-router-dom";
    import axios from 'axios';
    import { Box, TextField, Button, InputAdornment, IconButton } from '@mui/material';
    import { Visibility, VisibilityOff, Password, Abc } from "@mui/icons-material";

    export const AuthPage = () => {
        const navigate = useNavigate();
        const [formData, setFormData] = useState({
            role: '',
            username: '',
            email: '',
            password: ''
        });

        const [errorMessage, setErrorMessage] = useState("");
        const [successMessage, setSuccessMessage] = useState("");

        const[logData, setLogData] = useState(true);
        const actionLabel = logData ? "Login" : "Register";

        const [showPassword, setShowPassword] = useState(false);

        const[loading, setLoading] = useState(false);

        const checkUserExists = async(e) => {
            const email = e.target.value;
            try{
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/check-email`, {email})

                if(!res.data.exists){
                    setLogData(false);
                } else {
                    setLogData(true);
                }

            } catch (error) {
                console.log(error);
            }
            }

        const handleSubmit = async (e) => {
            e.preventDefault();
            setLoading(true);
            setErrorMessage("");
            setSuccessMessage("");

            try{
                let url = "";
                let payload = {};
                    if(logData){
                        url =  `${process.env.REACT_APP_API_URL}/auth/login`;
                        payload = {
                                email: formData.email,
                                password: formData.password
                            }
                    } else { 
                        url = `${process.env.REACT_APP_API_URL}/auth/register`;
                        payload = {
                            role: formData.role,
                            username: formData.username,
                            email: formData.email,
                            password: formData.password
                        }
                    }
                const res = await axios.post(url, payload);
                // console.log(res.data);

                if (logData) {
                    setSuccessMessage("Login successful!");

                    localStorage.setItem("token", res.data.token);
                    localStorage.setItem("user", JSON.stringify(res.data.user));
                    

                    setLoading(true);
                    
                    setTimeout(() => {
                        navigate("/markspage");
                    }, 1500)

                } else {
                    setTimeout(() => {
                        setLogData(true);
                        setSuccessMessage("Register successful! Please login.");
                        setFormData({
                            role: "",
                            username: "",
                            email: "",
                            password: ""
                        });
                    }, 1000);

                }
            } catch (e) {
                if (e.response) {
                    const backendError = e.response.data.error || "Something went wrong";
                    setErrorMessage(backendError);
                    setSuccessMessage("");
                } else {
                    setErrorMessage("Network error");
                    setSuccessMessage("");
                }
            } finally {
                setLoading(false);
            }
        }

        return (
              <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Box sx={{ boxSizing: "border-box", width: 420, maxWidth: "90%", p: 4, borderRadius: 2, boxShadow: 3, bgcolor: "background.paper" }}>
                <h3 className="title">{logData ? "LOGIN" : "REGISTER"}</h3>
                <form onSubmit={handleSubmit}>
                    {!logData && (
                        <>
                        <select name="role" value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} required>
                            <option value="">Select Role</option>
                            <option value="teacher">Teacher</option>
                            <option value="student">Student</option>
                            <option value="parent">Parent</option>
                        </select>
                        <input className="user-input"
                        type="text" 
                        name="username"
                        placeholder="Enter your preferred Username"
                        value={formData.username}
                        required
                        onChange={(e)=>setFormData({...formData, username: e.target.value})}
                        /></>
                    )}
                    <TextField sx={{mb:2}}
                    type="email" 
                    label="Email"
                    value={formData.email}
                    fullWidth
                    required
                    onClick={() => setSuccessMessage("")}
                    onChange={(e)=>setFormData({...formData, email: e.target.value})}
                    onBlur={checkUserExists}
                    />
                    <TextField sx={{mb:2}}
                    label="Password"
                    type={showPassword ? "text" : "password"} 
                    value={formData.password}
                    fullWidth
                    required
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    slotProps = {{
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                                        { showPassword ? <Abc/> : <Password/> }
                                    </IconButton>
                                </InputAdornment>
                            )
                        }
                    }}
                    />
                    {/* <button type="button" className="password-btn" onClick={() => setShowPassword(!showPassword)}>{showPassword ? "🙈" : "👁️" }</button> */}
                    <Box sx={{mt:"10px", textAlign:"center"}}>
                        <Button variant = "contained" disabled = {loading} type="submit">{loading ? logData ? "Logging in the user" : "Registering the user" : actionLabel}</Button> 
                    </Box>
                </form>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}
              </Box>
            </Box>
        )
    }
