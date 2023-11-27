import {
  AddRounded,
  StarHalfRounded,
  StarOutlineRounded,
  StarRounded,
  VerifiedRounded,
} from "@mui/icons-material";
import Sidebar from "./Sidebar";

export default function SellerProfile() {
  return (
    <div>
      <Sidebar />
      <div className=" ml-48 p-4 md:p-8">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold">Seller Profile</h2>
          <button className="px-4 py-2  text-sm rounded-lg bg-blue-500 hover:bg-blue-600 font-medium text-white">
            <AddRounded className="mb-0-0.5" fontSize="small" /> Create Selller
          </button>
        </div>
        <section className="py-4 border-b">
          <div className="flex items-center">
            {/* Need to define a fix Height and Width of this Image */}
            <img
              className="border-2"
              src="https://cdn.britannica.com/94/193794-004-AA169EBF/Adidas-logo.jpg?c=crop&h=80&w=113"
              alt=""
            />
            <div className="pl-3">
              <span className="text-xl font-bold">Adidas, inc.</span>
              <VerifiedRounded
                fontSize="small"
                className="ml-1 mb-1 text-gray-400"
              />
              <br />
              <span className="text-sm text-gray-500">
                Lorem ipsum, dolor sit amet consectetur
              </span>
            </div>
          </div>
        </section>
        <section className="py-4 text-center md:text-left border-b md:flex md:justify-evenly">
          <div className="py-2">
            <h1 className=" font-bold text-lg">Total Rating :</h1>
            <div>
              <StarRounded className="text-yellow-400" />
              <StarRounded className="text-yellow-400" />
              <StarRounded className="text-yellow-400" />
              <StarHalfRounded className="text-yellow-400" />
              <StarOutlineRounded className="text-yellow-400" />
            </div>
            <span className=" font-bold">4.8 / 547 Reviews</span>
          </div>
          <div className="py-2 font-semibold">
            <h1 className=" font-bold text-lg">Contacts</h1>
            <span className="text-gray-500">info@email.com</span> <br />
            <span className="text-gray-500">
              +8801650000000, +8801652445544
            </span>
          </div>
          <div className="py-2 font-semibold">
            <h1 className=" font-bold text-lg">Address</h1>
            <span className="text-gray-500">Country : Bangladesh</span> <br />
            <span className="text-gray-500">
              Address: Kazipur, Sirajganj
            </span>{" "}
            <br />
            <span className="text-gray-500">Postal code: 6710</span>
          </div>
        </section>
        <section className="py-2    ">
          <h1 className="text-xl font-semibold py-1">
            Verify Identification Card
          </h1>
          <div className=" flex justify-between gap-10 ">
            

            <div className="flex items-center justify-center w-full">
            
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 "
              >
                <p className="py-2">ID Card Front Side</p>
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 ">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" />
              </label>
            </div>
            

            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 "
              >
                <p className="py-2">ID Card Back Side</p>
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 ">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" />
              </label>
            </div>
          </div>

          <div className="py-4">
            <input
              type="text"
              className="p-3 w-full rounded-lg text-lg border-2"
              placeholder="Name on ID Card"
            />
            <p className="py-2">NID number should be either 10/13/17 digits</p>
            <input
              type="text"
              className="p-3 w-full rounded-lg text-lg border-2"
              placeholder="Number on ID Card"
            />
            <button className="px-4 py-2 mt-2  text-sm rounded-lg bg-blue-500 hover:bg-blue-600 font-medium text-white">
              Submit
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
