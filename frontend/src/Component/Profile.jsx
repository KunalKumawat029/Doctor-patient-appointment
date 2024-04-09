import React, { useState, useEffect } from "react";
import "./Profile.css";
import { getUser } from "../helper/helper";

function Profile() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const userData = getUser();
    setUser(userData);
  }, []);
  console.log(user);
  return (
    <div className="profile">
      <h2>Profile</h2>
      {user && (
        <div className="user-info">
          <p>Name: {user.data.name}</p>
          <p>Username: {user.data.email}</p>
          <p>Phone Number: {user.data.phoneNumber}</p>
          <p>Occupation: {user.type}</p>
        </div>
      )}
    </div>
  );
}

export default Profile;
