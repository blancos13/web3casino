import { FC, ReactElement, useEffect, useState } from 'react';
import Image from 'next/image';
import s from './styles.module.scss';
import AccountIcon from '@/public/media/player_icons/playerIcon1.png';
import { useUnit } from 'effector-react';
import { sessionModel } from '@/entities/session';
import { settingsModel } from '@/entities/settings';
import FacebookEmblem from '@/public/media/social_media/facebook.svg';
import TwitterEmblem from '@/public/media/social_media/twitter.svg';
import * as Api from '@/shared/api';
import { web3 } from '@/entities/web3/index';
import { BigNumber, ethers } from 'ethers';
import Web3 from 'web3';
import { ABI as IERC20 } from '@/shared/contracts/ERC20';
import HeaderLogo from '@/public/media/brand_images/HeaderLogo.svg';
import HeaderBrandText from '@/public/media/brand_images/HeaderBrandText.svg';
import Burger from '@/public/media/misc/burger.svg';
import ChatIcon from '@/public/media/misc/chatIcon.svg';
import BellIcon from '@/public/media/misc/bellIcon.svg';
import { SideBarModel } from '@/widgets/SideBar';
import * as BlurModel from '@/widgets/Blur/model'
import { CoinButton, DiceButton, RPCButton, PokerButton, GamesIcon, ArrowIcon, SupportIcon } from '@/shared/SVGs';
import { NetworkSelect } from "@/widgets/NetworkSelect/NetworkSelect";
import { AvaibleWallet } from "@/widgets/AvaibleWallet";
import * as SidebarM from '@/widgets/SideBar/model'
import * as MainWallet from '../../pages/model'
import { Open } from "@/widgets/header/model";
import * as HeaderAccModel from "@/widgets/Account/model";
import closeIco from "@/public/media/headerIcons/Close.svg";
import { Account } from "../Account";
import { useAccount } from 'wagmi';
import TestProfilePic from '@/public/media/misc/TestProfilePic.svg';

interface EmblemProps { }
const Emblem: FC<EmblemProps> = (props) => {
  return (
    <div className={s.emblem}>
      <Image src={HeaderLogo} alt={""} width={36} height={46.07} />
      <Image src={HeaderBrandText} alt={""} width={54.71} height={23.71} />
    </div>
  );
};

interface LeftMenuProps { }
const LeftMenu: FC<LeftMenuProps> = (props) => {
  const [flipOpen, isOpen] = useUnit([
    SideBarModel.flipOpen,
    SideBarModel.$isOpen,
  ]);
  return (
    <div className={s.left_menu}>
      <div
        className={s.burger}
        onClick={() => {
          flipOpen();
        }}
      >
        <Image src={Burger} alt={""} width={22.5} height={15} />
      </div>
      <Emblem />
    </div>
  );
};

interface LinksProps { }
const Links: FC<LinksProps> = (props) => {
  return (
    <div className={s.links}>
      <div className={`${s.link}`}>NFT Market</div>
      {/* <div className={`${s.link} ${s.link_active}`}>
            LeaderBoard
        </div> */}
    </div>
  );
};

interface ConnectWalletButtonProps { }
const ConnectWalletButton: FC<ConnectWalletButtonProps> = (props) => {
  const [isOpen, isMainWalletOpen, setBlur] = useUnit([
    SideBarModel.$isOpen,
    MainWallet.$isMainWalletOpen,
    BlurModel.setBlur,
  ]);

  const [walletVisibility, setWalletVisibility] = useState(false);

  const handleConnectWalletBtn = () => {
    if (isMainWalletOpen) {
      return null;
    }

    if (!walletVisibility) {
      setWalletVisibility(true);
      setBlur(true);
    } else {
      setWalletVisibility(false);
      setBlur(false);
    }
  };

  // useEffect(() => {
  //     walletVisibility ? (document.documentElement.style.overflow = 'hidden') :
  //         (document.documentElement.style.overflow = 'visible')
  // }, [walletVisibility])

  const hideAvaibleWallet = () => {
    setWalletVisibility(false);
    setBlur(false);
  };

  return (
    <div className={s.connect_wallet_button_wrap}>
      <div className={s.connect_wallet_button} onClick={handleConnectWalletBtn}>
        Connect Wallet
      </div>
      <div
        className={`${s.header_avaibleWallet_wrap} ${walletVisibility && s.avaibleWallet_visible
          }`}
      >
        <AvaibleWallet hideAvaibleWallet={hideAvaibleWallet} />
      </div>
    </div>
  );
};

