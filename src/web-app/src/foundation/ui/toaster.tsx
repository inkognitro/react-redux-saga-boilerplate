import React, { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "web-app/services.factory";
import { getAllToasts } from "packages/common/toaster/domain";
import { Toaster as CommonToaster } from "packages/common/toaster/ui/web";

export const Toaster: FC = () => {
    const toasterState = useSelector((state: RootState) => state.toaster);
    const toasts = getAllToasts(toasterState);
    return (<CommonToaster toasts={toasts} />);
};
