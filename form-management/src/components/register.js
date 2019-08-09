import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

function Register({ values, errors, touched, status, isSubmitting}) {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    if (status) {
      setRecipes([...status]);
    }
  }, [status]);

  return(
    <div className="register-container">
      <Form className="register-form">
        <div className="field">
          <label htmlFor='username'>Username:</label>
          <Field
            type="text"
            name="username"
            id="username"
            className="username"
          />
          {touched.username && errors.username && <p>{errors.username}</p>}
        </div>
        <div className="field">
          <label htmlFor='password'>Password:</label>
          <Field
            type="password"
            name="password"
            id="password"
            className="password"
          />
          {touched.password && errors.password && <p>{errors.password}</p>}
        </div>
        <button type="submit" disabled={isSubmitting}>Sign Up</button>
      </Form>
      <h2>Recipes</h2>
      {recipes
        ? recipes.map(recipe => (
            <p key={Date.now() + Math.random(10000)} className="recipes">
              Name : {recipe.name} Course : {recipe.course}
            </p>
          ))
        : null}
    </div>
  );
}

const FormikRegister = withFormik({
    mapPropsToValues({username, password}){
        return{
            username: username|| '',
            password: password|| ''
        };
    },

    validationSchema: Yup.object().shape({
        username: Yup.string()
            .min(5, "At least 5 characters please").required('This is required'),
        password: Yup.string()
            .min(6, "At least 6 characters please").required('This is required')
    }),

    handleSubmit(values, {resetForm, setErrors, setSubmitting, setStatus}){
        if(values.username === 'GhostRider'){
            setErrors({ username: 'That is a negative ghostrider, try another one'});
        } else {
            axios
                .post('http://localhost:5000/api/register', values)
                .then(res =>{
                    setStatus(res.data);
                    resetForm();
                    setSubmitting(false);
                    window.alert(`Username: ${res.data.username}`);
                })
                .catch(err => {
                    console.log(err, 'RUH ROH');
                    setSubmitting(false);
                });
        }
    }
})(Register);

export default FormikRegister;
