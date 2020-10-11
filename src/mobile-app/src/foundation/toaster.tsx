import React, { FC } from "react";
import { useSelector } from "react-redux";
import { Toaster as CommonToaster } from "packages/common/toaster/ui/native";
import { RootState } from "mobile-app/services.factory";
import { getAllToasts } from "packages/common/toaster/domain";

export const Toaster: FC = () => {
    const toasterState = useSelector((state: RootState) => state.toaster);
    const toasts = getAllToasts(toasterState);
    return (<CommonToaster toasts={toasts} />);
};
