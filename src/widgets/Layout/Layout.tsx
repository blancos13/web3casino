import { ReactNode } from 'react';
import s from './styles.module.scss';

import { SideBar } from '@/widgets/SideBar';
import { Header } from '../header';
import { LayoutModel } from '.';
import {Blur} from "@/widgets/Blur/Blur";
import { useUnit } from 'effector-react';
import {Footer} from "@/widgets/Footer";



interface LayoutProps {
    children?: ReactNode[]
}
export const Layout = ({ children, ...props }: LayoutProps) => {

    return (
        <div className={s.page_container}>
            <Header />
            <div className={s.side_bar_wrapper}>
                <SideBar />
            </div>
            <Blur />
            <main style={{'width': '100%'}}>
                {children}
            </main>
            <Footer />
        </div>
    )
}