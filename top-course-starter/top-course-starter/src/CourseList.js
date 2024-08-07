
import React, { useEffect, useState } from 'react';
import { apiUrl } from './data.js'; // Assuming apiUrl is exported from data.js
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'; // Importing heart icons from react-icons
import './CourseList.css'; // Import CSS file for component-specific styles

const CourseList = () => {
  const [coursesData, setCoursesData] = useState(null);
  const [filteredCourses, setFilteredCourses] = useState(null);
  const [likedCourses, setLikedCourses] = useState([]);
  const [popupMessage, setPopupMessage] = useState('');

  useEffect(() => {
    // Fetch data from apiUrl
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        setCoursesData(data.data); // Assuming data structure matches your JSON
        setFilteredCourses(data.data); // Initialize filteredCourses with all data
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  if (!coursesData) {
    return <div>Loading...</div>;
  }

  // Function to handle category filtering
  const handleFilterByCategory = (category) => {
    if (category === 'All') {
      setFilteredCourses(coursesData); // Show all courses
    } else {
      const filtered = {
        [category]: coursesData[category]
      };
      setFilteredCourses(filtered); // Show courses of the selected category
    }
  };

  // Function to toggle like status of a course
  const toggleLike = (courseId) => {
    if (likedCourses.includes(courseId)) {
      setLikedCourses(likedCourses.filter(id => id !== courseId));
      setPopupMessage('Course removed from liked list');
    } else {
      setLikedCourses([...likedCourses, courseId]);
      setPopupMessage('Course added to liked list');
    }
    setTimeout(() => {
        setPopupMessage('');
      }, 1000);
  };

  // Function to clear popup message
  const clearPopupMessage = () => {
    setPopupMessage('');
  };

  return (
    <div className='course-body'>
    <div className="course-list-container">
    {/* Filter buttons centered */}
    <div className="filter-buttons">
      <button onClick={() => handleFilterByCategory('All')}>All</button>
      {Object.keys(coursesData).map(category => (
        <button key={category} onClick={() => handleFilterByCategory(category)}>{category}</button>
      ))}
    </div>

    {/* Display filtered courses */}
    <div className="card-grid">
      {filteredCourses && Object.keys(filteredCourses).map(category => (
        filteredCourses[category].map(course => (
          <div key={course.id} className="card">
            <img src={course.image.url} alt={course.image.alt} />
            <div className="card-content">
              <h3>{course.title}</h3>
              <p>{course.description.substring(0, 100)}...</p>
            </div>
            <button onClick={() => toggleLike(course.id)} className="like-button">
              {likedCourses.includes(course.id) ? <AiFillHeart color="pink" /> : <AiOutlineHeart />}
            </button>
          </div>
        ))
      ))}
    </div>

    {/* Popup message for like/dislike action */}
    {popupMessage && (
      <div className="popup">
        <p>{popupMessage}</p>
        <button onClick={clearPopupMessage}>Close</button>
      </div>
    )}
  </div>
);
    </div>
  );
};

export default CourseList;
