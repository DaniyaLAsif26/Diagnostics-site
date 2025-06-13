import { useEffect, useState } from "react";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'; 
import "./BackToTop.css";

export default function BackToTop() {
  const [visible, setVisible] = useState(false); 

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,             
      behavior: "smooth", 
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setVisible(true); 
      } else {
        setVisible(false); 
      }
    };

    window.addEventListener("scroll", toggleVisibility); 

    return () => {
      window.removeEventListener("scroll", toggleVisibility); 
    };
  }, []);

  return (
    visible && (
      <button className="back-to-top" onClick={scrollToTop}>
       <ArrowUpwardIcon />
      </button>
    )
  );
}
