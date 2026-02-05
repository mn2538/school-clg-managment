import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Box, TextField, Button, InputAdornment, IconButton, Card, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Password, Abc } from "@mui/icons-material";

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
                
                window.dispatchEvent(new Event("storage"));

                setLoading(true);
                
                setTimeout(() => {
                    navigate("/dashboard");
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
            <Box sx={{display: "flex", height: "100vh", background: "linear-gradient(135deg, #000042 0%, #090979 40%, #0284C7 100%)"}}>
            <Box sx={{width: "45%", display: "flex", alignItems: "center", flexDirection: "column", justifyContent: "center"}}>
            <Card sx={{background: "none", boxShadow: "none", color: "white"}}>
                <Typography variant='h2'>Welcome Back</Typography>
                <Typography variant='h5'>Please log in to your management system.</Typography>
            </Card>
            </Box>
            <Box sx={{width: "55%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection:"column"}}>
            <Card sx={{p : 5, borderRadius:3, boxShadow: "0px 20px 50px rgba(0,0,0,0.15)", maxWidth: "500px"}}>
                <Typography variant='h5' sx={{mb: 2, fontWeight: 600}}> 
                    {logData ? "Sign in to your account" : "New to the portal? Register your account"}
                </Typography>

            <form onSubmit={handleSubmit}>
                {!logData && (
                    <>
                    <FormControl fullWidth required>
                        <InputLabel>Select Role</InputLabel>
                        <Select value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} sx={{mb:2}}>
                            <MenuItem value="">
                            <em>Select Role</em>
                            </MenuItem>
                            <MenuItem value="teacher">Teacher</MenuItem>
                            <MenuItem value="student">Student</MenuItem>
                            <MenuItem value="parent">Parent</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField sx={{mb:2}}
                    type="text" 
                    label="Username"
                    placeholder="Enter your preferred Username"
                    value={formData.username}
                    fullWidth
                    onChange={(e)=>setFormData({...formData, username: e.target.value})}
                    required />
                    </>
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
                    <Button fullWidth variant = "contained" disabled = {loading} type="submit" sx={{ mt: 2, textTransform: "none", py: 1.5 }}>{loading ? logData ? "Logging in the user" : "Registering the user" : actionLabel}</Button> 
                </Box>
            </form>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            </Card>
            </Box>
        </Box>
    )
}
