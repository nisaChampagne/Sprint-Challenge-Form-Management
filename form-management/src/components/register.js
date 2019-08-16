import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

import CurrentUsers from "./users/currentusers";
import NewUsers from './users/newusers';

function Register({ values, errors, touched, status, isSubmitting }) {
  const [users, setUsers] = useState([]);
  const [currentUsers, setCurrentUsers] = useState();

  useEffect(() => {
    if (status) {
      setUsers([...users, values]);
    }
  }, [status]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/restricted/users")
      .then(res => {
        setCurrentUsers(res.data);
      })
      .catch(err => console.log(err.response));
  }, [])

  if (currentUsers === undefined) {
    return null
}

  return (
    <div className="register-container">
      <h1>Onboarding</h1>
      <Form className="register-form">
        <Field className="form-input" type='username' name='username' placeholder='User Name' />
          {touched.username && errors.username && <p>{errors.username}</p>}
        <Field className="form-input" type='password' name='password' placeholder='Password' />
          {touched.password && errors.password && <p>{errors.password}</p>}
        <button type="submit" disabled={isSubmitting}>Register</button>
      </Form>
      <div className='users'>
      <div className="new-users">
        <h2>New Users</h2>
        {users.map((user, i) => (
          <NewUsers key={i} name={user.username} />
        ))}
        </div>
        <div className='current-users'>
        <h2>Current Users</h2>
        {currentUsers.map((current, i) => (
          <CurrentUsers key={i} name={current.username} />
        ))}
      </div>
    </div>
    </div>
  );
}

const FormikRegister = withFormik({
  mapPropsToValues({ username, password }) {
    return {
      username: username || "",
      password: password || ""
    };
  },

  validationSchema: Yup.object().shape({
    username: Yup.string()
      .min(5, "At least 5 characters please")
      .required("This is required"),
    password: Yup.string()
      .min(6, "At least 6 characters please")
      .required("This is required")
  }),

  handleSubmit(values, { resetForm, setErrors, setSubmitting, setStatus }) {
    if (values.username === "GhostRider") {
      setErrors({ username: "That is a negative ghostrider, try another one" });
    } else {
      axios
        .post("http://localhost:5000/api/register", values)
        .then(res => {
          setStatus(res.data);
          resetForm();
          setSubmitting(false);
          window.alert(`Username: ${res.username}`);
        })
        .catch(err => {
          console.log(err, "RUH ROH");
          setSubmitting(false);
        });
    }
  }
})(Register);

export default FormikRegister;

export const subtract = (num1, num2) => num1 - num2;