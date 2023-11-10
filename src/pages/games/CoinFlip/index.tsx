import { CoinFlip } from "@/widgets/CoinFlip/CoinFlip";
import { GamePage } from "@/widgets/GamePage/GamePage";
import { Layout } from "@/widgets/Layout";
import s from "./styles.module.scss";
import {
  CustomWagerRangeInput,
  CustomWagerRangeInputModel,
} from "@/widgets/CustomWagerRangeInput";
import { WagerGainLoss } from "@/widgets/WagerGainLoss";
import { ProfitBlock } from "@/widgets/ProfitBlock";
import { WagerLowerBtnsBlock } from "@/widgets/WagerLowerBtnsBlock/WagerLowerBtnsBlock";
import { WagerInputsBlock } from "@/widgets/WagerInputsBlock/WagerInputsBlock";
import { SidePicker } from "@/widgets/CoinFlipSidePicker";
import { WagerModel } from "@/widgets/Wager";
import { useAccount } from "wagmi";
import { useUnit } from "effector-react";
import { LiveBetsWS } from "@/widgets/LiveBets";
import clsx from "clsx";

const WagerContent = () => {
  const [pressButton] = useUnit([WagerModel.pressButton]);
  const { isConnected } = useAccount();
  return (
    <>
      <WagerInputsBlock />
      <CustomWagerRangeInput
        inputTitle="Bets"
        min={1}
        max={100}
        inputType={CustomWagerRangeInputModel.RangeType.Bets}
      />
      <WagerGainLoss />
      <ProfitBlock />
      <SidePicker />
      <button
        className={clsx(s.connect_wallet_btn, s.mobile)}
        onClick={() => {
          pressButton();
          (window as any).fbq("track", "Purchase", {
            value: 0.0,
            currency: "USD",
          });
        }}
      >
        {isConnected ? "Place bet" : "Connect Wallet"}
      </button>
      <WagerLowerBtnsBlock game="coinflip" />
    </>
  );
};

export default function CoinFlipGame() {
  return (
    <Layout gameName={"CoinFlip"}>
      <LiveBetsWS
        subscription_type={"Subscribe"}
        subscriptions={["CoinFlip"]}
      />
      <div className={s.coinflip_container}>
        <GamePage
          gameInfoText="test"
          gameTitle="coinflip"
          wagerContent={<WagerContent />}
        >
          <CoinFlip />
        </GamePage>
      </div>
    </Layout>
  );
}
