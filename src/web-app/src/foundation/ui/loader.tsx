import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Loader as CommonLoader } from 'packages/common/loader/ui/web';
import { RootState } from 'web-app/services.factory';
import { shouldShowLoader } from 'packages/common/loader/domain';

export const Loader: FC = () => {
    const loaderState = useSelector((state: RootState) => state.loader);
    const isVisible = shouldShowLoader(loaderState);
    return <CommonLoader isVisible={isVisible} />;
};
