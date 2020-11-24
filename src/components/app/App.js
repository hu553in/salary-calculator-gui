import axios from 'axios';
import { useCallback, useState } from 'react';
import RenderIfTrue from '../render-if-true/RenderIfTrue';
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

  axios.defaults.baseURL = process.env.REACT_APP_API_URL;
  const calculateSalary = useCallback(
    () => axios
      .get(`/calculate-salary/${employeeId}`)
      .then((response) => {
        setEmployeeSalary(response.data.data.salary);
        setErrors(null);
      })
      .catch((e) => {
        setEmployeeSalary(null);
        if (e.response) {
          setErrors(e.response.data.errors.reduce(
            (carry, current) => `${carry}, ${current}`)
          );
        } else {
          setErrors('Unknown error');
        }
      }),
    [employeeId]
  );

  return (
    <main className="app">
      <img className="app__logo" src={logo} alt="Logo" />
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
      <input
        type="button"
        className="app__calculateButton"
        disabled={employeeId.length === 0}
        onClick={calculateSalary}
        value="Calculate"
      />
      <RenderIfTrue statement={employeeSalary !== null}>
        <p className="app__employeeSalaryLabel">
          Employee salary is
        </p>
        <p className="app__employeeSalary">{employeeSalary}</p>
      </RenderIfTrue>
      <RenderIfTrue statement={errors !== null}>
        <p className="app__errorsLabel">
          There's a couple of errors:
        </p>
        <p className="app__errors">{errors}</p>
      </RenderIfTrue>
    </main>
  );
}

export default App;
