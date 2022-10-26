import Navbar from "../../components/Navbar";
import SideMenu from "../../components/SideMenu";

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <div className="w-full bg-secondary">
        <div className="max-w-7xl mx-auto ">
          <div className="drawer drawer-mobile">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-start justify-start mt-16  py-6 sm:px-6 lg:px-8">
              <header className="w-full">
                <h2 className="my-6 text-left text-3xl font-extrabold text-neutral">
                  Dashboard
                </h2>
              </header>
              <main className="w-full">
                <div className="grid grid-cols-12 gap-8">
                  <div className="col-span-6 md:col-span-3">
                    <div className="stats shadow bg-primary text-primary-content">
                      <div className="stat">
                        <div className="stat-title">Total Page Views</div>
                        <div className="stat-value">89,400</div>
                        <div className="stat-desc">
                          21% more than last month
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </main>
            </div>
            <SideMenu />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
