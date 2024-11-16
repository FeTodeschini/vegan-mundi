import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ReviewState } from "@/_types/review";
import axios from "axios";
import config from "@/_lib/config";

export type SubmitReviewPayload = {
  email: string;
  classId: number;
  reviewText: string;
  stars: number;
};

const initialState: ReviewState = {
    email: '',
    isReviewVisible: {},
    classesReview: {},
    unsubmittedReviews: {},
    status: 'idle',
    error: null
}

export const submitReview = createAsyncThunk<SubmitReviewPayload, SubmitReviewPayload, { rejectValue: string }>(
  "review/submitReview",
  async (data, { rejectWithValue }) => {

    try {
      await axios.post(`${config.serverEndpoint}review/add`, data);
      // data (which is the payload) needs to be returned, so it can be used in the extraReducer as action.payload
      return data;
    }
    catch {
      throw rejectWithValue("Failure while saving the review")
    }
  }
)

function removePersistedReview(classId: number, state: ReviewState) {
  const { [classId]: removedReview, ...updatedUnsubmittedReviews } = state.unsubmittedReviews;
  state.unsubmittedReviews = updatedUnsubmittedReviews;

  localStorage.setItem("unsubmittedReviews", JSON.stringify(updatedUnsubmittedReviews));
}

const reviewSlice = createSlice({
    name: "review",
    initialState,
    reducers: {
      // displays the text area for review's text upon stars selection and stores the logged user email
      addStars(state, action) {
        state.email = action.payload.email;
        state.isReviewVisible[action.payload.classId] = true
        state.status = "idle";
        state.error = null;
      },
      // hides the text area for review's text when User cancels the review
      cancelReview(state, action) {
        const { classId } = action.payload
        state.isReviewVisible[classId] = false;
        state.status = "idle";
        state.error = null;

        // removes item from list of unsubmitted reviews in the local storage and also from the state
        removePersistedReview(classId, state);
      },
      // Save unsubmitted reviews in the state and localstorage, in case user refreshes the page or change tabs without submitting the review
      saveUnsubmittedReview(state, action) {
        const { classId, stars, reviewText } = action.payload
        // Initialize item if it still doesn't exist
        if (!state.unsubmittedReviews[classId]) {
          state.unsubmittedReviews[classId] = { 
            stars: 0,
            reviewText: '' };
        }
        
        if (stars != null){
          state.unsubmittedReviews[classId].stars = stars;
        }
        if (reviewText != null) {
          state.unsubmittedReviews[classId].reviewText = reviewText;
        }

        localStorage.setItem("unsubmittedReviews", JSON.stringify(state.unsubmittedReviews))
      },
      // Set the state with the unsubmitted reviews in the local stirage (in case user refreshes the page or changes tab without submitting a pending review)
      setUnsubmittedReviews (state, action){
        state.unsubmittedReviews = action.payload;
      }
    },

    // async actions need to be in the extraReducers section according to the Thunk pattern
    extraReducers: (builder) => {
      builder
        .addCase(submitReview.pending, (state) => {
          state.status = "loading";
          state.error = null;
        })
        .addCase(submitReview.fulfilled, (state, action) => {
          const { classId, stars, reviewText } = action.payload;
          state.status = "success";
          state.isReviewVisible[action.payload.classId] = false
          state.classesReview[classId] = { stars, reviewText }

          // removes item from list of unsubmitted reviews in the local storage and also from the state
          removePersistedReview(classId, state);
          // const { [classId]: removedReview, ...updatedUnsubmittedReviews } = state.unsubmittedReviews;
          // state.unsubmittedReviews = updatedUnsubmittedReviews;
        
          // localStorage.setItem("unsubmittedReviews", JSON.stringify(updatedUnsubmittedReviews));
        })
        .addCase(submitReview.rejected, (state, action) => {
          state.status = "failure";
          state.error = action.payload || "Unknown error occurred while submitting review";
        });
    },
});


export const { addStars, cancelReview, saveUnsubmittedReview, setUnsubmittedReviews } = reviewSlice.actions;

export default reviewSlice.reducer;
