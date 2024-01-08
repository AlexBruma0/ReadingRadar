import React from "react";

// Create a context with a default value
const UserContext = React.createContext({
  user: null, // default value for user
  setUser: () => {}, // default function for setting user
});

export default UserContext;
