import "./Loader.css";

function Loader() {
  return (
    <div className="loader-page">
      <div className="loader-circle"></div>

      <h2 className="loader-logo">
        Unit<span>Hub</span>
      </h2>

      <p>Loading...</p>
    </div>
  );
}

export default Loader;