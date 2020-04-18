export type DesignState = {
    theme: Theme,
};

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

/*
@mixin boxShadow() {
  -webkit-box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.25);
  -moz-box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.25);
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.25);
}
*/