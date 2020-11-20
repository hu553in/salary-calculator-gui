import axios from 'axios';
import { useCallback, useState } from 'react';
import './App.css';
import logo from './logo.svg';

const App = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [employeeSalary, setEmployeeSalary] = useState(null);
  const [errors, setErrors] = useState(null);
  const onEmployeeIdInputChange = (event) => {
    event.preventDefault();
    setEmployeeId(event.target.value);
    setErrors(null);
  };
  const onEmployeeIdInputKeyUp = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      calculateSalary();
    }
  }
  const calculateSalary = useCallback(async () => await axios.get(
    `http://localhost:9920/api/calculate-salary/${employeeId}`
  ).then((response) => {
    setEmployeeSalary(response.data.data.salary);
    setErrors(null);
  }).catch((e) => {
    if (e.response) {
      setEmployeeSalary(null);
      setErrors(e.response.data.errors.reduce(
        (carry, current) => `${carry}, ${current}`)
      );
    }
    console.log(JSON.stringify(e));
  }), [employeeId]);
  return (
    <main className="app">
      <img
        className="app__logo"
        src={logo}
        alt="Logo"
      />
      <h1 className="app__heading">Salary calculator</h1>
      <p className="app__instructions">
        Enter an employee ID in the field below and then
        press the button to calculate their salary:
      </p>
      <input
        className="app__employeeIdInput"
        type="text"
        placeholder="An awesome employee ID"
        maxLength="255"
        onChange={onEmployeeIdInputChange}
        onKeyUp={onEmployeeIdInputKeyUp}
        value={employeeId}
      ></input>
      <button
        className="app__calculateButton"
        disabled={employeeId.length === 0}
        onClick={calculateSalary}
      >
        Calculate
      </button>
      {employeeSalary !== null && (
        <>
          <p className="app__employeeSalaryLabel">
            Employee salary is
          </p>
          <p className="app__employeeSalary">
            {employeeSalary}
          </p>
        </>
      )}
      {errors !== null && (
        <>
          <p className="app__errorLabel">
            There's a coupse of errors:
          </p>
          <p className="app__error">
            {errors}
          </p>
        </>
      )}
    </main>
  );
}

export default App;
