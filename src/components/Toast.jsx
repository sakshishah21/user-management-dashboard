import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import "../styles/global.css";

function Toast({ message, type = "success", show }) {
  if (!show) return null;

  return (
    <div className={`toast ${type}`}>
      {type === "success" ? (
        <FaCheckCircle className="toast-icon" />
      ) : (
        <FaTimesCircle className="toast-icon" />
      )}

      <span>{message}</span>
    </div>
  );
}

export default Toast;
