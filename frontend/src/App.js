import "./App.css";
import { useState } from "react";
import { Button, TextField } from "@mui/material";
import axios from "axios";
function App() {
  const [username, setUsername] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  function submitUsername(e) {
    e.preventDefault();
    axios
      .post("http://localhost:5000/", { username })
      .then((res) => {
        const { message } = res.data;
        setSuccess(message);
      })
      .catch((err) => {
        const { message } = err.response.data;
        setError(message);
      });
  }
  return (
    <div className="App">
      <form autoComplete="off" onSubmit={submitUsername}>
        <TextField
          type="text"
          id="outlined-basic"
          label="Enter Username"
          variant="outlined"
          onChange={(e) => {
            setUsername(e.target.value);
            setError(null);
            setSuccess(null);
          }}
        />
        {error == null ? (
          <>
            {success != null ? <p className="success-msg">{success}</p> : ""}
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </>
        ) : (
          <>
            <p className="error-msg">{error}</p>
            <Button type="submit" disabled variant="contained">
              Submit
            </Button>
          </>
        )}
        {/* <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input type="submit" value="Submit" /> */}
      </form>
    </div>
  );
}

export default App;
