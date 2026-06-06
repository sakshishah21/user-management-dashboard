import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getUserById } from "../api/userApi";
import "../styles/userDetails.css";
import Loader from "../components/Loader";

function UserDetailsPage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const savedUsers = JSON.parse(localStorage.getItem("users") || "[]");
        const localUser = savedUsers.find((u) => u.id === Number(id));
        if (localUser) {
          setUser(localUser);
          getUserById(id)
            .then(() => console.log("API Called"))
            .catch(() => {});
          return;
        }
        const res = await getUserById(id);
        setUser(res);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) return <Loader fullScreen={true} />;
  if (!user) return <h2>User Not Found</h2>;

  return (
    <div className="container details-page">
      <Link to="/" className="back-btn">
        ← Back
      </Link>
      <div className="profile-card">
        <img src={user.image} alt={user.firstName} className="profile-image" />
        <div className="profile-info">
          <h1>
            {user.firstName} {user.lastName}
          </h1>
          <p>
            {user.company?.title} · {user.company?.department} ·{" "}
            {user.company?.name}
          </p>
        </div>
      </div>

      <div className="bottom-layout">
        {/* LEFT COLUMN */}
        <div className="left-col">
          <div className="details-section">
            <h2>Basic Information</h2>
            <div className="info-row">
              <span className="info-label">Email</span>
              <span className="info-value">{user.email}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Phone</span>
              <span className="info-value">{user.phone}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Age</span>
              <span className="info-value">{user.age}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Gender</span>
              <span className="info-value">{user.gender}</span>
            </div>
          </div>

          <div className="details-section">
            <h2>Address Information</h2>
            <div className="info-row">
              <span className="info-label">Address</span>
              <span className="info-value">{user.address?.address}</span>
            </div>
            <div className="info-row">
              <span className="info-label">City</span>
              <span className="info-value">{user.address?.city}</span>
            </div>
            <div className="info-row">
              <span className="info-label">State</span>
              <span className="info-value">{user.address?.state}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Country</span>
              <span className="info-value">{user.address?.country}</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="right-col">
          <div className="details-section">
            <h2>Company Information</h2>
            <div className="info-row">
              <span className="info-label">Company</span>
              <span className="info-value">{user.company?.name}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Department</span>
              <span className="info-value">{user.company?.department}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Title</span>
              <span className="info-value">{user.company?.title}</span>
            </div>
          </div>

          <div className="details-section">
            <h2>Additional Information</h2>
            <div className="info-row">
              <span className="info-label">Birth Date</span>
              <span className="info-value">{user.birthDate || "N/A"}</span>
            </div>
            <div className="info-row">
              <span className="info-label">University</span>
              <span className="info-value">{user.university || "N/A"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetailsPage;
