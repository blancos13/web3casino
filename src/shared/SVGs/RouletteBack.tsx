import { FC } from "react";

interface RouletteBackProps {}

export const RouletteBack: FC<RouletteBackProps> = () => {
  return (
    <svg
      width="18"
      height="16"
      viewBox="0 0 18 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.65039 4.47852V6.9375L0.650391 3.68685L4.65039 0.4375V2.89518H9.65039C13.4266 2.89518 17.3504 5.08551 17.3504 9.22852C17.3504 13.3715 13.4266 15.5618 9.65039 15.5618H2.65039V13.9785H9.65039C11.2417 13.9785 12.7678 13.4781 13.893 12.5873C15.0183 11.6965 15.6504 10.4883 15.6504 9.22852C15.6504 7.96874 15.0183 6.76056 13.893 5.86976C12.7678 4.97896 11.2417 4.47852 9.65039 4.47852H4.65039Z"
        fill="#7E7E7E"
      />
    </svg>
  );
};
