import { Editor } from "@tinymce/tinymce-react";
import { useRef, useState } from "react";
export default function EditProduct() {
  const [price, setPrice] = useState("$");
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const editorRef = useRef(null);

  return (
    <div className="w-full min-h-screen p-4 bg-gray-100">
      <div className="flex justify-between border-b-2 pb-2">
        <div className="flex">
          <h1 className="text-2xl font-semibold">Edit Product </h1>
          <p className="mt-2 ml-2 text-sm text-slate-500">
            / Categories / Edit Category
          </p>
        </div>
        <div>
          <button className="p-3 bg-slate-200 text-gray-500 rounded-md md:mr-3">
            Duplicate
          </button>
          <button className=" ml-1 p-3 bg-black text-white rounded-md">
            Save
          </button>
        </div>
      </div>
      <div className="md:flex">
        <section className="bg-slate-50 p-2 m-2 md:w-2/3">
          <h3 className="my-3 text-lg font-semibold">Basic Information</h3>
          <label
            htmlFor="countries_multiple"
            className="block mb-2 text-sm font-semibold text-gray-900  w-full "
          >
            Brand Name
          </label>
          <select
            id="countries_multiple"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
          >
            <option value="headphone">Apple</option>
            <option value="mobile">Walton</option>
          </select>
          <div className="flex py-4">
            <div>
              <label
                htmlFor="countries_multiple"
                className="block mb-2 text-sm font-semibold text-gray-900  w-full "
              >
                Category
              </label>
              <select
                id="countries_multiple"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-48 p-4 md:w-96"
              >
                <option value="headphone">Headphone</option>
                <option value="mobile">Mobile Phone</option>
              </select>
            </div>
            <div className="pl-16 md:pl-40">
              <label
                htmlFor="countries_multiple"
                className="block mb-2 text-sm font-semibold text-gray-900  w-full "
              >
                Sub Category
              </label>
              <select
                id="countries_multiple"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-48 p-4 md:w-96"
              >
                <option value="headphone">Headphone</option>
                <option value="mobile">Mobile Phone</option>
              </select>
            </div>
          </div>
          <div className="flex ">
            <div>
              <label
                htmlFor="countries_multiple"
                className="block mb-2 text-sm font-semibold text-gray-900  w-full "
              >
                Price
              </label>
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="text"
                className="p-2.5 mb-2 rounded-lg w-full border-2 md:w-96"
              />
            </div>
            <div className="pl-16 md:pl-40">
              <label
                htmlFor="countries_multiple"
                className="block mb-2 text-sm font-semibold text-gray-900  w-full "
              >
                Quantity
              </label>
              <input
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                type="text"
                className="p-2.5 mb-2 rounded-lg w-full border-2 md:w-96"
              />
            </div>
          </div>
          <label
            htmlFor="countries_multiple"
            className="block mb-2 text-sm font-semibold text-gray-900  w-full "
          >
            Product Name
          </label>
          <input
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            type="text"
            className="p-2.5 rounded-lg border-2  w-full"
          />

          {/* TinyMCE Section */}
          <div className="py-4">
            <label
              htmlFor="countries_multiple"
              className="block mb-2 text-sm font-semibold text-gray-900  w-full "
            >
              Description
            </label>
            <Editor
              onInit={(evt, editor) => (editorRef.current = editor)}
              initialValue="<p>This is the initial content of the editor.</p>"
              init={{
                height: 500,
                menubar: false,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | " +
                  "bold italic backcolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
            />
          </div>
        </section>
        <section className="bg-slate-50 p-2 m-1 md:w-1/3">
          <h3 className="my-3 text-lg font-semibold">Visibility</h3>
          <div className="flex items-center ">
            <div className="flex items-center">
              <input
                id="published"
                type="radio"
                value=""
                name="default-radio"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500  focus:ring-2  "
              />
              <label
                htmlFor="published"
                className="ml-2 text-sm font-bold text-gray-900"
              >
                Published
              </label>
            </div>
            <div className="flex items-center pl-2">
              <input
                checked
                id="Schedule"
                type="radio"
                value=""
                name="default-radio"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500   focus:ring-2 "
              />
              <label
                htmlFor="Schedule"
                className="ml-2 text-sm font-bold text-gray-900 "
              >
                Schedule
              </label>
            </div>
            <div className="flex items-center pl-2">
              <input
                checked
                id="hidden"
                type="radio"
                value=""
                name="default-radio"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500   focus:ring-2 "
              />
              <label
                htmlFor="hidden"
                className="ml-2 text-sm font-bold text-gray-900 "
              >
                Hidden
              </label>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
