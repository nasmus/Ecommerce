import React, { useContext, useState,useReducer } from "react";
import { Alert, Rating } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Store } from "../Store";
import { toast } from "react-toastify";
import axios from "axios";

const reducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_SUCCESS':
      return { ...state };
    
    default:
      return state;
  }
};


function RatingSubmit(props) {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const [{ loading, error, product, loadingCreateReview }, dispatch] =
    useReducer(reducer, {
      product: [],
      loading: true,
      error: '',
    });

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
      dispatch({
        type: 'CREATE_SUCCESS',
      });
      props.product.reviews.unshift(data.review);
      props.product.numReviews = data.numReviews;
      props.product.rating = data.rating;
      window.scrollTo({
        behavior: 'smooth',
      });
      alert("successfull")
      navigate('/')

  };

  return (
    <>
    {
      userInfo ? <div className="lg:w-2/3 m-3">
      <form onSubmit={submitHandle}>
        <div class="w-full mb-4 border-2 border-gray-200 rounded-lg bg-gray-50">
          <div class="px-4 py-2 bg-white rounded-t-lg ">
            <label for="comment" class="sr-only">
              Your comment
            </label>
            <textarea
              id="comment"
              rows="4"
              class="w-full px-0 text-sm text-gray-900 bg-white border-0  focus:ring-0"
              placeholder="Write a comment..."
              required
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </div>
          <div className="pl-4 pt-2">
            <Rating
              name="simple-controlled"
              value={rating}
              onChange={(e,newValue) => {
                setRating(newValue)
              }}
            />
          </div>
          <div class="flex items-center justify-between px-3 py-2 border-t ">
            <button
              type="submit"
              class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-500 rounded-lg focus:ring-4 focus:ring-blue-200  hover:bg-blue-600"
            >
              Post comment
            </button>
          </div>
        </div>
      </form>
    </div> : ''
    }
    
    </>
  );
}

export default RatingSubmit;
