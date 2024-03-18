
import React, { useState, useEffect } from 'react';
import axios from 'axios';



const BenchesForm = () => {
  const [benchData, setBenchData] = useState({
    selectedClassroom: "",
    left: "",
    center: "",
    right: ""
  });

  const [classrooms, setClassrooms] = useState([]);

  useEffect(() => {
    handleGet();
  }, []); // This ensures that handleGet is called only once when the component mounts

  const handleGet = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/benches/getclassNumbers');
      const classNumbers = response.data;
      setClassrooms(classNumbers);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBenchData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSave = async () => {
    console.log("This is bench data",benchData);
    try {
      await axios.post('http://localhost:4000/api/benches/createbenches', benchData);
      // console.log("Bench data saved successfully");
      // Add any success message or redirect to the next page
    } catch (error) {
      console.error('Error:', error);
      // Handle error
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-sage-gray">
  <div className="bg-teal-600 rounded-lg shadow-lg p-20 flex flex-col">
    <select value={benchData.selectedClassroom} onChange={handleInputChange} name="selectedClassroom" className="mb-4 px-4 py-2 text-lg rounded border border-gray-300">
      <option value="">Select Classroom</option>
      {classrooms.map((classroom, index) => (
        <option key={index} value={classroom}>{classroom}</option>
      ))}
    </select>

    <input type="text" name="left" value={benchData.left} onChange={handleInputChange} className="mb-2 border border-gray-300 rounded-lg px-12 py-2" placeholder="Left" />
    <input type="text" name="center" value={benchData.center} onChange={handleInputChange} className="mb-2 border border-gray-300 rounded-lg px-12 py-2" placeholder="Center" />
    <input type="text" name="right" value={benchData.right} onChange={handleInputChange} className="mb-2 border border-gray-300 rounded-lg px-12 py-2" placeholder="Right" />
    <button onClick={handleSave} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-600">Enter</button>
  </div>
</div>






  );
};

export default BenchesForm;
