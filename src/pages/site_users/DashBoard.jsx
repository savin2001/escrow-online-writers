import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AdminDashboard from "../../components/AdminDashboard";
import Navbar from "../../components/Navbar";
import SideMenu from "../../components/SideMenu";
import WriterDashboard from "../../components/WriterDashboard";

const Dashboard = () => {
  const userRole = ["admin", "writer"];
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  let user = null;
  useEffect(() => {
    if (isInitialRender) {
      user = JSON.parse(localStorage.getItem("upd"));
      setCurrentUser(user);
      setIsInitialRender(false);
      setLoading(false);
    }
  }, [loading, currentUser, isInitialRender]);

  return (
    <>
      <Navbar />
      <div className="w-full bg-secondary">
        <div className="max-w-7xl mx-auto ">
          <div className="drawer drawer-mobile">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            {loading ? (
              <div className="shadow-xl p-10 h-96 max-h-screen">
                <h3 className="mt-9 lg:text-2xl sm:text-xl text-primary pb-6 text-center">
                  Authenticating user...
                </h3>

                <div className="flex justify-center items-center h-3/4">
                  <FaSpinner className="h-1/4 w-1/4 text-primary animate-spin" />
                </div>
              </div>
            ) : (
              <>
                <div className="drawer-content flex flex-col items-start justify-start mt-16  py-6 sm:px-6 lg:px-8">
                  <header className="w-full">
                    <h2 className="my-6 text-left text-3xl font-extrabold text-neutral">
                      Welcome {currentUser ? currentUser.first_name : ""}
                    </h2>
                  </header>
                  <main className="w-full">
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-accent border-dashed rounded-md">
                      {currentUser ? (
                        <>
                          {currentUser.user_type === userRole[0] ? (
                            <AdminDashboard />
                          ) : (
                            <WriterDashboard />
                          )}
                        </>
                      ) : (
                        <>
                        {/* <Navigate to='/' replace/> */}
                          <div className="container mx-auto text-center ">
                            <h1 className="mt-8">Error fetching data</h1>
                            <p className="zoom-area mb-5">
                              <b>Oopsie!</b> seems like the data was not
                              fetched.
                            </p>
                            <div className="link-container text-center mb-3">
                              <Link
                                to="/"
                                className="more-link btn btn-active border-none bg-primary hover:bg-base-100 hover:border-2 hover:border-primary hover:text-primary p-4 rounded-full text-base-100 animate-pulse"
                              >
                                Refresh to re-fetch
                              </Link>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </main>
                </div>
                <SideMenu />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
