// "use client";

// type ErrorProps = {
//   error: Error;
//   reset: () => void;
// };

// export default function Error({ error, reset }: ErrorProps) {
//   return (
//     <div>
//       <p>Could not fetch note details.</p>
//       <p>{error.message}</p>

//       <button onClick={reset}>Try again</button>
//     </div>
//   );
// }

"use client";

type ErrorProps = {
  error: Error;
};

const Error = ({ error }: ErrorProps) => {
  console.log(error);
  return <p>Something went wrong. {error.message}.</p>;
};

export default Error;
