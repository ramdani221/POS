"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter()
  const [data, setData] = useState({ email: "", password: "" });
  const [alert, setAlert] = useState(false)

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await signIn("domain-login", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    if(res?.error || !res?.ok) return setAlert(true)
    router.push('http://localhost:3000/home')
  };

  return (
    <main className="d-flex align-items-center bg-gradient-primary" id="main">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-12 col-md-9">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
                <div className="row">
                  <div className="col-lg-6 d-flex align-items-center bg-black ps-3 pe-1">
                    <Image
                      className="d-none d-lg-block object-fit-contain"
                      src="/rubicamp.png"
                      alt="rubicamp"
                      style={{ width: "100%", objectFit: "contain" }}
                      width={625}
                      height={200}
                    />
                  </div>
                  <div className="col-lg-6">
                    <div className="p-5">
                      {alert && <div
                        className="alert alert-danger d-flex justify-content-center"
                        role="alert"
                      >
                        <div>Email or Password is Wrong!</div>
                      </div>}
                      <div className="text-center">
                        <h1 className="h1 text-gray-900 mb-4">Pont of Sales</h1>
                      </div>
                      <hr className="border-top border-secondary" />
                      <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                      </div>
                      <form className="user" onSubmit={login}>
                        <div className="form-group">
                          <input
                            type="email"
                            className="form-control form-control-user"
                            id="exampleInputEmail"
                            aria-describedby="emailHelp"
                            placeholder="Enter Email Address..."
                            onChange={(e) =>
                              setData({ ...data, email: e.target.value })
                            }
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="password"
                            className="form-control form-control-user"
                            id="exampleInputPassword"
                            placeholder="Password"
                            onChange={(e) =>
                              setData({ ...data, password: e.target.value })
                            }
                          />
                        </div>
                        <div className="form-group">
                          <div className="custom-control custom-checkbox small">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck"
                            />
                            <label
                              className="custom-control-label"
                              form="customCheck"
                            >
                              Remember Me
                            </label>
                          </div>
                        </div>
                        <button
                          className="btn btn-primary btn-user btn-block"
                          type="submit"
                        >
                          Login
                        </button>
                      </form>
                      <hr className="border-top border-secondary" />
                      <div className="text-center">
                        <Link className="small" href="#">
                          Forgot Password?
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
