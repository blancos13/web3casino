import s from "./styles.module.scss";
import { FC, useEffect, useState } from "react";
import Image from "next/image";
import BSCNetworkIcon from "@/public/media/networks/bsc.svg";
import { useUnit } from "effector-react";
import * as Model from "./model";
import * as Api from "@/shared/api";
import { settingsModel } from "@/entities/settings";
import { sessionModel } from "@/entities/session";
import GKemblem1 from "@/public/media/brand_images/GKemblem1.png";
import gameIco from "../../public/media/live_bets/mainPageActsGameIco.svg";
import wagerIco from "../../public/media/live_bets/wagerIco.svg";
import linkIco from "../../public/media/live_bets/linkIco.svg";

const LinkIcon: FC<{}> = (p) => {
  return (
    <svg height="14px" width="14px" viewBox="0 0 18 18">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M2 2V16H16V9H18V16C18 17.1 17.1 18 16 18H2C0.89 18 0 17.1 0 16V2C0 0.9 0.89 0 2 0H9V2H2Z"
      ></path>
      <path d="M11 0V2H14.59L4.76 11.83L6.17 13.24L16 3.41V7H18V0H11Z"></path>
    </svg>
  );
};

interface timeProps {
  time: string;
  date: string;
}

// interface LiveBetProps {
//     trx_url: string,
//     time: timeProps,
//     network_icon: string,
//     game_url: string,
//     game_name: string,
//     player: string,
//     player_url: string,
//     wager: number,
//     multiplier: number,
//     profit: number,
//     userBg: string,
//     numBets: number,
//     gameAddress: string
// };
// const LiveBet: FC<LiveBetProps> = props => {
//     return (
//         <div className={s.liveBets_list_item}>
//             <div className={s.liveBets_list_item_time_block}>
//                 <a href={props.trx_url} target='_blank' className={s.liveBets_list_item_time_link_block}>
//                     <span className={s.liveBets_list_item_date}>{props.time.date}</span>
//                     <span className={s.liveBets_list_item_time}>{props.time.time}</span>
//                 </a>
//             </div>
//             <div className={s.liveBets_list_item_game_block}>
//                 <a href={props.game_url} target='_blank' className={s.liveBets_list_item_game_link_block}>
//                     <img src={gameIco.src} className={s.liveBets_list_item_game_ico} alt="game-ico-preview" />
//                     <span className={s.liveBets_list_item_game}>{props.game_name}</span>
//                 </a>
//             </div>
//             <div className={s.liveBets_list_item_player_block}>
//                 <a href={props.player_url} target='_blank' className={s.liveBets_list_item_player_link_block}>
//                     <div className={s.liveBets_list_item_player_ico} style={{ background: props.userBg }}>
//                         <span className={s.liveBets_list_item_player_ico_name}>B</span>
//                     </div>
//                     <span className={s.liveBets_list_item_player}>{props.player}</span>
//                 </a>
//             </div>
//             <div className={s.liveBets_list_item_address_block}>
//                 <span className={s.liveBets_list_item_address}>{props.gameAddress}</span>
//             </div>
//             <div className={s.liveBets_list_item_transaction_block}>
//                 <Image src={linkIco} width={22} height={22} />
//             </div>
//             <div className={s.liveBets_list_item_wager_block}>
//                 <img src={wagerIco.src} alt="wager-ico" />
//                 <span className={s.liveBets_list_item_wager}>{props.wager}</span>
//             </div>
//             <div className={s.liveBets_list_item_multiplier_block}>
//                 <span className={s.liveBets_list_item_multiplier}>{props.multiplier}x</span>
//             </div>
//             <div className={s.liveBets_list_item_profit_block}>
//                 <span className={s.liveBets_list_item_profit}>+{props.profit}</span>
//                 <img src={wagerIco.src} alt="wager-ico" />
//             </div>
//         </div>
//     );
// }

export interface LiveBetsWSProps {
  subscription_type: string,
  subscriptions: string[]
}
export const LiveBetsWS: FC<LiveBetsWSProps> = props => {
  const [Bets,
    newBet,
    setBets,
    availableBlocksExplorers,
    setNewBet
  ] = useUnit([
    Model.$Bets,
    Model.newBet,
    Model.setBets,
    settingsModel.$AvailableBlocksExplorers,
    sessionModel.setNewBet
  ]);

  const [socket, setSocket] = useState<any | null>(null);

  const getBets = async () => {
    var bets = props.subscriptions.length == 0 ? (await Api.getAllLastBets()).body as Api.T_Bets : (await Api.getGamesAllLastBets(props.subscriptions[0])).body as Api.T_Bets;
    setBets(bets.bets);
    console.log(bets);
    console.log(Bets);
    //setGotBets(true);
  }

  useEffect(() => {
    const run = async () => {
      console.log("Getting bets");
      await getBets();
    }
    run();
  }, [availableBlocksExplorers]);

  const onMessage = (ev: MessageEvent<any>) => {
    const data = JSON.parse(ev.data);
    console.log("Received message:", data);
    if (data.type == "Ping") {
      return;
    }
    setNewBet(data);
    newBet(data);
    //setGotBets(true);
  };

  useEffect(() => {

    console.log("mapping bets");

    if (socket != null) {
      return;
    }
    console.log("Connecting to WebSocket server...");
    var newSocket = new WebSocket(`${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${window.location.host}/api/updates`);

    newSocket.onopen = (_) => { newSocket.send(JSON.stringify({ type: props.subscription_type, payload: props.subscriptions })); };

    newSocket.onmessage = onMessage;
    setSocket(newSocket);
  }, []);

  return (<></>);
}