import { ReactElement, ReactNode, useEffect } from "react";
import s from "./styles.module.scss";

import { SideBar } from "@/widgets/SideBar";
import { Header } from "../header";
//import { LayoutModel } from '.';
import { Blur } from "@/widgets/Blur/Blur";
import { useUnit } from "effector-react";
import { Footer } from "@/widgets/Footer";
import { SettingsInit } from "../SettingsInit";
import { WagmiConfig } from "wagmi";
import { web3 } from "@/entities/web3";
import * as SidebarM from "@/widgets/SideBar/model";
import { SessionInit } from "../SessionSettings";
import { PopUpBonus } from "../PopUpBonus";

import * as SwapModel from "@/widgets/Swap/model/index";
import clsx from "clsx";
import { useMediaQuery } from "@/shared/tools";
interface LayoutProps {
  children?: any;
  gameName: string | undefined;
  activePageLink?: string;
}
export const Layout = ({ children, ...props }: LayoutProps) => {
  const [wagmiConfig] = useUnit([web3.$WagmiConfig]);
  const isMobile = useMediaQuery("(max-width: 650px)");
  const [isOpen, close] = useUnit([SidebarM.$isOpen, SidebarM.Close]);

  useEffect(() => {
    if (window.innerWidth <= 650) close();
  }, []);

  const [swapOpen] = useUnit([SwapModel.$isSwapOpen]);
  return (
    <>
      <SettingsInit />
      {wagmiConfig != null ? (
        <WagmiConfig config={wagmiConfig}>
          <SessionInit game={props.gameName} />
          <PopUpBonus />
          <div
            className={`${s.page_container} ${!isOpen && s.side_bar_closed}`}
          >
            <Header isGame={props.gameName != undefined} />
            <div
              className={clsx(
                s.side_bar_wrapper,
                isOpen && s.sideBar_opened,
                swapOpen && isMobile && s.swap_open
              )}
            >
              <SideBar activePage={props.activePageLink} />
            </div>

            {/* <Blur /> */}
            <main className={s.main_area}>{children}</main>
            <Footer />
          </div>
        </WagmiConfig>
      ) : (
        <></>
      )}
    </>
  );
};
