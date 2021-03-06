import React, { useState } from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {loginParent} from '../actions/Login';

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
      outline: none;
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


const ParentSignIn = ({ values, touched, errors, status, ...props }) => {
  const [user, setUser] = useState({
    email:'',
    password:''
  });

  const handleSubmit = e => { 
    e.preventDefault();
    props.loginParent(user)
    .then(()=> 
      console.log('YAY, LOGGED IN!!!'),
      props.history.push('/parent')  
    );
    setUser({
      email:'',
      password:'' 
    });
  };
  const handleChanges = e => {
    setUser({...user, [e.target.name]: e.target.value})
  }
  return (
    <FormContainer>
      <div className="userinfo">
        <h3> Welcome to KidsFly{user.name} ! </h3>
      </div>
      <div className="container">
        <h1>Sign-In</h1>
        <div className="signup">
          <Form onSubmit={handleSubmit}>
            <label> Email: </label>
            <Field type="email" name="email" placeholder="Enter Email"  value={user.email} onChange={handleChanges} />
            {touched.email && errors.email && <p className="errors">{errors.email}</p>}
            <label> Password: </label>
            <Field type="password" name="password" placeholder="Enter Password" value={user.password} onChange={handleChanges}/>
            {touched.password && errors.password && <p className="errors">{errors.password}</p>}

            <button type="submit" disabled={values.isSubmitting}>
              {values.isSubmitting ? 'Submitting' : 'Submit'}
            </button>
          </Form>
        </div>
      </div>
    </FormContainer>
  );
};

const FormikLogIn = withFormik({
  mapPropsToValues({username, password}){
    return {
      username: username || "",
      password: password || "",
    };
  },
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .min(3, 'Too Short!')
      .max(20, 'Too Long!')
      .email('Invalid email')
      .required('Email is Required!'),
    password: Yup.string()
      .min(8, 'Too Short!')
      .max(20, 'Too Long!')
      .required('Password is Required'),
  }),
 
})(ParentSignIn);

export default connect(
  null,
  { loginParent }
)(FormikLogIn);