import { useEffect, useState } from "react";
import { validateUserForm } from "../utils/validations";

function UserModal({ isOpen, onClose, onSubmit, editUser }) {
  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    image: "",
    address: "",
    city: "",
    state: "",
    country: "",
    companyName: "",
    department: "",
    title: ""
  };

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editUser) {
      setFormData({
        firstName: editUser.firstName || "",
        lastName: editUser.lastName || "",
        email: editUser.email || "",
        phone: editUser.phone || "",
        age: editUser.age || "",
        gender: editUser.gender || "",
        image: editUser.image || "",
        address: editUser.address?.address || "",
        city: editUser.address?.city || "",
        state: editUser.address?.state || "",
        country: editUser.address?.country || "",
        companyName: editUser.company?.name || "",
        department: editUser.company?.department || "",
        title: editUser.company?.title || ""
      });
    } else {
      setFormData(initialState);
    }
  }, [editUser, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

    setErrors({
      ...errors,
      [name]: ""
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateUserForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{editUser ? "Edit User" : "Add New User"}</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div>
              <label className="input-label">First Name</label>
              <input
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
              />
              {errors.firstName && (
                <span className="error-text">{errors.firstName}</span>
              )}
            </div>

            <div>
              <label className="input-label">Last Name</label>
              <input
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
              />
              {errors.lastName && (
                <p className="error-text">{errors.lastName}</p>
              )}
            </div>

            <div>
              <label className="input-label">Email</label>
              <input
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="error-text">{errors.email}</p>}
            </div>

            <div>
              <label className="input-label">Phone</label>
              <input
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && <p className="error-text">{errors.phone}</p>}
            </div>

            <div>
              <label className="input-label">Age</label>
              <input
                name="age"
                placeholder="Age"
                value={formData.age}
                onChange={handleChange}
              />
              {errors.age && <p className="error-text">{errors.age}</p>}
            </div>

            <div>
              <label className="input-label">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {errors.gender && <p className="error-text">{errors.gender}</p>}
            </div>

            <div>
              <label className="input-label">
                Profile Image URL (optional)
              </label>
              <input
                name="image"
                placeholder="Profile Image URL"
                value={formData.image}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="input-label">Address Line</label>
              <input
                name="address"
                placeholder="Address Line"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="input-label">City</label>
              <input
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="input-label">State</label>
              <input
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="input-label">Country</label>
              <input
                name="country"
                placeholder="Country"
                value={formData.country}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="input-label">Company Name</label>
              <input
                name="companyName"
                placeholder="Company Name"
                value={formData.companyName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="input-label">Department</label>
              <input
                name="department"
                placeholder="Department"
                value={formData.department}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="input-label">Title</label>
              <input
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>

            <button type="submit" className="save-btn">
              {editUser ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserModal;
