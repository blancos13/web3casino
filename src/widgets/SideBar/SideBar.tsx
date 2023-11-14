import { FC, useState } from "react";
import { useUnit } from "effector-react";
import Image from "next/image";
import clsx from "clsx";

import s from "./styles.module.scss";

import {
  CoinButton,
  DiceButton,
  RPCButton,
  PokerButton,
  GamesIcon,
  ArrowIcon,
  SupportIcon,
} from "@/shared/SVGs";
import { MinesButton } from "@/shared/SVGs/MinesButton";
import { LeaderboardIcon } from "@/shared/SVGs/LeaderboardIcon";

import tgClosedSidebarIco from "@/public/media/sidebar_icons/TelegramIco.svg";

import { LanguageSwitcher } from "@/widgets/LanguageSwitcher/LanguageSwitcher";

import * as SideBarModel from "./model";

import { Swap } from "../Swap";
import { SettingIcon } from "@/shared/SVGs/SettingIcon";
import { StarIcon } from "@/shared/SVGs/StarIcon";
import { PlinkoButton } from "@/shared/SVGs/PlinkoButton";
import { BonusIco } from "@/shared/SVGs/BonusIco";
import { NftIco } from "@/shared/SVGs/NftIco";
import { AffilateIco } from "@/shared/SVGs/AffilateIco";
import { HTPico } from "@/shared/SVGs/HTPico";
import { SwaptIcon } from "@/shared/SVGs/SwapIcon";
import moonIco from "@/public/media/sidebar_icons/moonIco.svg";
import { CloseSbIco } from "@/shared/SVGs/CloseSbIco";
import { MoonIco } from "@/shared/SVGs/MoonIco";

const gamesList = [
  {
    title: "Coinflip",
    icon: "coin",
    link: "/games/CoinFlip",
  },
  {
    title: "Dice",
    icon: "dice",
    link: "/games/Dice",
  },
  {
    title: "Rock paper scissors",
    icon: "rps",
    link: "/games/RPS",
  },
  {
    title: "Poker",
    icon: "poker",
    link: "/games/Poker",
  },
  {
    title: "Mines",
    icon: "mines",
    link: "/games/Mines",
  },
  {
    title: "Plinko",
    icon: "plinko",
    link: "/games/Plinko",
  },
];

interface GameIconProps {
  iconId: string;
}

const GameIcon: FC<GameIconProps> = ({ iconId }) => {
  if (iconId === "coin") {
    return <CoinButton />;
  } else if (iconId === "dice") {
    return <DiceButton />;
  } else if (iconId === "rps") {
    return <RPCButton />;
  } else if (iconId === "poker") {
    return <PokerButton />;
  } else if (iconId === "mines") {
    return <MinesButton />;
  } else if (iconId === "plinko") {
    return <PlinkoButton />;
  } else {
    return <h3>no games yet</h3>;
  }
};

