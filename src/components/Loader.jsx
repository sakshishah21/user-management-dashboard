import "../styles/loader.css";

function Loader({ fullScreen = false }) {
  return (
    <div className={fullScreen ? "loader-overlay" : "loader-container"}>
      <div className="spinner"></div>
    </div>
  );
}

export default Loader;
