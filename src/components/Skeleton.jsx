function Skeleton() {
  return (
    <div className="skeleton-container">
      {[1, 2, 3, 4, 5].map((item) => (
        <div key={item} className="skeleton-row"></div>
      ))}
    </div>
  );
}

export default Skeleton;
