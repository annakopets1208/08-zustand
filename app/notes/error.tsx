"use client";

type ErrorProps = {
  error: Error;
};

const Error = ({ error }: ErrorProps) => {
  console.log(error);
  return <p>Could not fetch note details. {error.message}</p>;
};

export default Error;
