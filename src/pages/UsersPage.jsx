import { useEffect, useState, useRef } from "react";
import {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
  getUserById
} from "../api/userApi";
import UserTable from "../components/UserTable";
import SearchFilterBar from "../components/SearchFilterBar";
import Pagination from "../components/Pagination";
import UserModal from "../components/UserModal";
import DeleteModal from "../components/DeleteModal";
import Toast from "../components/Toast";
import "../styles/users.css";
import "../styles/modal.css";
import Loader from "../components/Loader";

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("");
  const [sortName, setSortName] = useState("");
  const [sortAge, setSortAge] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const selectedUserRef = useRef(null);
  const hasFetched = useRef(false);

  const usersPerPage = 10;
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success"
  });

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({
        show: false,
        message: "",
        type: "success"
      });
    }, 3000);
  };

  const saveUsers = (updatedUsers) => {
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  // GET
  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchUsers = async () => {
      try {
        const savedUsers = localStorage.getItem("users");
        if (savedUsers) {
          setUsers(JSON.parse(savedUsers));
        } else {
          const res = await getUsers(100, 0);
          setUsers(res.users || []);
          localStorage.setItem("users", JSON.stringify(res.users || []));
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // FILTER + SORT
  const filteredUsers = [...users]
    .filter((u) => {
      const name = `${u.firstName} ${u.lastName}`.toLowerCase();
      const email = u.email?.toLowerCase() || "";
      return (
        name.includes(search.toLowerCase()) ||
        email.includes(search.toLowerCase())
      );
    })
    .filter((u) => (gender ? u.gender === gender : true));

  if (sortName === "asc")
    filteredUsers.sort((a, b) => a.firstName.localeCompare(b.firstName));
  if (sortName === "desc")
    filteredUsers.sort((a, b) => b.firstName.localeCompare(a.firstName));
  if (sortAge === "low") filteredUsers.sort((a, b) => a.age - b.age);
  if (sortAge === "high") filteredUsers.sort((a, b) => b.age - a.age);

  // PAGINATION
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + usersPerPage
  );

  // EDIT
  const handleEdit = (user) => {
    setEditUser(user);
    setShowModal(true);
    getUserById(user.id)
      .then(() => console.log("API Success"))
      .catch((err) => console.log("API Failed", err));
  };

  //ADD + UPDATE
  const handleSaveUser = (data) => {
    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      age: Number(data.age),
      gender: data.gender,
      image: data.image || "https://dummyjson.com/icon/emilys/128",
      company: {
        name: data.companyName,
        department: data.department,
        title: data.title
      },
      address: {
        address: data.address,
        city: data.city,
        state: data.state,
        country: data.country
      }
    };

    if (editUser) {
      // UPDATE
      saveUsers(
        users.map((u) =>
          u.id === editUser.id ? { ...editUser, ...payload } : u
        )
      );
      showToast("User Updated Successfully");
      updateUser(editUser.id, payload).catch((err) =>
        console.log("Update API failed", err)
      );
    } else {
      // ADD
      const newUser = { id: Date.now(), ...payload };
      saveUsers([newUser, ...users]);
      showToast("User Added Successfully");
      addUser(payload).catch((err) => console.log("Add API failed", err));
    }

    setShowModal(false);
    setEditUser(null);
  };

  // DELETE
  const confirmDelete = () => {
    const user = selectedUserRef.current;
    if (!user?.id) return;
    saveUsers(users.filter((u) => u.id !== user.id));
    showToast("User Deleted Successfully");
    deleteUser(user.id).catch((err) => console.log("Delete API failed", err));
    selectedUserRef.current = null;
    setShowDeleteModal(false);
  };

  return (
    <div className="container users-page">
      {loading && <Loader fullScreen={true} />}

      {!loading && (
        <>
          <div className="page-header">
            <h1>User Management Dashboard</h1>
            <button
              className="add-user-btn"
              onClick={() => {
                setEditUser(null);
                setShowModal(true);
              }}
            >
              + Add User
            </button>
          </div>

          <SearchFilterBar
            search={search}
            setSearch={setSearch}
            gender={gender}
            setGender={setGender}
            sortName={sortName}
            setSortName={setSortName}
            sortAge={sortAge}
            setSortAge={setSortAge}
          />

          <UserTable
            users={paginatedUsers}
            onEdit={handleEdit}
            onDelete={(u) => {
              selectedUserRef.current = u;
              setShowDeleteModal(true);
            }}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />

          <UserModal
            isOpen={showModal}
            onClose={() => {
              setShowModal(false);
              setEditUser(null);
            }}
            onSubmit={handleSaveUser}
            editUser={editUser}
          />

          <DeleteModal
            isOpen={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            onConfirm={confirmDelete}
          />
          <Toast show={toast.show} message={toast.message} type={toast.type} />
        </>
      )}
    </div>
  );
}

export default UsersPage;
