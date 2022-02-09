import React from "react";

export interface Action {
  type: String;
  payload: Object;
}

export interface AppStateContextInterface {
  state: Object;
  dispatch: React.Dispatch<Action>;
}

// App initial state
const initialState = {
  today: new Date(),
};

// state reducer
const reducer = (state: Object, action: Action) => {
  switch (action.type) {
    case "CHANGE_DATE":
      return {
        ...state,
        selectedDate: action.payload,
      };

    default:
      return { ...state };
  }
};

// dispatch action
export const changeDate = (date: Date) => ({
  action: "CHANGE_DATE",
  payload: date,
});

// context, provider, consumer logic
export const AppStateContext =
  React.createContext<AppStateContextInterface | null>(null);

export const AppStateProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  let value = { state, dispatch };

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
};

export const AppStateConsumer = AppStateContext.Consumer;
