import React, { useContext, useState, useEffect } from "react";
import { Rating } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Store } from "../../Store";
import { toast } from "react-toastify";
import axios from "axios";

function RatingSubmit(props) {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [delevaryStatus, setDelevaryStatus] = useState(false);
  const { state } = useContext(Store);
  const { userInfo } = state;

  

  useEffect(() => {
    const fatchData = async () => {
      const status = await axios.get(
        `/api/delevary_status/${userInfo._id}/status/${props.product._id}`,
        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );
      //setDelevaryStatus(status)
      if (status.data === "Panding") {
        setDelevaryStatus(true);
      } else {
        setDelevaryStatus(false);
      }
    };
    fatchData();
  }, [props.product._id, userInfo._id,userInfo.token]);

  const submitHandle = async (e) => {
    e.preventDefault();
    if (!comment || !rating) {
      toast.error("Please enter comment and rating");
      return;
    }

    const { data } = await axios.post(
      `/api/user_review/${props.product._id}/reviews`,
      { rating, comment, name: userInfo.name },
      { headers: { Authorization: `Bearer ${userInfo.token}` } }
    );
    props.product.reviews.unshift(data.review);
    props.product.numReviews = data.numReviews;
    props.product.rating = data.rating;
    window.scrollTo({
      behavior: "smooth",
    });
    alert("successfull");
    navigate("/");
  };

  return (
    <>
      {delevaryStatus ? (
        <div className="lg:w-2/3 m-3">
          {console.log(delevaryStatus)}
          <form onSubmit={submitHandle}>
            <div className="w-full mb-4 border-2 border-gray-200 rounded-lg bg-gray-50">
              <div className="px-4 py-2 bg-white rounded-t-lg ">
                <label for="comment" className="sr-only">
                  Your comment
                </label>
                <textarea
                  id="comment"
                  rows="4"
                  className="w-full px-0 text-sm text-gray-900 bg-white border-0  focus:ring-0"
                  placeholder="Write a comment..."
                  required
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </div>
              <div className="pl-4 pt-2">
                <Rating
                  name="simple-controlled"
                  value={rating}
                  onChange={(e, newValue) => {
                    setRating(newValue);
                  }}
                />
              </div>
              <div className="flex items-center justify-between px-3 py-2 border-t ">
                <button
                  type="submit"
                  className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-500 rounded-lg focus:ring-4 focus:ring-blue-200  hover:bg-blue-600"
                >
                  Post comment
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default RatingSubmit;
