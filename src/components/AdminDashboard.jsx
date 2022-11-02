import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AdminDashboard = ({ currentUser }) => {
  const [writersTotal, setWritersTotal] = useState(null);
  useEffect(() => {
    //  async () => {
    //   const coll = collection(db, "users");
    //   const snapshot = await getDocs(coll);
    //   console.log(snapshot.count);
    //   querySnapshot.forEach((doc) => {
    //     // doc.data() is never undefined for query doc snapshots
    //     console.log(doc.id, " => ", doc.data());
    //   });
    //   setWritersTotal(snapshot.count);
    // };
  }, []);
  return (
    <div className="mb-8">
      <div className="flex sm:flex-wrap md:flex-nowrap sm:justify-center lg:justify-start mb-6 sm:gap-4 lg:gap-8">
        <div className="stats shadow-md w-full sm:max-w-xs bg-base-100 text-neutral">
          <Link to={`/${currentUser.uid}/tasks`}>
            <div className="stat">
              <div className="stat-title font-bold">Total Tasks</div>
              <div className="stat-value text-primary">89,400</div>
              <div className="stat-desc">21% more than last month</div>
            </div>
          </Link>
        </div>
        <div className="stats shadow-md w-full sm:max-w-xs bg-base-100 text-neutral">
          <Link to={`/${currentUser.uid}/writers`}>
            <div className="stat">
              <div className="stat-title font-bold">Writers</div>
              <div className="stat-value text-primary">4</div>
              <div className="stat-desc">21% more than last month</div>
            </div>
          </Link>
        </div>
        <div className="stats shadow-md w-full sm:max-w-xs bg-base-100 text-neutral">
          <Link to={`/${currentUser.uid}/payments`}>
            <div className="stat">
              <div className="stat-title font-bold">Payment</div>
              <div className="stat-value text-primary">89,400</div>
              <div className="stat-desc">21% more than last month</div>
            </div>
          </Link>
        </div>
      </div>
      <div className="mb-5">
        <h3 className="mt-8 mb-4 text-left text-xl font-extrabold text-neutral">
          Tasks
        </h3>
        <div className="flex sm:flex-wrap md:flex-nowrap sm:justify-center lg:justify-start mb-6 sm:gap-4 lg:gap-8">
          <div className="stats shadow-md w-full sm:max-w-xs lg:max-w-sm bg-info text-base-100">
            <div className="stat">
              <div className="stat-title">New Tasks</div>
              <div className="stat-value">89,400</div>
            </div>
          </div>
          <div className="stats shadow-md w-full sm:max-w-xs bg-warning text-base-100">
            <div className="stat">
              <div className="stat-title">Completed Tasks</div>
              <div className="stat-value">89,400</div>
            </div>
          </div>
          <div className="stats shadow-md w-full sm:max-w-xs bg-success text-base-100">
            <div className="stat">
              <div className="stat-title">Verified Tasks</div>
              <div className="stat-value">89,400</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
