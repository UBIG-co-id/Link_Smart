import React from "react";
import { Outlet } from "react-router-dom";
import Head from "./Head";
import Header from "./Header";
import FileManagerProvider from "../pages/app/component/Context";
import AppRoot from './global/AppRoot';
import AppWrap from "./global/AppWrap";

const layout = ({ title, ...props }) => {
    return (
        <FileManagerProvider>
            <Head title={!title && 'Loading'} />
            <AppRoot>
                <AppWrap>
                    <Header fixed />
                    <Outlet />
                </AppWrap>
            </AppRoot>
        </FileManagerProvider>

    )
}

export default layout
