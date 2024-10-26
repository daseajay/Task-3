import React, { useState } from "react";
import axios from "axios";

const PhoneNumber = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [headers, setHeaders] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  // console.log(phoneNumber);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Basic validation for phone number (example: must be 10 digits)
    // const phoneRegex = /^\d{10}$/;
    // if (!phoneRegex.test(phoneNumber)) {
    //   setError("Please enter a valid 10-digit phone number.");
    //   setLoading(false); // Reset loading state
    //   return;
    // }

    try {
      // Post data to the API
      const response = await axios.post("https://chimpu.online/api/post.php", {
        phonenumber: phoneNumber,
      });
      console.log(response.headers);
      // Set headers in the state
      setHeaders(response.headers);
    } catch (err) {
      // Handle error if the request fails
      setError(err.message);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div>
      <h1>Post Phone Number</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={phoneNumber}
          className=" form-control w-25"
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter Phone Number"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary mt-3"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {headers && (
        <div>
          <h2>Response Headers</h2>
          <ul>
            {Object.entries(headers).map(([key, value]) => (
              <li key={key}>
                {key}: {value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PhoneNumber;
