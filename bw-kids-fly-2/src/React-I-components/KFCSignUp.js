import React, { useState } from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {connect} from 'react-redux';
import {addAssistant} from '../actions/Register';

import styled from 'styled-components';

//Styled-Components
const FormContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .errors {
    margin-bottom: 5rem;
    width: 100%;
    text-align: center;
    color: red;
    font-size: 1.4rem;
    font-weight: 300;
    letter-spacing: 0.1rem;
  }

  .incorrect-login {
    margin-top: 3rem;
    color: #872a26;
    font-size: 1.4rem;
  }

  .login-message {
    h2 {
      font-size: 3rem;
      color: #5f7361;
    }
    p {
      margin-top: 1rem;
      font-size: 1.6rem;
      font-weight: 300;
      letter-spacing: 0.1rem;
      color: #444444;
      @media (max-width: 451px) {
        font-size: 1.4rem;
      }
      @media (max-width: 403px) {
        font-size: 1.2rem;
      }
    }
  }
  form {
    padding: 2.5rem 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    ${'' /* width: 60%; */}
    margin-bottom: 5%;
    flex-direction: column;
  }
  @media (max-width: 500px) {
    flex-direction: column;
  }

  input {
    margin: 0.5rem 0;
    width: 20rem;
    height: 3.5rem;
    background: #bfbfbf;
    border: none;
    border-radius: 0.3rem;
    padding: 0.5rem 0.5rem 0.5rem 1rem;
    font-size: 1.2rem;
    font-weight: 300;
    letter-spacing: 0.1rem;
    &:focus {
      ßoutline: none;
      border: 1px solid #ababab;
    }
  }
  button {
    width: 20rem;
    height: 3.5rem;
    margin: 1rem 0 0;
    background: #d1ffd6;
    border: none;
    border-radius: 0.3rem;
    transition: all 100ms;
    box-shadow: 0px 2px 5px -5px;
    letter-spacing: 0.1rem;
    &:hover {
      transition: background 100ms;
      cursor: pointer;
      background: #afdeb4;
    }
  }
`;


const SignUpForms = ({ values, touched, errors, status, ...props }) => {
  const [user, setUser] = useState({
    first_name:'',
    last_name:'',
    email:'',
    password: '',
    phone:'',
    a_home_airport:''
  });

  const handleSubmit = e => {
    e.preventDefault();
    props
      .addUser(user)
      .then(() => props.history.push('/assistant'));
          setUser({
              username:'',
              password: ''
          })
  }
  const handleChanges = e => {
    setUser({...user, [e.target.name]: e.target.value});
}

  return (
    <div className="container">
      <FormContainer>
        <div className="signup">
          <div className="userinfo">
            <h3> Welcome to Kids Fly Connect Team {user.name} ! </h3>
          </div>
          <Form onSubmit={handleSubmit}>

            <label> First Name: </label>
            <Field type="text" name="first_name" placeholder="Enter First Name" value={user.first_name} onChange={handleChanges}/>
            {touched.first_name && errors.first_name && <p className="errors">{errors.first_name}</p>}
          
            <label> Last Name: </label>
            <Field type="text" name="last_name" placeholder="Enter Last Name" value={user.last_name} onChange={handleChanges}/>
            {touched.last_name && errors.last_name && <p className="errors">{errors.last_name}</p>}

            <label> Email: </label>
            <Field type="email" name="email" placeholder="Enter Email" value={user.email} onChange={handleChanges} />
            {touched.email && errors.email && <p className="errors">{errors.email}</p>}

            <label> Phone Number: </label>
            <Field type="tel" name="phone" placeholder="Enter Valid Phone Number" value={user.phone} onChange={handleChanges} />
            {touched.phone && errors.phone && <p className="errors">{errors.phone}</p>}

            <label> Password: </label>
            <Field type="password" name="password" placeholder="Enter Password" value={user.password} onChange={handleChanges}/>
            {touched.password && errors.password && <p className="errors">{errors.password}</p>}

            <label>Home Airport: </label>
            <Field type="text" name="a_home_airport" placeholder="Enter Home Airport" value={user.a_home_airport} onChange={handleChanges} />
            {touched.a_home_airport && errors.a_home_airport && <p className="errors">{errors.a_home_airport}</p>}

            <button type="submit" disabled={values.isSubmitting}>
              {values.isSubmitting ? 'Submitting' : 'Submit'}
            </button>
          </Form>
        </div>
      </FormContainer>
    </div>
  );
};

const FormikAssistSignUp = withFormik({

  validationSchema: Yup.object().shape({
    first_name: Yup.string()
      .min(1, 'Too Short!')
      .max(30, 'Too Long!')
      .required('Name is Required!'),
    last_name: Yup.string()
      .min(2, 'Too Short!')
      .max(20, 'Too Long!')
      .required('Name is Required!'),
    email: Yup.string()
      .min(3, 'Too Short!')
      .max(40, 'Too Long!')
      .email('Invalid email')
      .required('Email is Required!'),
    password: Yup.string()
      .min(8, 'Too Short!')
      .max(20, 'Too Long!')
      .required('Password is Required'),
    phone: Yup.string()
      .min(2, 'Invalid Phone Number!')
      .required('Phone Number is Required!'),
      a_home_airport: Yup.string()
      .min(2, 'Invalid Aiport!')
      .max(40, 'Invalid Airport!')
      .required('Airport is Required!'),
  })
})(SignUpForms)

export default connect(
  null,
  {addAssistant}
)(FormikAssistSignUp);