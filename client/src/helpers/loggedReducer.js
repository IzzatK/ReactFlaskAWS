export const loggedReducer = (state = false, action) => {
    switch (action.type) {
      case "Logged":
        return action.payload;
      default:
          return state;
    }
  };