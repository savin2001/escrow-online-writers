import { useAuthValue } from "../../assets/firebase/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../assets/firebase/firebase";
import FileUpload from "../../components/FileUpload";
import ListFiles from "../../components/ListFiles";
import Navbar from "../../components/Navbar";
import SideMenu from "../../components/SideMenu";

function Profile() {
  const { currentUser } = useAuthValue();

  return (
    <>
      <Navbar />
      <div className="w-full bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="drawer drawer-mobile">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-start justify-start mt-16">
              <div className="p-4">
                <form>
                  <div className="shadow-lg overflow-hidden sm:rounded-lg pb-4 mb-8 bg-base-100">
                    <div className="px-4 py-5 bg-base-100 space-y-6 sm:p-6">
                      <div className="flex flex-wrap">
                        <h3 className="sm:text-md md:text-lg font-bold leading-6 text-primary mr-5">
                          Personal Information
                        </h3>
                        <p className="mt-1 text-sm text-accent italic">
                          (Use a correct details such as phone numbers and email
                          where you can receive official communication during
                          checkout)
                        </p>
                      </div>
                      <div className="py-3">
                        <div className="border-t border-secondary" />
                      </div>
                      <div className="grid grid-cols-6 gap-8">
                        <div className="col-span-6 md:col-span-3 relative">
                          <label htmlFor="first_name" className="sr-only">
                            First name
                          </label>
                          <input
                            type="text"
                            id="first_name"
                            name="firstName"
                            autoComplete="given-name"
                            placeholder="First name"
                            className="input input-bordered input-neutral w-full rounded-full focus:input-primary"
                          />
                        </div>

                        <div className="col-span-6 md:col-span-3 relative">
                          <label htmlFor="second_name" className="sr-only">
                            Second name
                          </label>
                          <input
                            type="text"
                            id="second_name"
                            name="lastName"
                            autoComplete="given-name"
                            placeholder="Last name"
                            className="input input-bordered input-neutral w-full rounded-full focus:input-primary"
                          />
                        </div>

                        <div className="col-span-6 md:col-span-3 relative">
                          <label htmlFor="email-address" className="sr-only">
                            Email address
                          </label>
                          <input
                            type="text"
                            id="email-address"
                            name="email"
                            autoComplete="given-name"
                            placeholder="Email address"
                            value={currentUser?.email}
                            className="input input-bordered input-neutral w-full rounded-full focus:input-primary"
                          />
                        </div>
                        <div className="col-span-6 md:col-span-3 relative">
                          <label htmlFor="phone" className="sr-only">
                            Phone number
                          </label>
                          <input
                            type="text"
                            id="phone"
                            name="contact"
                            autoComplete="given-name"
                            placeholder="Phone number"
                            className="input input-bordered input-neutral w-full rounded-full focus:input-primary"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex w-full justify-center">
                      <label
                        htmlFor="profile-details-modal"
                        className="mt-5 btn btn-outline btn-sm btn-primary rounded-2xl"
                      >
                        Change
                      </label>
                    </div>
                    <>
                      <input
                        type="checkbox"
                        id="profile-details-modal"
                        className="modal-toggle"
                      />
                      <div className="modal">
                        <div className="modal-box">
                          <div className="details">
                            <div className="grid grid-cols-6 gap-8">
                              <div className="col-span-6 md:col-span-3 relative">
                                <label htmlFor="first_name" className="sr-only">
                                  First name
                                </label>
                                <input
                                  type="text"
                                  id="first_name"
                                  name="firstName"
                                  autoComplete="given-name"
                                  placeholder="First name"
                                  className="input input-bordered input-neutral w-full rounded-full focus:input-primary"
                                />
                              </div>

                              <div className="col-span-6 md:col-span-3 relative">
                                <label
                                  htmlFor="second_name"
                                  className="sr-only"
                                >
                                  Second name
                                </label>
                                <input
                                  type="text"
                                  id="second_name"
                                  name="lastName"
                                  autoComplete="given-name"
                                  placeholder="Last name"
                                  className="input input-bordered input-neutral w-full rounded-full focus:input-primary"
                                />
                              </div>

                              <div className="col-span-6 md:col-span-3 relative">
                                <label
                                  htmlFor="email-address"
                                  className="sr-only"
                                >
                                  Email address
                                </label>
                                <input
                                  type="text"
                                  id="email-address"
                                  name="email"
                                  autoComplete="given-name"
                                  placeholder="Email address"
                                  value={currentUser?.email}
                                  className="input input-bordered input-neutral w-full rounded-full focus:input-primary"
                                />
                              </div>
                              <div className="col-span-6 md:col-span-3 relative">
                                <label htmlFor="phone" className="sr-only">
                                  Phone number
                                </label>
                                <input
                                  type="text"
                                  id="phone"
                                  name="contact"
                                  autoComplete="given-name"
                                  placeholder="Phone number"
                                  className="input input-bordered input-neutral w-full rounded-full focus:input-primary"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="modal-action flex justify-between uppercase">
                            <label
                              htmlFor="profile-details-modal"
                              className="btn btn-sm btn-outline btn-error rounded-2xl"
                            >
                              cancel
                            </label>
                            <label
                              htmlFor="profile-details-modal"
                              className="btn btn-sm btn-success text-base-100 flex rounded-2xl"
                            >
                              update details
                            </label>
                          </div>
                        </div>
                      </div>
                    </>
                  </div>
                </form>
              </div>
              <div className="file-upload w-full">
                <FileUpload />
                <ListFiles />
              </div>
            </div>
            <SideMenu />
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
