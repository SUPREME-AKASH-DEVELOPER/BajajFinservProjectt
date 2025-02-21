import PropTypes from "prop-types"; // ✅ Added PropTypes

const ResponseDisplay = ({ response }) => {
  return (
    <div>
      <h2>Response:</h2>
      <pre>{JSON.stringify(response, null, 2)}</pre>
    </div>
  );
};

// ✅ Added PropTypes for response validation
ResponseDisplay.propTypes = {
  response: PropTypes.object.isRequired,
};

export default ResponseDisplay;
