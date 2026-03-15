import React from "react";
import { TestContext } from "./TestContext";

const TestContextProvider = ({
  foo,
  bar,
  children,
}: {
  foo: string;
  bar: number;
  children: React.ReactNode;
}) => {
  return (
    <TestContext.Provider value={{ foo, bar }}>{children}</TestContext.Provider>
  );
};

export default TestContextProvider;
