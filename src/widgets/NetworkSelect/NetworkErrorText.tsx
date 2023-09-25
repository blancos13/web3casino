import s from "./styles.module.scss";
import { FC } from "react";

export interface NetworkErrorTextProps {
  error_text: string;
}

export const NetworkErrorText: FC<NetworkErrorTextProps> = ({ error_text }) => {
  return (
    <div className={s.network_error_text_block}>
      <span className={s.network_error_text}>{error_text}</span>
    </div>
  );
};
