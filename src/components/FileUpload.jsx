import React from "react";
import { FaFileUpload } from "react-icons/fa";
import { store } from "../assets/firebase/firebase";

const FileUpload = () => {
  const fileHandler = (e) => {
    e && e.preventDefault();
    const file = e.target[0].files[0];
    console.log(file.name);
  };
  const uploadFile = (file) => {};
  return (
    <div className="container mx-auto">
      <div className="w-full flex items-center justify-center py-12 lg:px-8">
        <div>
          <label className="block text-md font-semibold text-neutral">
            Upload task
          </label>
          <div className="mt-1 flex flex-col items-center">
            <span className="inline-block sm:h-1/4 sm:w-1/3 md:h-1/3 md:w-1/6 rounded-full overflow-hidden bg-secondary hover:shadow-xl">
              <label htmlFor="profile-pic-modal hover:cursor-pointer"></label>
            </span>
            <label
              htmlFor="profile-pic-modal"
              className="mt-5 btn btn-outline btn-sm btn-primary rounded-2xl"
            >
              Choose file
            </label>
          </div>
        </div>
        <>
          <input
            type="checkbox"
            id="profile-pic-modal"
            className="modal-toggle"
          />
          <div className="modal">
            <form className="modal-box" onSubmit={fileHandler}>
              <div>
                <label className="block text-md font-semibold text-neutral">
                  File upload
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <FaFileUpload className="mx-auto h-12 w-12 text-accent font-thin" />

                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-base-100 rounded-md font-medium text-primary hover:underline"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-accent">
                      DOC, DOCX, XLS, XLXS, PNG, JPG and PDF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
              <div className="modal-action flex justify-between uppercase">
                <label
                  htmlFor="profile-pic-modal"
                  className="btn btn-sm btn-outline btn-error rounded-2xl"
                >
                  cancel
                </label>
                <button
                  type="submit"
                  className="btn btn-sm btn-primary rounded-2xl"
                >
                  upload file
                </button>
              </div>
            </form>
          </div>
        </>
      </div>
    </div>
  );
};

export default FileUpload;
