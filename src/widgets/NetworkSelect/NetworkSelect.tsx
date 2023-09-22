import s from './styles.module.scss'
import arbitrumIco from '../../public/media/networkSelect_icons/arbitrumIco.svg'
import bnbIco from '../../public/media/networkSelect_icons/bnbChainIco.svg'
import downIco from '../../public/media/networkSelect_icons/dropDownIco.svg'
import {useEffect, useState} from "react";
import Image from 'next/image';
import {NetworkSelectItem} from "@/widgets/NetworkSelect/NetworkSelectItem";
import {NetworkErrorText} from "@/widgets/NetworkSelect/NetworkErrorText";
import {NetworkError} from "@/widgets/NetworkSelect/NetworkError";
import errorInfoIco from '../../public/media/networkSelect_icons/errorInfoIco.svg'

export const networksList = [
    // {
    //     ico: errorInfoIco,
    //     title: 'error',
    //     id: 'network_error'
    // },
    {
        ico: bnbIco,
        title: 'bnb chain',
        id: 'bnb'
    },
    {
        ico: arbitrumIco,
        title: 'arbitrum',
        id: 'arbitrum'
    }
]

export const NetworkSelect = () => {
    const [networkListVisibility, setNetworkListVisibility] = useState(false)
    const [activeNetwork, setActiveNetwork] = useState(undefined)
    const [networkList, setNetworkList] = useState(networksList)

    const handleNetworkListVChange = () => {
        !networkListVisibility ? setNetworkListVisibility(true) : setNetworkListVisibility(false)
    }

    return (
        <div className={s.network_select_wrap}>
            {
                activeNetwork === undefined ? (
                    <NetworkError networkChange={handleNetworkListVChange} />
                ) : (
                    <div className={s.network_select_body} onClick={handleNetworkListVChange} >
                        <div className={s.active_network_ico_wrap}>
                            <Image src={activeNetwork.ico} width={30} height={30} />
                        </div>
                        <span className={s.active_network_title}>{activeNetwork.title}</span>
                        <Image className={s.active_network_dropDown_ico} src={downIco} width={9} height={6} />
                    </div>
                )
            }
            <div className={`${s.networks_list_wrap} ${activeNetwork === undefined && s.undefined_network}` } style={{visibility: networkListVisibility && 'visible', opacity: networkListVisibility && '1'}} >
                {
                    activeNetwork === undefined && <NetworkErrorText error_text='wrong network' />
                }
                <div className={s.networks_list_title_wrap}>
                    <h3 className={s.networks_list_title}>Select a network</h3>
                </div>
                <div className={s.networks_list}>
                    {
                        networkList && networkList.map((item, ind) => (
                            <NetworkSelectItem key={ind} {...item} networkList={networkList} setNetworkList={setNetworkList} setActiveNetwork={setActiveNetwork} setNetworkVisibility={setNetworkListVisibility} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}