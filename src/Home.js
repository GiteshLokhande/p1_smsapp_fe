import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const nav = useNavigate();
  const [info, setInfo] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://smsapp-be.vercel.app/getdata");
      setInfo(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const delStu = async (rno) => {
    try {
      await axios.delete("https://smsapp-be.vercel.app/remove", {
        data: { rno },
      });
      alert("Record deleted");
      fetchData(); // Update the data after deletion
    } catch (error) {
      alert("Delete issue: " + error);
    }
  };

  const updateStu = (rno, name, marks) => {
    nav("/update", { state: { r: rno, n: name, m: marks } });
  };

  return (
    <>
      <center>
        <h1>Home Page</h1>

        <table border="4" style={{ width: "50%" }}>
          <thead>
            <tr>
              <th>Rno</th>
              <th>Name</th>
              <th>Marks</th>
              <th>Delete</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
           {info.length > 0 ? (
  info.map((e, index) => (
    <tr style={{ textAlign: "center" }} key={index}>
      <td>{e.Rno}</td>
      <td>{e.Name}</td>
      <td>{e.Marks}</td>
      <td>
        <button
          onClick={() => {
            if (window.confirm("Are you sure?")) delStu(e.Rno);
          }}
        >
          Delete
        </button>
      </td>
      <td>
        <button
          onClick={() => {
            updateStu(e.Rno, e.Name, e.Marks);
          }}
        >
          Update
        </button>
      </td>
    </tr>
  ))
) : (
  <tr>
    <td colSpan="5">No records found</td>
  </tr>
)}





          </tbody>
        </table>
      </center>
    </>
  );
}
