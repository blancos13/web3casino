import { GamePage } from "@/widgets/GamePage/GamePage";
import { Layout } from "@/widgets/Layout";
import { Poker } from "@/widgets/Poker/Poker";
import s from "./styles.module.scss";
import { WagerInputsBlock } from "@/widgets/WagerInputsBlock";
import { WagerLowerBtnsBlock } from "@/widgets/WagerLowerBtnsBlock/WagerLowerBtnsBlock";
import { PokerFlipCardsInfo } from "@/widgets/PokerFlipCardsInfo";
import { WinMessage } from "@/widgets/WinMessage";
import { LostMessage } from "@/widgets/LostMessage";
//import DraxToken from "@/public/media/tokens/drax.svg";
import Image from "next/image";
import { LiveBetsWS } from "@/widgets/LiveBets";
import { WagerModel } from "@/widgets/Wager";
import { useUnit } from "effector-react";
import { PokerModel } from "@/widgets/Poker/Poker";
import { CustomWagerRangeInput } from "@/widgets/CustomWagerRangeInput";
import Head from "next/head";
import { useAccount, useConnect } from "wagmi";
import { useEffect } from "react";
import clsx from "clsx";
import { WagerModel as WagerAmountModel } from "@/widgets/WagerInputsBlock";
import { LoadingDots } from "@/shared/ui/LoadingDots";

import * as ConnectModel from "@/widgets/Layout/model";
import { useRouter } from "next/router";
const WagerContent = () => {
  const [startConnect, setStartConnect] = useUnit([
    ConnectModel.$startConnect,
    ConnectModel.setConnect,
  ]);
  const [pressButton] = useUnit([WagerModel.pressButton]);
  const { isConnected, isConnecting } = useAccount();
  const { connectors, connect } = useConnect();
  const { push, reload } = useRouter();

  const [isPlaying, cardsNew] = useUnit([
    PokerModel.$isPlaying,
    PokerModel.$watchState,
  ]);
  useEffect(() => {
    isConnecting && setStartConnect(false);
  }, []);

  const [cryptoValue] = useUnit([WagerAmountModel.$cryptoValue]);

  useEffect(() => {
    console.log("cardsNewcardsNew", cardsNew);
  }, [cardsNew]);

  const router = useRouter();

  return (
    <>
      <WagerInputsBlock />
      <button
        className={clsx(
          s.poker_wager_drawing_cards_btn,
          s.mobile,
          isPlaying && "animation-leftRight",
          cryptoValue == 0.0 && isConnected
            ? s.button_inactive
            : s.button_active
        )}
        onClick={() => {
          if (cryptoValue > 0.0 && isConnected) {
            pressButton();
          } else if (cryptoValue <= 0.0 && isConnected) {
            return null;
          } else {
            router.push("/RegistrManual");
          }
        }}
      >
        {isPlaying && cardsNew === false ? (
          <LoadingDots className={s.dots_black} title="Playing" />
        ) : cardsNew === true && isPlaying ? (
          "Retake"
        ) : isConnected ? (
          "Drawing cards"
        ) : (
          "Connect Wallet"
        )}
      </button>
    </>
  );
};

export default function PokerGame() {
  const [showFlipCards, flipShowFlipCards] = useUnit([
    PokerModel.$showFlipCards,
    PokerModel.flipShowFlipCards,
  ]);

  return (
    <>
      <Head>
        <title>Games - Poker</title>
      </Head>
      <Layout activePageLink="/games/Poker" gameName="Poker">
        <LiveBetsWS
          subscription_type={"Subscribe"}
          subscriptions={["Poker", "PokerStart"]}
        />
        <div className={s.poker_container}>
          <GamePage
            isPoker={true}
            customTitle="Drawing cards"
            gameInfoText="Video Poker - At the start of each round of the game, you are dealt 5 cards with 9 different potential winning combinations. After the first hand, you have the unique opportunity to turn over the cards and try your luck to re-create the best winning combination. In this version of video poker  a royal flush can increase your bet by 100 times, which is guaranteed to give you unforgettable emotions and excitement!"
            gameTitle="poker"
            wagerContent={<WagerContent />}
          >
            <Poker gameText="Video Poker - At the start of each round of the game, you are dealt 5 cards with 9 different potential winning combinations. After the first hand, you have the unique opportunity to turn over the cards and try your luck to re-create the best winning combination. In this version of video poker  a royal flush can increase your bet by 100 times, which is guaranteed to give you unforgettable emotions and excitement!" />
            {/* show when need to redraw cards */}

            {showFlipCards && (
              <div className={s.poker_flip_cards_info_wrapper}>
                <PokerFlipCardsInfo
                  onCLick={() => {
                    flipShowFlipCards();
                  }}
                />
              </div>
            )}
          </GamePage>
        </div>
      </Layout>
    </>
  );
}