interface RightMenuProps { };
const RightMenu: FC<RightMenuProps> = props => {
  const { isConnected } = useAccount();

  const [screenWidth, setScreenWidth] = useState(0);

  const condition = true;

  const [
    isOpen,
    close,
    openHeaderAcc,
    closeHeaderAcc,
    isHeaderAccOpened,
    setBlur,
  ] = useUnit([
    SideBarModel.$isOpen,
    SideBarModel.Close,
    HeaderAccModel.Open,
    HeaderAccModel.Close,
    HeaderAccModel.$isHeaderAccountOpened,
    BlurModel.setBlur,
  ]);

  const closeSidebar = () => {
    close();
    document.documentElement.style.overflow = "visible";
  };

  useEffect(() => {
    setScreenWidth(window.innerWidth);
  }, []);

  const handleHeaderAccountVisibility = () => {
    if (!isHeaderAccOpened) {
      setBlur(true);
      openHeaderAcc();
    }
  };
  return (
    <div className={s.right_menu}>
      <div className={s.button}>
        <Image
          src={BellIcon}
          alt={""}
          // width={24}
          // height={25}
          className={s.icon}
        />
        <div className={s.new_notification}></div>
      </div>
      <div className={s.button}>
        <Image
          src={ChatIcon}
          alt={""}
          // width={24}
          // height={25}
          className={s.icon}
        />
      </div>
      {isOpen && screenWidth <= 650 ? (
        <button
          className={s.header_mobile_closeSidebar_btn}
          onClick={closeSidebar}
        >
          <Image alt="close-ico" src={closeIco} />
        </button>
      ) : (
        <div className={s.header_mobile_right_wrap}>
          {isConnected ? (
            <div className={s.header_profile_ico_wrap}>
              <div
                className={s.header_profile_ico_block}
                onClick={handleHeaderAccountVisibility}
              >
                <span className={s.header_profile_ico_title}>А</span>
              </div>
              {isHeaderAccOpened && <Account />}
            </div>
          ) : (
            <ConnectWalletButton />
          )}
        </div>
      )}
    </div>
  );
}

export interface NetworkPickerProps { };
export const NetworkPicker: FC<NetworkPickerProps> = props => {
  const [currentWalletAddress,
    currentNetwork,
    pickNetwork,
    availableNetworks,
    availbaleRpcs,
    web3Provider
  ] = useUnit([
    sessionModel.$currentWalletAddress,
    sessionModel.$currentNetwork,
    sessionModel.pickNetwork,
    settingsModel.$AvailableNetworks,
    settingsModel.$AvailableRpcs,
    web3.web3Provider
  ]);

  const ethereum = web3Provider?.provider;

  let chains: ReactElement[] = [];
  for (let availableNetwork of availableNetworks.networks) {
    if (currentNetwork != null && availableNetwork.network_id == currentNetwork.network_id) {
      continue;
    }
    chains.push(<div className={s.network} onClick={async () => {
      const rpcs = await (await Api.getRpcsFx({ network_id: availableNetwork.network_id })).body as Api.T_Rpcs;
      const networkParams = {
        chainId: `0x${availableNetwork.network_id.toString(16)}`,
        chainName: availableNetwork.network_name,
        nativeCurrency: {
          name: availableNetwork.currency_name,
          symbol: availableNetwork.currency_symbol,
          decimals: availableNetwork.decimals
        },
        rpcUrls: rpcs.rpcs.map((rpc) => rpc.url),
        blockExplorerUrls: null
      };
      // await ethereum?.getNetwork()({
      //     method: 'wallet_addEthereumChain',
      //     params: [networkParams]
      // }).then(() => {
      //     pickNetwork(availableNetwork);
      // });
      if (ethereum != null && ethereum.request != null) {
        ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [networkParams]
        }).then(() => {
          pickNetwork(availableNetwork);
        });
      }
    }
    }>
      <Image
        src={`/static/media/networks/${availableNetwork.network_id}.svg`}
        alt=""
        width={28}
        height={28}
      />
      {availableNetwork.network_name}
    </div >);
  }

  return (<div className={s.network_picker_container} style={currentWalletAddress ? {} : { display: 'none' }}>
    <div className={`${s.network_picker} ${currentNetwork == null ? s.network_picker_unknown : ''}`}>
      {currentWalletAddress == null ? <></> : currentNetwork == null ?
        'Unknown Network' :
        <>
          <Image
            src={`/static/media/networks/${currentNetwork.network_id}.svg`}
            alt=""
            width={28}
            height={28}
          />
          {currentNetwork.network_name}
          <div className={s.network_picker_arrow}>
            {'>'}
          </div>

        </>}

    </div>
    <div className={s.networks_list}>
      {chains}
    </div>
  </div>);
}

interface BottomMenuProps { }
const BottomMenu: FC<BottomMenuProps> = (props) => {
  const [openSidebar] = useUnit([SideBarModel.Open]);

  const openSB = () => {
    openSidebar();
    window.scrollTo(0, 0);
    document.documentElement.style.overflow = "hidden";
  };

  return (
    <div className={s.bottom_menu}>
      <div className={s.element} onClick={openSB}>
        <Image src={Burger} alt="" />
      </div>
      <div className={s.element}>
        <GamesIcon />
      </div>
      <div className={s.element}>
        <SupportIcon />
      </div>
      <div className={s.element}>
        <Image src={ChatIcon} alt="" />
      </div>
    </div>
  );
};

export interface HeaderProps { }
export const Header: FC<HeaderProps> = props => {
  return (<>
    <>
      <div className={s.header}>
        <LeftMenu />
        <Links />
        <NetworkSelect />
        <RightMenu />
      </div>
      <BottomMenu />
    </>
  </>);
}