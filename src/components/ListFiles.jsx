import { useEffect, useState } from "react";
import { useAuthValue } from "../assets/firebase/AuthContext";
import { store } from "../assets/firebase/firebase";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import {
  AiOutlineFile,
  AiOutlineFileUnknown,
  AiOutlineDownload,
} from "react-icons/ai";

const ListFiles = () => {
  const { currentUser } = useAuthValue();
  const [error, setError] = useState(null);
  const [docList, setDocList] = useState([]);

  // Show the files uploaded
  const listUploadedFiles = () => {
    const storageRef = ref(store, `/files`);
    listAll(storageRef)
      .then((res) => {
        setDocList(res.items);
      })
      .catch((err) => {
        // Uh-oh, an error occurred!
        setError(err.message);
      });
    return () => {
      null;
    };
  };
  useEffect(() => {
    listUploadedFiles();
  }, []);

  // Download files
  const downloadDoc = (fileName) => {
    if (!fileName) {
      return setError("Kindly choose a file to download");
    }
    getDownloadURL(ref(store, `/files/${fileName}`))
      .then((url) => {
        // `url` is the download URL for the file
        window.open(url, "_blank");
        setError("");
        // This can be downloaded directly:
        // const xhr = new XMLHttpRequest();
        // xhr.responseType = "blob";
        // xhr.onload = (event) => {
        //   const blob = xhr.response;
        // };
        // xhr.open("GET", url);
        // xhr.send();
      })
      .catch((err) => {
        // A list of error codes
        switch (err.code) {
          case "storage/object-not-found":
            setError(err.message);
            break;
          case "storage/unauthorized":
            setError(err.message);
            break;
          case "storage/canceled":
            setError(err.message);
            break;
          case "storage/unknown":
            setError(err.message);
            break;
        }
      });
  };
  return (
    <div className="mx-auto">
      <div className="w-full flex items-center justify-center py-12 lg:px-8">
        <div className="overflow-x-auto w-full">
          {error && (
            <div className="mt-12 text-sm uppercase p-4 text-base-100 bg-error text-center rounded-3xl">
              <label htmlFor="profile-pic-modal" className="mt-2">
                {error}
              </label>
            </div>
          )}
          {docList.length > 0 ? (
            <>
              <label className="block text-lg font-semibold text-neutral">
                Uploaded tasks
              </label>
              <ul className="menu bg-base-100 w-full">
                {docList.map((doc, _index) => (
                  <>
                    <li key={_index}>
                      <div
                        className="flex flex-row justify-between h-fit p-2"
                        onClick={() => {
                          downloadDoc(doc.name);
                        }}
                      >
                        <span className="font-bold text-sm">{doc.name}</span>
                        <button className="btn btn-link btn-primary rounded-full p-2">
                          <AiOutlineDownload className="mx-auto justify-center h-6 w-6" />
                        </button>
                      </div>
                    </li>
                    <hr />
                  </>
                ))}
              </ul>
            </>
          ) : (
            <div className="container mx-auto w-screen mb-10">
              <div className="container mx-auto text-center ">
                <h1 className="mt-8 text-xl font-bold">
                  Seems like you have no items
                </h1>
                <p className="zoom-area mb-5">
                  Do you want to{" "}
                  <b className="text-primary underline">
                    <label htmlFor="profile-pic-modal">upload files</label>
                  </b>
                </p>
                <div className="link-container text-center mb-3">
                  <AiOutlineFileUnknown className="mx-auto h-48 w-48 font-thin text-accent" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListFiles;
