import React, { useState, useContext } from "react";
import { useFormik } from "formik";
import authRequest from "../utils/authRequest";
import { Link, useHistory } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

import Dropdown from "../components/Dropdown";

import { URL } from "../utils/Routes";

import { User } from "../context/user";

const validate = (values) => {
  const errors = {};
  if (!values.username) {
    errors.username = "required";
  }

  if (!values.team) {
    errors.team = "required";
  }
  if (!values.info) {
    errors.info = "required";
  }
  if (!values.role) {
    errors.role = "required";
  }
  return errors;
};

const UpdateUser = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const { state, dispatch } = useContext(User);
  const { user } = state;


  const HandleUpdate = async (values) => {
    const endpoint = "/auth/updateUser";
    const target = URL + endpoint;
    try {
      setLoading(true);
      values.email = user.email;
      const res = await authRequest(endpoint, { updatedUser: values });
      const UpdatedUser = res.user;
      dispatch({ type: "SET_USER", payload: UpdatedUser });
      history.push("/");
    } catch (err) {
      console.log("error", err);
      setErrorMessage(err?.response?.data?.message);
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: user.username,
      team: user.team,
      role: user.role,
      info: user.info,
    },
    validate,
    onSubmit: (values) => {
      HandleUpdate(values);
    },
  });
  return (
    <>
      <div className="w-full flex flex-wrap h-screen ">
        {/* Login Section */}
        <div className="w-full md:w-1/2 bg-nt-gray flex flex-col h-full">
          <div className="flex flex-col justify-center md:justify-start my-auto  md:pt-0 px-8 md:px-24 lg:px-32">
            <p className="text-center text-3xl font-bold text-white">Tell us a little about you</p>
            <form
              className="flex flex-col pt-3 md:pt-8"
              onSubmit={formik.handleSubmit}
            >
              <div className="flex flex-col pt-4">
                <FieldName>
                  {" "}
                  username{" "}
                  {formik.errors.username ? (
                    <ErrorMessage>{formik.errors.username}</ErrorMessage>
                  ) : null}
                </FieldName>

                <Input
                  placeholder="username"
                  id="username"
                  name="username"
                  type="username"
                  onChange={formik.handleChange}
                  value={formik.values.username}
                />
              </div>

              <div className="flex flex-col pt-4">
                <FieldName>
                  {" "}
                  Team{" "}
                  {formik.errors.team ? (
                    <ErrorMessage>{formik.errors.team}</ErrorMessage>
                  ) : null}
                </FieldName>
                <select className="appearance-none shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" value={formik.values.team} onChange={formik.handleChange} name="team" id="team">
                  <option value="app" label="app" />
                  <option value="web" label="web" />
                  <option value="other" label="other" />
                </select>
              </div>

              <div className="flex flex-col pt-4">
                <FieldName>
                  {" "}
                  what You do{" "}
                  {formik.errors.role ? (
                    <ErrorMessage>{formik.errors.role}</ErrorMessage>
                  ) : null}
                </FieldName>
                <Input
                  placeholder="role"
                  id="role"
                  name="role"
                  onChange={formik.handleChange}
                  value={formik.values.role}
                />
              </div>

              <div className="flex flex-col pt-4">
                <FieldName>
                  {" "}
                  cool stuff about yourself{" "}
                  {formik.errors.info ? (
                    <ErrorMessage>{formik.errors.info}</ErrorMessage>
                  ) : null}
                </FieldName>
                <textarea
                  placeholder="info"
                  id="info"
                  name="info"
                  cols="180"
                  className="p-2"
                  onChange={formik.handleChange}
                  value={formik.values.info}
                />
              </div>

              <button
                type="submit"
                defaultValue="Update"
                className="bg-sp-green text-white font-bold text-lg  p-2 mt-8"
              >
                {loading ? <ClipLoader color="#ffffff" size={25} /> : "Submit"}
              </button>
              <div className="text-center">
                {errorMessage ? (
                  <ErrorMessage>{errorMessage}</ErrorMessage>
                ) : null}
              </div>
            </form>
          </div>
        </div>
        {/* Image Section */}
        <div
          className="hidden md:w-1/2 md:block md:h-screen"
          style={{
            backgroundSize: "cover",
            backgroundImage: "url(http://source.unsplash.com/oeNMHzJ6odw)",
            backgroundPosition: "center center",
          }}
        ></div>
      </div>
    </>
  );
};

const ErrorMessage = ({ children }) => (
  <span className="text-sm text-nt-red-accent">{children} </span>
);

const FieldName = ({ children }) => (
  <label htmlFor="email" className="text-md text-white">
    {children}
  </label>
);

const Input = (props) => (
  <input
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
    {...props}
  />
);

export default UpdateUser;
