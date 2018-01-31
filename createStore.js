/**
 * Three principles of Redux:
 *
 * 1. The entire application state is contained in a single immutable object
 * 2. State is read-only. To modify the state, you need to dispatch actions. (actions are just a plain JS object with a action type and some data)
 * 3. Reducer function => Takes the existing state, an action, and returns a new state
 */

/**
 * createStore function exposes 4 important methods that correspond to the principles of redux
 *
 * 1. getState() => returns the existing state of the application
 * 2. dispatch(action) => call the reducer with the existing state, and action. Update the state of the store with the new updated state returned by the reducer.
 * 3. subscribe(callback) => call the callback function that updates the UI whenever the state is updated.
 * 4. replaceReducer(new_reducer) => replace the existing reducer with new_reducer
 *
 * @param {*} reducer The reducer function
 *
 * @returns {*} an object that exposes the above functions (possibly more)
 */

function createStore(reducer) {
  let _state = 0;
  let listeners = [];
  let currentReducer = reducer;

  const getState = () => _state;

  const dispatch = action => {
    _state = currentReducer(_state, action);

    // notify all the listeners
    for (listener of listeners) {
      listener();
    }
  };

  const subscribe = listener => {
    listeners.push(listener);

    // return a function that lets you unsubscribe
    const unsubscribe = () => listeners.filter(item => item !== listener);
    return unsubscribe;
  };
  
  const replaceReducer = newReducer => currentReducer = newReducer;

  return {
    getState,
    dispatch,
    subscribe,
    replaceReducer
  };
}

/**
 * The reducer function => Takes the existing state and the action that may alter it, and returns a new state.
 * The entire state of the application is contained in a single immutable state object.
 * reducer() is the only way of updating the application state.
 *
 * @param {*} state The existing state, defaults to the initial state if `undefined` is passed
 * @param {*} action The action object that may alter the existing state of the application
 * @returns {*} new state
 */
function reducer(state = 0, action) {
  debugger;
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
}

// Create a store
const store = createStore(reducer);

console.log("Default:", store.getState()); // 0

store.dispatch({ type: "INCREMENT" });

console.log("After dispatching increment action:", store.getState()); // 1

store.dispatch({ type: "DECREMENT" });

console.log("After dispatching decrement action:", store.getState()); // 0

//----------------------------------------
// IMPORTANT:
//----------------------------------------

// Look at the original implementation here => https://github.com/tayiorbeii/egghead.io_redux_course_notes/blob/master/03-Implementing_Store_from_Scratch.md
// I totally missed setting up the listeners array part in first go. Don't do that mistake.

