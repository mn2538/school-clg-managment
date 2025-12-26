import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const MarksContext = createContext(null);

export const MarksProvider = ({ children }) => {
  const [marks, setMarks] = useState([]);

  const fetchMarks = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/view-all-marks/${user.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMarks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMarks();
  }, []);

  return (
    <MarksContext.Provider value={{ marks, fetchMarks, setMarks }}>
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
