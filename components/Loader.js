import { Loader } from "@mantine/core";

const Spinner = ({ show }) => {
  return show ? <Loader /> : null;
};

export default Spinner;
