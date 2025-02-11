import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//define job
export interface Job {
  id: string;
  title: string;
  description: string;
  company: string;
  location: string;
  salary?: number;
  status?: string;
}

// define job state
export interface JobState {
  allJobs: Job[];
  allAdminJobs: Job[];
  singleJob: Job | null;
  searchJobByText: string;
  allAppliedJobs: Job[];
  searchedQuery: string;
}

// initial state
const initialState: JobState = {
  allJobs: [],
  allAdminJobs: [],
  singleJob: null,
  searchJobByText: "",
  allAppliedJobs: [],
  searchedQuery: "",
};

// create redux slice
const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    setAllJobs: (state, action: PayloadAction<Job[]>) => {
      state.allJobs = action.payload;
    },
    setSingleJob: (state, action: PayloadAction<Job | null>) => {
      state.singleJob = action.payload;
    },
    setAllAdminJobs: (state, action: PayloadAction<Job[]>) => {
      state.allAdminJobs = action.payload;
    },
    setSearchJobByText: (state, action: PayloadAction<string>) => {
      state.searchJobByText = action.payload;
    },
    setAllAppliedJobs: (state, action: PayloadAction<Job[]>) => {
      state.allAppliedJobs = action.payload;
    },
    setSearchedQuery: (state, action: PayloadAction<string>) => {
      state.searchedQuery = action.payload;
    },
  },
});

// export actions and reducer
export const {
  setAllJobs,
  setSingleJob,
  setAllAdminJobs,
  setSearchJobByText,
  setAllAppliedJobs,
  setSearchedQuery,
} = jobSlice.actions;
export default jobSlice.reducer;
