import { db } from "../assets/firebase/firebase";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";

const FetchWriters = () => {
  const [writersTotal, setWritersTotal] = useState(null);
  const writers = [];
  useEffect(() => {
    fetchBlogs();
  }, []);
  const fetchBlogs = async () => {
    const writerRef = collection(db, "users");
    const querySnapshot = await getDocs(writerRef);
    querySnapshot.forEach((ok) => {
      if (!writers.includes(ok.data())) {
        writers.push(ok.data());
      }
    });
    setWritersTotal(writers.length);
  };
  // return console.log(writers.length + 1);
  return <>{writersTotal}</>;
};

export default FetchWriters;
