import configureStore from "./store/configureStore";
import { projectAdded } from "./store/projects";
// import * as actions from "./store/bugs";
// import {
//   bugAdded,
//   bugResolved,
//   getUnresolvedBugs,
//   bugAssignedToUser,
//   getBugsByUser,
//   loadBugs,
//   addBug,
//   resolveBug,
//   assignBugToUser,
// } from "./store/bugs";

import { loadBugs, assignBugToUser } from "./store/bugs";

import { userAdded } from "./store/users";
import { apiCallBegan, apiCallFailed, apiCallSuccess } from "./store/api";
// // import { compose, pipe } from "lodash/fp";

// // let input = "    Javascript      ";
// // let output = "<div>" + input.trim() + "</div>";

// // const trim = (str) => str.trim();
// // const wrapInDiv = (str) => `<div>${str}</div>`;
// // const toLowerCase = (str) => str.toLowerCase();

// // const transform = pipe(trim, toLowerCase, wrapInDiv);
// // transform(input);

// const store = configureStore();

// store.subscribe(() => {
//   console.log("Store Changed!", store.getState());
// });

// store.dispatch(userAdded({ name: "User 1" }));
// store.dispatch(userAdded({ name: "User 2" }));

// store.dispatch(projectAdded({ name: "Project 1" }));
// store.dispatch(bugAdded({ description: "Bug1" }));
// store.dispatch(bugAdded({ description: "Bug2" }));
// store.dispatch(bugResolved({ id: 1, resolved: true }));
// store.dispatch(bugAssignedToUser({ bugId: 2, userId: 1 }));
// // store.dispatch(actions.resolved({ id: 1 }));
// // unsubscribe();

// // store.dispatch({
// //   type: BUG_REMOVED,
// //   payload: {
// //     id: 1,
// //   },
// // });

// // unsubscribe();
// console.log(store.getState());

// // const unresolvedBugs = store
// //   .getState()
// //   .entities.bugs.filter((bug) => !bug.resolved);

// const unresolvedBugs = getUnresolvedBugs(store.getState());
// // const unresolvedBugs2 = getUnresolvedBugs(store.getState());

// // //memorization test
// // console.log(unresolvedBugs === unresolvedBugs2);

// console.log(unresolvedBugs);

// const bugs = getBugsByUser(1)(store.getState());
// console.log(bugs);

const store = configureStore();
// store.dispatch(bugAdded({ description: "Bug1" }));

// store.dispatch((dispatch, getState) => {
//   //Call an API
//   //When the promise is resolved => dispatch()
//   dispatch({ type: "bugsReceived", bugs: [1, 2, 3] });
//   console.log(getState());
//   //If the promise is rejected => dispatch()
// });

store.dispatch({ type: "error", payload: { message: "An error occurred" } });

// store.dispatch({
//   type: "apiCallBegan",
//   payload: {
//     url: "/bugs",
//     onSuccess: "bugsReceived",
//     onError: "apiRequestFailed",
//   },
// });

// store.dispatch(
//   apiCallBegan({
//     url: "/bugs",
//     onSuccess: "bugs/bugsReceived",
//   })
// );

// store.dispatch(loadBugs());

// setTimeout(() => store.dispatch(loadBugs()), 2000);

// store.dispatch(addBug({ description: "Serve Bug" }));

store.dispatch(loadBugs());

// setTimeout(() => store.dispatch(resolveBug(1)), 2000);
setTimeout(() => store.dispatch(assignBugToUser(1, 2)), 2000);
