import s from './styles.module.scss';
import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import BSCNetworkIcon from '@/public/media/networks/bsc.svg';
import { useUnit } from 'effector-react';
import * as Model from './model';
import * as Api from '@/shared/api';
import { settingsModel } from '@/entities/settings';
import { sessionModel } from '@/entities/session';
import GKemblem1 from '@/public/media/brand_images/GKemblem1.png';
import gameIco from '../../public/media/live_bets/mainPageActsGameIco.svg'
import wagerIco from '../../public/media/live_bets/wagerIco.svg'

const LinkIcon: FC<{}> = p => {
    return (<svg height="14px" width="14px" viewBox="0 0 18 18"><path fill-rule="evenodd" clip-rule="evenodd" d="M2 2V16H16V9H18V16C18 17.1 17.1 18 16 18H2C0.89 18 0 17.1 0 16V2C0 0.9 0.89 0 2 0H9V2H2Z"></path><path d="M11 0V2H14.59L4.76 11.83L6.17 13.24L16 3.41V7H18V0H11Z"></path></svg>)
}

interface LiveBetProps {
    // is_odd: boolean,
    // trx_url: string,
    time: string,
    // network_icon: string,
    game_url: string,
    game_name: string,
    player: string,
    // player_url: string,
    wager: number,
    multiplier: number,
    profit: number,
    userBg: string
    // numBets: number
};
const LiveBet: FC<LiveBetProps> = props => {
    return (
        <div className={s.liveBets_list_item}>
            <div className={s.liveBets_list_item_time_block}>
                <span className={s.liveBets_list_item_time}>{props.time}</span>
            </div>
            <div className={s.liveBets_list_item_game_block}>
                <img src={gameIco.src} alt="game-ico-preview"/>
                <span className={s.liveBets_list_item_game}>{props.game_name}</span>
            </div>
            <div className={s.liveBets_list_item_player_block}>
                <div className={s.liveBets_list_item_player_ico} style={{background: props.userBg}}>
                    <span className={s.liveBets_list_item_player_ico_name}>B</span>
                </div>
                <span className={s.liveBets_list_item_player}>{props.player}</span>
            </div>
            <div className={s.liveBets_list_item_address_block}>
                <span className={s.liveBets_list_item_address}>{props.game_url}</span>
            </div>
            <div className={s.liveBets_list_item_wager_block}>
                <img src={wagerIco.src} alt="wager-ico"/>
                <span className={s.liveBets_list_item_wager}>{props.wager}</span>
            </div>
            <div className={s.liveBets_list_item_multiplier_block}>
                <span className={s.liveBets_list_item_multiplier}>{props.multiplier}x</span>
            </div>
            <div className={s.liveBets_list_item_profit_block}>
                <span className={s.liveBets_list_item_profit}>+{props.profit}</span>
                <img src={wagerIco.src} alt="wager-ico"/>
            </div>
        </div>
    );
}

export interface LiveBetsProps {
    subscription_type: string,
    subscriptions: string[]
};
export const LiveBets: FC<LiveBetsProps> = props => {
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

    const [gotBets, setGotBets] = useState(false);

    const [BetsElements, setBetsElements] = useState<React.JSX.Element[]>([]);

    useEffect(() => {
        const run = async () => {
            console.log("Getting bets");
            await getBets();
        }
        run();
    }, [availableBlocksExplorers]);

    const getBets = async () => {
        var bets = props.subscriptions.length == 0 ? (await Api.getAllLastBets()).body as Api.T_Bets : (await Api.getGamesAllLastBets(props.subscriptions[0])).body as Api.T_Bets;
        setBets(bets.bets);
        console.log(bets);
        console.log(Bets);
        setGotBets(true);
    }
    var odd = false;

    const onMessage = (ev: MessageEvent<any>) => {
        const data = JSON.parse(ev.data);
        console.log("Received message:", data);
        if (data.type == "Ping") {
            return;
        }
        setNewBet(data);
        newBet(data);
        setGotBets(true);
    };

    useEffect(() => {

        console.log("mapping bets");

        setBetsElements(Bets.map((bet: Api.T_BetInfo) => {
            var date = new Date(bet.timestamp * 1000);
            let hours = date.getHours();
            let minutes = "0" + date.getMinutes();
            const wager = parseFloat((Number(bet.wager) / (10 ** 18)).toFixed(2));
            const profit = parseFloat((Number(bet.profit) / (10 ** 18)).toFixed(2));
            var element = <LiveBet
                is_odd={odd}
                trx_url={availableBlocksExplorers?.get(bet.network_id)?.url + '/tx/' + bet.transaction_hash}
                time={hours + ':' + minutes.substr(-2)}
                network_icon={`/static/media/networks/${bet.network_id}.svg`}
                game_url={`/games/${bet.game_name}`}
                game_name={bet.game_name}
                player={bet.player_nickname == null ? bet.player : bet.player_nickname}
                player_url={bet.player}
                wager={wager}
                multiplier={parseFloat((profit / (wager * bet.bets)).toFixed(2))}
                profit={profit}
                key={bet.transaction_hash}
                numBets={bet.bets}
            />;
            odd = !odd;
            return (element);
        }));
        setGotBets(false);

        if (socket != null) {
            return;
        }
        console.log("Connecting to WebSocket server...");
        var newSocket = new WebSocket(`${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${window.location.host}/api/updates`);

        newSocket.onopen = (_) => { newSocket.send(JSON.stringify({ type: props.subscription_type, payload: props.subscriptions })); };

        newSocket.onmessage = onMessage;
        setSocket(newSocket);
    }, [Bets, gotBets]);

    return (
        <div className={s.liveBets_wrap}>
            <h2 className={s.liveBets_title}>
                <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 9 9" fill="none">
                    <circle cx="4.5" cy="4.5" r="4.5" fill="#29F061"/>
                </svg>
                Live Bets
            </h2>
            <div className={s.liveBets_body}>
                <div className={s.liveBets_titles_list}>
                    <span className={s.liveBets_titles_list_item}>Time</span>
                    <span className={s.liveBets_titles_list_item}>Game</span>
                    <span className={s.liveBets_titles_list_item}>Player</span>
                    <span className={s.liveBets_titles_list_item}>Address</span>
                    <span className={s.liveBets_titles_list_item}>Wager</span>
                    <span className={s.liveBets_titles_list_item}>Multiplier</span>
                    <span className={s.liveBets_titles_list_item}>Profit</span>
                </div>
                <div className={s.liveBets_list}>
                    <LiveBet
                        time='25.08.23 17:05'
                        game_name='Dice'
                        player='UserName'
                        game_url='0x563...4ba9'
                        wager={11}
                        multiplier={3}
                        profit={5.34}
                        userBg='#3DBCE5'
                    />
                    <LiveBet
                        time='25.08.23 17:05'
                        game_name='Rock paper scissors'
                        player='UserName'
                        game_url='0x563...4ba9'
                        wager={11}
                        multiplier={3}
                        profit={5.34}
                        userBg='#02803A'
                    />
                </div>
            </div>
            {/*<button className={s.livebets_loadmore_btn}>Load more</button>*/}
        </div>
    )
}