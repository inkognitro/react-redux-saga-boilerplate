export type DesignState = {
    theme: Theme;
};

export type DesignStateSelector = (state: any) => DesignState;

export type Theme = {
    colorText: string;
    colorPrimary: string;
    colorSecondary: string;
    colorSuccess: string;
    colorInfo: string;
    colorWarning: string;
    colorError: string;
    colorInteractive: string;
    colorInteracting: string;
    colorSmoothLineOnWhite: string;
};
