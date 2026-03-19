import React, { useContext } from "react";
import { AuthContext } from "../../component/LoginRegisterComponent/AuthContext";
import Right_side_dashbaord from "./Right_side_dashbaord";
import PostContinerCentre from "./PostContinerCentre";

const Dashboard = ({ profile, setpostLimit, post }) => {
  const { user } = useContext(AuthContext);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="bg-[#ffeeee] min-h-screen w-full">

      <div className="flex gap-5 max-w-6xl mx-20">

        <div className="hidden lg:block">
          <Right_side_dashbaord profile={profile} />
        </div>

        <PostContinerCentre
          profile={profile}
          setpostLimit={setpostLimit}
          post={post}
        />

      </div>

    </div>
  );
};

export default Dashboard;