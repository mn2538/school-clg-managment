import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const MarksContext = createContext(null);

export const MarksProvider = ({ children }) => {
  const [marks, setMarks] = useState([]);
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user"))
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setUser(JSON.parse(localStorage.getItem("user")));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    if (!user) {
      setMarks([]);
      return;
    }

    const fetchMarks = async () => {
      try {
        const token = localStorage.getItem("token");
        let res;

        if (user.role === "teacher") {
          res = await axios.get(
            `${process.env.REACT_APP_API_URL}/view-all-marks/${user.id}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setMarks(res.data);
        } 
        else if (user.role === "student") {
          res = await axios.get(
            `${process.env.REACT_APP_API_URL}/individual-marks/${user.roll_no}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setMarks(res.data ? [res.data] : []);
        } 
        else if (user.role === "parent") {
          res = await axios.get(
            `${process.env.REACT_APP_API_URL}/parent/individual-marks?parent_id=${user.id}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setMarks(res.data ? [res.data] : []);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchMarks();
  }, [user]);

  return (
    <MarksContext.Provider value={{ marks, setMarks }}>
      {children}
    </MarksContext.Provider>
  );
};

export const useMarks = () => {
  const context = useContext(MarksContext);
  if (!context) {
    throw new Error("useMarks must be used within MarksProvider");
  }
  return context;
};
