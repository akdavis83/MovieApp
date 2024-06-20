import { Field, Formik, Form, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { forgetPassword, login, signUpProvider } from "../firebase";

const Login = () => {
  const navigate = useNavigate()
  const initialValues = { email: "", password: "" };
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email Required"),
    password: Yup.string()
      .min(5, "Minimum 5 characters")
      .required("Password Required"),
  });

  const submitHandler = async(values) => {
    const {email, password} = values
    const error = await login(email, password)
    if(error) navigate('/login')
    else navigate('/')
  };

  const providerHandler = async()=>{
    await signUpProvider()
    navigate('/')
  }

  const forgetPasswordHanler = async(email)=>{
    await forgetPassword(email)
  }


  return (
    <div className="row">
      <div className="col-12 col-md-8 col-lg-6 mx-auto">
        <div className="card card-body shadow">
          <h1 className="text-center mb-5">Login</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={submitHandler}
          >
            {({ values }) => (
              <Form>
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
                <div className="text-center text-warning mt-3" style={{cursor:'pointer'}} onClick={()=>forgetPasswordHanler(values.email)}> Forgot Password?</div>
                <div className="d-grid">
                  <button className="btn btn-primary mt-2" type="submit">Login</button>
                </div>
                <div className="d-grid">
                  <button className="btn btn-primary mt-2" onClick={providerHandler}>Continue with Google Account</button>
                </div>
                <p className="text-center text-dark mt-2"> 
                  Don't have an account? 
                  <Link to="/register"> Sign up Here!</Link>
                </p>

              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