interface ClosedSideBarProps {
  pickedGame: number | null;
  activePage: string | undefined;
}
const ClosedSideBar: FC<ClosedSideBarProps> = (props) => {
  const [flipOpen, isOpen] = useUnit([
    SideBarModel.flipOpen,
    SideBarModel.$isOpen,
  ]);

  return (
    <>
      <div className={s.side_bar_upper}>
        <div className={s.closed_sb_group}>
          <div className={s.open_sb_block} onClick={() => flipOpen()}>
            <CloseSbIco />
          </div>
          <div className={s.closed_sb_bonus_ico}>
            <BonusIco />
          </div>
          <div className={`${s.games_button}`}>
            <GamesIcon />
            <div className={s.games_button_tooltip}>
              <div className={s.tooltip_games_list}>
                {gamesList.map((item, ind) => (
                  <div
                    className={s.tooltip_games_list_item}
                    onClick={() => {
                      location.href = item.link;
                    }}
                  >
                    <GameIcon iconId={item.icon} />
                    <span className={s.tooltip_games_list_item_title}>
                      {item.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className={s.closed_sb_other_info_list}>
          <div
            onClick={() =>
              window.open(
                "https://element.market/collections/greekkeepers",
                "_blank"
              )
            }
            className={s.closed_sb_other_info_list_item}
          >
            <NftIco />
          </div>
          <div className={s.closed_sb_other_info_list_item}>
            <AffilateIco />
          </div>
          <div className={s.closed_sb_other_info_list_item}>
            <HTPico />
          </div>
          {/* <div className={s.closed_sb_other_info_list_item}>
            <SwaptIcon />
          </div> */}
          <Swap closeClassName={s.closed_sb_other_info_list_item} />
          <div className={s.closed_sb_other_info_list_item}>
            <SupportIcon />
          </div>
        </div>
        <div className={s.sb_closed_bottom_block}>
          <div className={s.sb_closed_bottom_block_item}>
            <span className={s.sb_closed_language_title}>En</span>
          </div>
          <div className={s.sb_closed_bottom_block_item}>
            <MoonIco />
          </div>
        </div>
      </div>
    </>
  );
};

interface OpenedSideBarProps {
  pickedGame: number | null;
  activePage: string | undefined;
}
const OpenedSideBar: FC<OpenedSideBarProps> = (props) => {
  const [gamesAreOpen, setOpen] = useState(true);

  const [flipOpen, isOpen] = useUnit([
    SideBarModel.flipOpen,
    SideBarModel.$isOpen,
  ]);

  return (
    <>
      <div className={s.side_bar_upper}>
        <div className={s.upper_blocks}>
          <div className={s.sidebar_close_block} onClick={() => flipOpen()}>
            <span>dashboard</span>
            <CloseSbIco />
          </div>
          <div className={s.bonus_button_block}>
            <BonusIco />
            bonus<span className={s.soon_page}>Soon…</span>
          </div>
          <div
            className={clsx(
              s.buttons_menu,
              !gamesAreOpen && s.buttons_menu_closed
            )}
          >
            <div
              className={s.menu_header}
              onClick={() => {
                setOpen(!gamesAreOpen);
              }}
            >
              <div
                className={`${s.header_icon_container} ${
                  !gamesAreOpen && s.games_closed
                }`}
              >
                <GamesIcon />
                <span className={s.header_icon_title}>games</span>
              </div>
              <div
                className={
                  (s.arrow, gamesAreOpen ? s.arrow_down : s.arrow_side)
                }
              >
                <ArrowIcon />
              </div>
            </div>
            <div className={s.game_rows}>
              <div
                className={`${s.game_row} ${
                  props.activePage === "/games/CoinFlip" && s.game_active
                }`}
                onClick={() => {
                  location.href = "/games/CoinFlip";
                }}
              >
                <CoinButton />
                Coinflip
              </div>
              <div
                className={`${s.game_row} ${
                  props.activePage === "/games/Dice" && s.game_active
                }`}
                onClick={() => {
                  location.href = "/games/Dice";
                }}
              >
                <DiceButton />
                Dice
              </div>
              <div className={s.game_row}>
                <RPCButton />
                Rock Paper Scissors
              </div>
              <div
                className={`${s.game_row} ${
                  props.activePage === "/games/Poker" && s.game_active
                }`}
                onClick={() => {
                  location.href = "/games/Poker";
                }}
              >
                <PokerButton />
                Poker
              </div>
              <div
                className={`${s.game_row} ${
                  props.activePage === "/games/Plinko" && s.game_active
                }`}
                onClick={() => {
                  location.href = "/games/Plinko";
                }}
              >
                <PlinkoButton />
                Plinko
              </div>
              <div
                className={clsx(s.leaderboard)}
                onClick={() => {
                  location.href = "/leaderboard";
                }}
              >
                <LeaderboardIcon />
                LeaderBoard
              </div>
            </div>
          </div>
          <div className={s.sb_other_info_list}>
            <div
              onClick={() =>
                window.open(
                  "https://element.market/collections/greekkeepers",
                  "_blank"
                )
              }
              className={s.oth_info_list_item}
            >
              <div className={s.icon_wrapper}>
                <NftIco />
              </div>
              <div className={s.large_header_text}>nft market</div>
            </div>
            <div className={s.oth_info_list_item}>
              <div className={s.icon_wrapper}>
                <AffilateIco />
              </div>
              <div className={s.large_header_text}>
                affiliate <span className={s.soon_page}>Soon…</span>
              </div>
            </div>
            <div className={s.oth_info_list_item}>
              <div className={s.icon_wrapper}>
                <HTPico />
              </div>
              <div className={s.large_header_text}>
                how to play <span className={s.soon_page}>Soon…</span>
              </div>
            </div>
            <div
              className={s.support}
              onClick={() => {
                location.href = "https://t.me/GKSupportt";
              }}
            >
              <div className={s.icon_wrapper}>
                <SupportIcon />
              </div>
              <div className={s.large_header_text}>support</div>
            </div>
            <Swap />
          </div>
          <LanguageSwitcher />
        </div>
      </div>
    </>
  );
};

export interface SideBarProps {
  activePage: string | undefined;
}
export const SideBar: FC<SideBarProps> = ({ activePage }) => {
  const [isOpen, currentPick] = useUnit([
    SideBarModel.$isOpen,
    SideBarModel.$currentPick,
  ]);

  return (
    <div
      className={`${s.side_bar} ${
        isOpen ? s.side_bar_opened : s.side_bar_closed
      }`}
    >
      {isOpen ? (
        <OpenedSideBar pickedGame={currentPick} activePage={activePage} />
      ) : (
        <ClosedSideBar pickedGame={currentPick} activePage={activePage} />
      )}
    </div>
  );
};
