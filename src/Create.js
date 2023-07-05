import React, { useState } from "react";
import axios from "axios";

export default function Create({ updateData }) {
  const [rno, setRno] = useState("");
  const [name, setName] = useState("");
  const [marks, setMarks] = useState("");
  const [ans, setAns] = useState("");

  const hRno = (event) => {
    setRno(event.target.value);
  };

  const hName = (event) => {
    setName(event.target.value);
  };

  const hMarks = (event) => {
    setMarks(event.target.value);
  };

  const save = async (event) => {
    event.preventDefault();
    const data = { rno, name, marks };

    try {
      const response = await axios.post(
        "https://smsapp-be.vercel.app/save",
        data
      );

      if (response.data.affectedRows === 1) {
        setAns("Record created");
        setRno("");
        setName("");
        setMarks("");
        updateData(); // Update the data in the parent component
      } else {
        setAns(rno + " already exists");
        setRno("");
        setName("");
        setMarks("");
      }
    } catch (err) {
      if (err.message.includes("Network Error")) {
        setAns("Please try again after some time");
      }
    }
  };

  return (
    <>
      <center>
        <h1>Create Page</h1>
        <form onSubmit={save}>
          <input
            type="number"
            placeholder="enter rno"
            onChange={hRno}
            value={rno}
          />
          <br />
          <br />
          <input
            type="text"
            placeholder="enter name"
            onChange={hName}
            value={name}
          />
          <br />
          <br />
          <input
            type="number"
            placeholder="enter marks"
            onChange={hMarks}
            value={marks}
          />
          <br />
          <br />
          <input type="submit" value="Save" />
          <br />
          <br />
        </form>
        <h1>{ans}</h1>
      </center>
    </>
  );
}
