import { useAuthValue } from "../../assets/firebase/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../assets/firebase/firebase";
import FileUpload from "../../components/FileUpload";

function Profile() {
  const { currentUser } = useAuthValue();

  return (
    <div className="container mx-auto">
      <div className="min-h-full max-w-7xl flex items-center justify-center py-12 lg:px-8">
        <div className="mx-3 sm:w-full  md:max-w-md w-full space-y-8  mt-16">
          <div className="profile">
            <h1>Profile</h1>
            <p>
              <strong>Email: </strong>
              {currentUser?.email}
            </p>
            <p>
              <strong>Email verified: </strong>
              {`${currentUser?.emailVerified}`}
            </p>
            <span onClick={() => signOut(auth)}>Sign Out</span>
          </div>
          <div className="file-upload">
            <FileUpload />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
