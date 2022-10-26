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
    const storageRef = ref(store, `/${currentUser.uid}/files`);
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
    getDownloadURL(ref(store, `/${currentUser.uid}/files/${fileName}`))
      .then((url) => {
        // `url` is the download URL for the file
        window.open(url, "_blank");
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
            <table className="table w-full">
              <thead>
                <tr>
                  {/* <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th> */}
                  <th>Name</th>
                  <th>Download</th>
                  {/* <th>Size</th>
                  <th>Last modified</th> */}
                </tr>
              </thead>
              <tbody>
                {docList.map((doc, _index) => (
                  <tr key={_index}>
                    {/* <th>
                      <label>
                        <input type="checkbox" className="checkbox" />
                      </label>
                    </th> */}
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask w-12 h-12">
                            <AiOutlineFile className="mx-auto h-12 w-12 font-thin" />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold text-sm">{doc.name}</div>
                          <div className="text-sm opacity-50">{}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <button
                        className="btn btn-ghost btn-xs"
                        onClick={() => {
                          downloadDoc(doc.name);
                        }}
                      >
                        <AiOutlineDownload className="mx-auto h-6 w-6 font-thin" />
                      </button>
                    </td>
                    {/* <td>
                      Zemlak, Daniel and Leannon
                      <br />
                      <span className="badge badge-ghost badge-sm">
                        Desktop Support Technician
                      </span>
                    </td>
                    <td>Purple</td> */}
                  </tr>
                ))}
              </tbody>
              <tfoot>{/* In case pagination is included */}</tfoot>
            </table>
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
