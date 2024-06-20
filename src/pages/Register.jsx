import { Field, Formik, Form, ErrorMessage } from "formik";
import { Link, useNavigate,  } from "react-router-dom";
import * as Yup from "yup";
import {register, signUpProvider} from '../firebase'


const Register = () => {
  const navigate = useNavigate()

  const initialValues = { displayName:'', email: "", password: "" };
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email Required"),
    password: Yup.string()
      .min(5, "Minimum 5 characters")
      .required("Password Required"),
    displayName:Yup.string().min(3, "Minimum 3 characters")
    .required("Name Required"),
  });

  const submitHandler = async(values)=>{
    const {email, password, displayName} = values
    const error = await register(email, password, displayName)
    if(error) navigate('/register')
    else navigate('/')
  }

  const providerHandler = async()=>{
    await signUpProvider()
    navigate('/')
  }


  return (
    <div className="row">
      <div className="col-12 col-md-8 col-lg-6 mx-auto">
        <div className="card card-body shadow">
          <h1 className="text-center mb-5">Register</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={submitHandler}
          >
   
              <Form>
                <div className="mb-3">
                  <Field
                    type="name"
                    name="displayName"
                    className="form-control"
                    placeholder="Enter Your Name"
                    autoComplete="off"
                  />
                  <small className="text-danger">
                    <ErrorMessage name="displayName"/>
                  </small>
                </div>
                <div className="mb-3">
                  <Field
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter Email"
                    autoComplete="off"
                  />
                  <small className="text-danger">
                    <ErrorMessage name="email"/>
                  </small>
                </div>
                <div className="mb-3">
                  <Field
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Enter Password"
                    autoComplete="off"
                  />
                  <small className="text-danger">
                    <ErrorMessage name="password"/>
                  </small>
                </div>
              
                <div className="d-grid">
                  <button className="btn btn-primary mt-2" type="submit">Sign up</button>
                </div>
                <div className="d-grid">
                  <button className="btn btn-primary mt-2" onClick={providerHandler}>Continue with Google Account</button>
                </div>
                <p className="text-center text-dark mt-2"> 
                  Have an account 
                  <Link to="/login"> Login Here!</Link>
                </p>

              </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Register;
