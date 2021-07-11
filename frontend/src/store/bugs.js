import {
  createAction,
  createReducer,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import moment from "moment";

// const bugUpdated = createAction("bugUpdated");
// //Action Types
// const BUG_ADDED = "bugAdded";
// const BUG_REMOVED = "bugRemoved";
// const BUG_RESOLVED = "bugResolved";

// //Action Creators

// export const bugAdded = createAction("bugAdded");
// export const bugResolved = createAction("bugResolved");
// export const bugRemoved = createAction("bugRemoved");

//Reducers

// let lastId = 0;

// console.log(slice);

// export default function reducer(state = [], action) {
//   switch (action.type) {
//     case bugAdded.type:
//       return [
//         ...state,
//         {
//           id: ++lastId,
//           description: action.payload.description,
//           resolved: false,
//         },
//       ];

//     case bugRemoved.type:
//       return state.filter((bug) => bug.id !== action.payload.id);

//     case bugResolved.type:
//       return state.map((bug) =>
//         bug.id === action.payload.id
//           ? { ...bug, resolved: action.payload.resolved }
//           : bug
//       );
//     default:
//       return state;
//   }
// }

// export default createReducer([], {
//   //key:value
//   //action:function (event=> event handler)

//   [bugAdded.type]: (state, action) => {
//     state.push({
//       id: ++lastId,
//       description: action.payload.description,
//       resolved: false,
//     });
//   },
//   [bugRemoved.type]: (bugs, action) => {
//     bugs.filter((bug) => bug.id !== action.payload.id);
//   },
//   [bugResolved.type]: (bugs, action) => {
//     const index = bugs.findIndex((bug) => bug.id === action.payload.id);
//     bugs[index].resolved = action.payload.resolved;
//   },
// });
let lastId = 0;

const slice = createSlice({
  name: "bugs",
  initialState: { list: [], loading: false, lastFetch: null },
  reducers: {
    bugAssignedToUser: (bugs, action) => {
      const { id: bugId, userId } = action.payload;
      const index = bugs.list.findIndex((bug) => bug.id === bugId);
      bugs.list[index].userId = userId;
    },
    bugAdded: (bugs, action) => {
      // bugs.list.push({
      //   id: ++lastId,
      //   description: action.payload.description,
      //   resolved: false,
      // });
      bugs.list.push(action.payload);
    },
    bugResolved: (bugs, action) => {
      const index = bugs.list.findIndex((bug) => bug.id === action.payload.id);
      bugs.list[index].resolved = action.payload.resolved;
    },
    bugsRequested: (bugs, action) => {
      bugs.loading = true;
    },
    bugsReceived: (bugs, action) => {
      bugs.loading = false;
      bugs.list = action.payload;
      bugs.lastFetch = Date.now();
      // console.log(bugs.loading);
    },
    bugsRequestFailed: (bugs, action) => {
      bugs.loading = false;
    },
  },
});

const {
  bugAdded,
  bugResolved,
  bugAssignedToUser,
  bugsReceived,
  bugsRequested,
  bugsRequestFailed,
} = slice.actions;
export default slice.reducer;

//Action Creators
const url = "/bugs";

export const loadBugs = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.bugs;
  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");

  if (diffInMinutes < 10) return;

  dispatch(
    apiCallBegan({
      url: url,
      onStart: bugsRequested.type,
      onSuccess: bugsReceived.type,
      onError: bugsRequestFailed.type,
    })
  );
  console.log(lastFetch);
};

export const addBug = (bug) =>
  apiCallBegan({
    url,
    method: "post",
    data: bug,
    onSuccess: bugAdded.type,
  });

export const resolveBug = (id) =>
  apiCallBegan({
    url: url + "/" + id,
    method: "patch",
    data: { resolved: true },
    onSuccess: bugResolved.type,
  });

export const assignBugToUser = (bugId, userId) =>
  apiCallBegan({
    url: url + "/" + bugId,
    method: "patch",
    data: { userId },
    onSuccess: bugAssignedToUser.type,
  });

// export const loadBugs = () =>
//   apiCallBegan({
//     url: url,
//     onStart: bugsRequested.type,
//     onSuccess: bugsReceived.type,
//     onError: bugsRequestFailed.type,
//   });

//selector
// export const getUnresolvedBugs = (state) =>
//   state.entities.bugs.filter((bug) => !bug.resolved);

//selector and Memorization
export const getUnresolvedBugs = createSelector(
  (state) => state.entities.bugs,
  (bugs) => bugs.filter((bug) => !bug.resolved)
);

export const getBugsByUser = (userId) =>
  createSelector(
    (state) => state.entities.bugs,
    (bugs) => bugs.filter((bug) => bug.userId === userId)
  );
