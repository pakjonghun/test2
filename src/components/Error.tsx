import { FC } from "react";

interface props {
  message: string;
}

const Error: FC<props> = ({ message }) => {
  return <span data-testid='error'>{message}</span>;
};

export default Error;
