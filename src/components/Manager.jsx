import React from "react";
import { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import "react-toastify/dist/ReactToastify.css";

//show password
const Manager = () => {
  const ref = useRef();
  const PasswordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  //get password from api
  const getPasswords = async () => {
    let req = await fetch("http://localhost:3000/");
    let passwords = await req.json();
    console.log(passwords);
    setPasswordArray(passwords);
  };

  useEffect(() => {
    getPasswords();
  }, []);

  //copy text
  const copyText = (text) => {
    toast("🦄 Copied to Clipboard!!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  };

  // show password
  const showPassword = () => {
    PasswordRef.current.type = "text";
    if (ref.current.src.includes("icons/delete.png")) {
      ref.current.src = "icons/icons8-eye-30.png";
      PasswordRef.current.type = "password";
    } else {
      PasswordRef.current.type = "text";
      ref.current.src = "icons/delete.png";
    }
  };

  // here password will be save
  const savePassword = async () => {
    //if any id such id exits in the database delete it
    await fetch("http://localhost:3000/", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: form.id }),
    });

    setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
    await fetch("http://localhost:3000/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, id: uuidv4() }),
    });
    // localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id: uuidv4()}]))
    // console.log([...passwordArray, form])
    setform({ site: "", username: "", password: "" });
    toast("🦄 Password saved Successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  };
  // Delete password
  const deletePassword = async (id) => {
    console.log("Deleting password with", id);
    let c = confirm("Do You really want to delete this password");
    if (c) {
      setPasswordArray(passwordArray.filter((item) => item.id !== id));
      // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id)))
      let res = await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      toast("🦄 Password Deleted!!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };
  //Edit password
  const editPassword = (id) => {
    console.log("Editing password with", id);
    setform({ ...passwordArray.filter((i) => i.id === id)[0], id: id });
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  // Main Content
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />

      <div className="  max-w-4xl mycontainer px-10  min-h-[92.5vh]">
        <h1 className="text-4xl text font-bold text-center">
          <span className="text-green-700">&lt; </span>
          Pass
          <span className="text-green-700">OP/ &gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center">
          Your Own Password Manager
        </p>
        <div className="flex flex-col p-4 text-black gap-8 items-center">
          <input
            onChange={handleChange}
            value={form.site}
            className="rounded-full border-2 border-green-500 w-full p-4 py-1"
            type="text"
            name="site"
            id="site"
            placeholder="Enter Website URL??"
          />
          <div className="flex w-full justify-between gap-8">
            <input
              onChange={handleChange}
              value={form.username}
              className="rounded-full border-2 border-green-500 w-full p-4 py-1"
              type="text"
              name="username"
              id="username"
              placeholder="Enter User Name??"
            />

            <div className="relative">
              <input
                ref={PasswordRef}
                onChange={handleChange}
                value={form.password}
                className="rounded-full border-2 border-green-500 w-fit p-4 py-1"
                type="password"
                name="password"
                id="password"
                placeholder="Enter Password??"
              />
              <span className="absolute right-0 top-1" onClick={showPassword}>
                <img
                  ref={ref}
                  className="px-2"
                  width={36}
                  src="icons/icons8-eye-30.png"
                  alt="eye"
                />
              </span>
            </div>
          </div>

          <button
            onClick={savePassword}
            className="flex justify-center items-center bg-green-600 hover:bg-green-400 
rounded-full px-8 py-2 w-fit font-bold gap-2 border-2 border-green-950"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Add Password
          </button>
        </div>

        <div className="passwords">
          <h2 className="font-bold text-2xl py-4">Your Password</h2>
          {passwordArray.length === 0 && <div>No password to show</div>}
          {passwordArray.length != 0 && (
            <table
              className="table-auto w-full rounded-md 
    overflow-hidden mb-10"
            >
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-2">WebSite</th>
                  <th className="py-2">UserName</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Action</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="py-2 border border-white text-center ">
                        <div className="flex items-center justify-center">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                          <div
                            className="size-7 cursor-pointer"
                            onClick={() => {
                              copyText(item.site);
                            }}
                          >
                            <img src="icons/copy.png" width={20} alt="" />
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center">
                        <div className="flex items-center justify-center">
                          {item.username}
                          <div
                            className="size-7 cursor-pointer"
                            onClick={() => {
                              copyText(item.username);
                            }}
                          >
                            <img src="icons/copy.png" width={20} alt="" />
                          </div>
                        </div>
                      </td>
                      <td className="flex items-center justify-center py-2 border border-white text-center">
                        <div className="flex items-center justify-center">
                          {"*".repeat(item.password.length)}
                          <div
                            className="size-7 cursor-pointer"
                            onClick={() => {
                              copyText(item.password);
                            }}
                          >
                            <img src="icons/copy.png" width={20} alt="" />
                          </div>
                        </div>
                      </td>
                      <td className="  justify-center py-2 border border-white text-center justify-">
                        <span className="cursor-pointer flex gap-3 justify-evenly">
                          <img
                            onClick={() => {
                              editPassword(item.id);
                            }}
                            src="icons/editing.png"
                            width={20}
                            alt=""
                          />
                          <img
                            onClick={() => {
                              deletePassword(item.id);
                            }}
                            src="icons/trash.png"
                            width={20}
                            alt=""
                          />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
