import React, { useState, useEffect } from "react";
import Dropdown from "./Dropdown";
import DropdownJob from "./DropdownOneValue";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [occupation, setOccupation] = useState("");
  const [state, setState] = useState("");
  const [options, setOptions] = useState([]);
  const [jobOptions, setJobOptions] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // GET request
    fetch("https://frontend-take-home.fetchrewards.com/form")
      .then((response) => response.json())
      .then((data) => setOptions(data.states));
  }, []);

  useEffect(() => {
    // GET request
    fetch("https://frontend-take-home.fetchrewards.com/form")
      .then((response) => response.json())
      .then((data) => setJobOptions(data.occupations));
  }, []);

  let handleSubmit = async (e) => {
    e.preventDefault();
    if (name === "" || email === "" || password === "" || occupation === "" || state.name === "") {
      console.log('finish please');
      setMessage("Please fill out all fields before submitting")
    }else{
      console.log(name);
      console.log(email);
      console.log(password);
      console.log(occupation);
      console.log(state.name);

      try {
        const res = await fetch(
          "https://frontend-take-home.fetchrewards.com/form",
          {
            method: "POST",
            body: JSON.stringify({
              name: name,
              email: email,
              password: password,
              occupation: occupation,
              state: state,
              message: message
            }),
          }
        );
        if (res.status === 200) {
        
  
          setMessage("User registration successful");
        } else {
          setMessage("Some error occured");
        }
      } catch (err) {
        console.log(err);
      }
    }
    
  };

  return (
    <div className={"App-main"}>
      <form onSubmit={handleSubmit} className={"App-form"}>
        <div>
          <h3>Registration Form</h3>
        </div>
        <div>
          <input
            className={"Form-input"}
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
          />
        </div>
        <div>
          <input
            className={"Form-input"}
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>
        <div>
          <input
            className={"Form-input"}
            type="text"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
        <div>
          <label>
            <DropdownJob
              options={jobOptions}
              isMulti={true}
              placeHolder="Occupation"
              className={"Form-select"}
              onChange={setOccupation}
            />
          </label>
        </div>
        <div>
          <label>
            <Dropdown
              options={options}
              isMulti={false}
              placeHolder="State"
              className={"Form-select"}
              onChange={setState}
            />
          </label>
        </div>
        <div>
          <button>Submit Contact</button>
          <div className="message">{message ? <p>{message}</p> : null}</div>
        </div>
      </form>
    </div>
  );
}

export default App;
