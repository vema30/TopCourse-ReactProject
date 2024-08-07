import React, { useState } from "react";
import Navbar from './Nabar';
import { filterData, apiUrl } from './data.js';
import CourseList from './CourseList';
// Now you can use filterData and apiUrl in this file
console.log(filterData);
console.log(apiUrl);

const App = () => {
  const [data,SetData]=useState(filterData);
console.log(data);
  return <div>
         <Navbar/>
         <div>
            <CourseList/>
         </div>
  </div>;
};

export default App;
