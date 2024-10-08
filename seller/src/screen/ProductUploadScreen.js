import React, { useContext, useState, useEffect, useRef } from "react";
import Sidebar from "../component/Sidebar";
import axios from "axios";

import { Editor } from "@tinymce/tinymce-react";
import CancelIcon from '@mui/icons-material/Cancel';

//import '../css/ProductUploadScreen.css'
import { Store } from "../Store";
function ProductUploadScreen() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [chieldCategory, setChieldCategory] = useState([]);
  const [chieldCategoryId, setChieldCategoryId] = useState("");
  const [brand, setBrand] = useState();
  const [description, setDescription] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [multipleImage, setMultipleImages] = useState([]);
  const [submitCategory, setSubmitCategory] = useState("");
  const [imageShow, setImageShow] = useState([]);

  const editorRef = useRef(null);

  const handleMultipleImageChange = (e) => {
    const files = e.target.files;
    const length = files.length;
    setMultipleImages([...multipleImage, ...files]);
    let imageUrl = [];
    for (let i = 0; i < length; i++) {
      imageUrl.push({ url: URL.createObjectURL(files[i]) });
    }
    setImageShow([...imageShow, ...imageUrl]);
  };

  const changeImage = (img,index) => {
    if(img){
      let tempUrl = imageShow
      let tempImage = multipleImage

      tempImage[index] = img
      tempUrl[index]={url: URL.createObjectURL(img)}
      setImageShow([...tempUrl])
      setMultipleImages([...tempImage])
    }
  }

  const removeImage= (i) => {
    const filterImage = multipleImage.filter((img,index) => index !== i)
    const filterImageUrl = imageShow.filter((img,index) => index !== i)

    setMultipleImages(filterImage)
    setImageShow(filterImageUrl)
  }

  useEffect(() => {
    const fatchData = async () => {
      const category = await axios.get(`api/seller/category/getcategory`, {
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
      setCategory(category.data);
    };
    fatchData();
  }, [userInfo.token]);

  useEffect(() => {
    const fatchData = async () => {
      const category = await axios.get(
        `api/seller/category/chield_category/${categoryId}`,
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );
      setChieldCategory(category.data);
    };
    fatchData();
  }, [userInfo.token, categoryId]);

  useEffect(() => {
    setSubmitCategory(categoryId);
  }, [categoryId]);

  useEffect(() => {
    setSubmitCategory(chieldCategoryId);
  }, [chieldCategoryId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("name", name);
    form.append("description", description);
    form.append("price", price);
    form.append("brand", brand);
    form.append("category", submitCategory);
    form.append("countInStock", countInStock);
    if (multipleImage) {
      multipleImage.forEach((image, index) => {
        form.append("multipleImage", image);
      });
    } else {
      console.log("problem");
    }

    try {
      const upload = await axios.post(`/api/product/create`, form, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      console.log(upload);
      alert("product upload successfully");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <Sidebar />
      <div style={{ paddingLeft: "200px" }}>
        <div className="w-full min-h-screen p-4 bg-gray-100">
          <div className="flex justify-between border-b-2 pb-2">
            <div className="flex">
              <h1 className="text-2xl font-semibold">Product Upload</h1>
            </div>
            <div>
              <button
                type="button"
                class="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Upload Product
              </button>
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            method="post"
            encType="multipart/form-data"
            className="row g-3"
          >
            <div className="md:flex">
              <section className="bg-slate-50 p-2 m-2 md:w-2/3">
                <h3 className="my-3 text-lg font-semibold">
                  Basic Information
                </h3>
                <div>
                  <label
                    htmlFor="countries_multiple"
                    className="block mb-2 text-sm font-semibold text-gray-900  w-full "
                  >
                    Product Name
                  </label>
                  <input
                    type="text"
                    className="p-2.5 rounded-lg border-2  w-full"
                    id="inputName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
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
                    onEditorChange={(des, edt) => {
                      setDescription(des);
                    }}
                    init={{
                      height: 400,
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
                <div>
                  <label
                    htmlFor="countries_multiple"
                    className="block mb-2 text-sm font-semibold text-gray-900  w-full "
                  >
                    Brand Name
                  </label>
                  <input
                    type="text"
                    className="p-2.5 rounded-lg border-2  w-full"
                    id="brandname"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  />
                </div>
                <div className="flex justify-between py-4">
                  <div>
                    <label
                      htmlFor="countries_multiple"
                      className="block mb-2 text-sm font-semibold text-gray-900  w-full "
                    >
                      Category
                    </label>
                    <select
                      id="countries_multiple"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-48 p-4 md:w-60"
                      value={categoryId}
                      onChange={(e) => setCategoryId(e.target.value)}
                    >
                      <option>Select Category</option>
                      {category.map((option) => {
                        if (option.parentId === "")
                          return (
                            <option key={option.value} value={option._id}>
                              {option.name}
                            </option>
                          );
                      })}
                    </select>
                  </div>
                  <div className="pl-16 md:pl-10">
                    <label
                      htmlFor="countries_multiple"
                      className="block mb-2 text-sm font-semibold text-gray-900  w-full "
                    >
                      Sub Category
                    </label>
                    {console.log(categoryId)}
                    <select
                      id="countries_multiple"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-48 p-4 md:w-60"
                      value={categoryId}
                      onChange={(e) => setCategoryId(e.target.value)}
                    >
                      <option>Select Sub Category</option>
                      {chieldCategory.map((option) => {
                        return (
                          <option key={option.value} value={option._id}>
                            {option.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="flex justify-between ">
                  <div>
                    <label
                      htmlFor="countries_multiple"
                      className="block mb-2 text-sm font-semibold text-gray-900  w-full "
                    >
                      Price
                    </label>
                    <input
                      type="number"
                      className="p-2.5 mb-2 rounded-lg w-full border-2 md:w-60"
                      id="price1"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
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
                      type="number"
                      className="p-2.5 mb-2 rounded-lg w-full border-2 md:w-60"
                      value={countInStock}
                      onChange={(e) => setCountInStock(e.target.value)}
                    />
                  </div>
                </div>
              </section>
              <section className="bg-slate-50 p-2 m-1 md:w-1/3">
                <h3 className="my-3 text-lg font-semibold">Image Upload</h3>
                <div className="">
                  <div className="image_grid p-2">
                    {imageShow.map((images, index) => (
                      <div className="image p-2" key={index}>
                        <label htmlFor={index}>
                          <img
                            className="h-52 w-52 rounded-lg"
                            src={images.url}
                            alt=""
                          />
                        </label>
                        <input onChange={(e) => changeImage(e.target.files[0],index)} type="file" id={index} className="hidden" />
                        <span onClick={() => removeImage(index)} className="p-2 z-10 cursor-pointer  top-1 left-1 " > <CancelIcon /> </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div class="flex items-center justify-center w-full">
                    <label
                      for="dropzone-file"
                      class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <div class="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span class="font-semibold">Upload Image</span> or
                          drag and drop
                        </p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        class="hidden"
                        accept="image/*"
                        name="multipleImage"
                        multiple
                        onChange={handleMultipleImageChange}
                      />
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  focus:outline-none "
                >
                  Proudct Upload
                </button>
              </section>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProductUploadScreen;
