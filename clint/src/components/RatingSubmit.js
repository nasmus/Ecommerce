import React from "react";
import { Rating } from '@mui/material';

function RatingSubmit() {
  return (
    <div className="lg:w-2/3 m-3">
      <form>
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
            ></textarea>
          </div>
          <div className="pl-4 pt-2 ">
            <Rating />
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
    </div>
  );
}

export default RatingSubmit;
