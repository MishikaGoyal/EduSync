"use client";
import { CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function logIn(loginId, password) {
    if (loginId === "" || password === "") {
      return;
    }
    try {
      setLoading(true);
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ loginId, password }),
      });
      const resData = await res.json();
      if (res.status === 200) {
        sessionStorage.setItem("userId", resData.loginId);
        sessionStorage.setItem("udiseId", resData.udiseId);
        router.push(`/${resData.role.toLowerCase()}`);
      } else {
        setLoading(false);
        if (resData.message === "Invalid user") {
          alert("username invalid");
        } else if (resData.message === "Incorrect password") {
          alert("password is incorrect");
        }
      }
      console.log(resData.message);
    } catch (error) {
      console.error("an unexpected error occured", error);
    }
  }

  return (
    <>
      {loading ? (
        <div className="w-[100%] h-[100%] fixed border-2 border-black">
          <div className="absolute top-[50%] left-[50%] translate-x-[-50%] tranlate-y-[-50%]">
            {" "}
            <ClipLoader />
          </div>
        </div>
      ) : (
        <>
          {" "}
          <div>
            <div className="absolute mt-[50px]">
              <img
                src="https://cdn.pixabay.com/photo/2015/08/05/13/55/children-876543_1280.jpg"
                alt=""
                className="mt-[70px] ml-[80px] w-[400px]"
              />
              <img
                src="https://cdn.pixabay.com/photo/2018/09/04/10/27/never-stop-learning-3653430_1280.jpg"
                alt=""
                className="w-[400px] ml-[80px]"
              />
              <div className="flex">
                <img
                  src="https://cdn.pixabay.com/photo/2017/12/22/08/01/book-3033196_1280.jpg"
                  alt=""
                  className="w-[400px] ml-[480px] -mt-[493px]"
                />
              </div>
            </div>
            <div className="stats stats-vertical lg:stats-horizontal shadow absolute mt-[320px] ml-[80px] ">
              <div className="stat">
                <div className="stat-title tracking-in-expand-fwd">
                  Categorising Schools
                </div>
                <div className="stat-value">Odd</div>
                <div className="stat-desc">Standard</div>
              </div>

              <div className="stat">
                <div className="stat-title tracking-in-expand-fwd">
                  Restructure
                </div>
                <div className="stat-value">Strategy</div>
                <div className="stat-desc">Ways</div>
              </div>

              <div className="stat">
                <div className="stat-title tracking-in-expand-fwd">
                  Resource
                </div>
                <div className="stat-value">Allocation</div>
                <div className="stat-desc">To Transform</div>
              </div>
              <div className="stat ">
                <div className="stat-title tracking-in-expand-fwd">
                  Feedback
                </div>
                <div className="stat-value">Verify</div>
                <div className="stat-desc">Discussions</div>
              </div>
            </div>
          </div>
          <div className="grid place-items-center h-[100vh] ml-[900px] w-[500px] border-r-black ">
            <div className="w-[20rem] bg-white shadow-lg border rounded-lg p-6">
              <h2 className="text-lg font-semibold text-center mb-4">Login</h2>
              <div className="flex flex-col space-y-4">
                <div className="w-full text-black border rounded-md">
                  <input
                    className="w-full py-2 px-3 rounded-md tracking-in-expand-fwd focus:outline-none focus:ring focus:ring-blue-300"
                    type="text"
                    placeholder="Login ID"
                    value={loginId}
                    onChange={(e) => setLoginId(e.target.value)}
                  />
                </div>
                <div className="w-full text-black border rounded-md">
                  <input
                    className="w-full py-2 px-3 rounded-md tracking-in-expand-fwd focus:outline-none focus:ring focus:ring-blue-300"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button
                  className="w-full py-2 bg-black text-white rounded-md hover:bg-slate-600 transition-colors flex items-center justify-center"
                  onClick={() => logIn(loginId, password)}
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
