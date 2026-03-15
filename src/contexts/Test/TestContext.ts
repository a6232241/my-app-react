import React from "react";

type TestContextType = {
  foo: string;
  bar: number;
};

const defaultContext: TestContextType = {
  foo: "",
  bar: 0,
};

export const TestContext = React.createContext<TestContextType>(defaultContext);

export const useTestContext = () => {
  const context = React.useContext(TestContext);
  if (!context) {
    throw new Error("useTestContext must be used within a TestContextProvider");
  }
  return context;
};
