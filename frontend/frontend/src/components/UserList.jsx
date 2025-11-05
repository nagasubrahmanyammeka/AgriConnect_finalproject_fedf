import React, { useState } from "react";
import UserProfile from "./UserProfile";

export default function UserList({ users }) {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div>
      <h3>User List</h3>
      {users.map((user) => (
        <button
          key={user.name}
          onClick={() => setSelectedUser(user.name)}
          style={{ margin: "5px" }}
        >
          {user.name}
        </button>
      ))}

      {selectedUser && <UserProfile userName={selectedUser} />}
    </div>
  );
}
