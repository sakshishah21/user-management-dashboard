import { Link } from "react-router-dom";

function UserTable({ users, onEdit, onDelete }) {
  return (
    <div className="table-wrapper">
      <table className="user-table">
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Company</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <img
                  src={user.image}
                  alt=""
                  className="avatar"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=random`;
                  }}
                />
              </td>

              <td>
                {user.firstName} {user.lastName}
              </td>

              <td>{user.email}</td>

              <td>{user.phone}</td>

              <td>{user.company?.name}</td>

              <td>{user.company?.department}</td>

              <td>
                <div className="action-buttons">
                  <Link to={`/user/${user.id}`} className="view-btn">
                    View
                  </Link>

                  <button className="edit-btn" onClick={() => onEdit(user)}>
                    Edit
                  </button>

                  <button className="delete-btn" onClick={() => onDelete(user)}>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
