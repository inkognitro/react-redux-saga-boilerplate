export type BaseTheme = {
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

export const baseTheme: BaseTheme = {
    colorText: '#212529',
    colorPrimary: '#007bff',
    colorSecondary: '#b3c2cf',
    colorSuccess: '#28a745',
    colorInfo: '#17a2b8',
    colorWarning: '#ffc107',
    colorError: '#dc3545',
    colorInteractive: '#007bff',
    colorInteracting: '#007bff',
    colorSmoothLineOnWhite: '#007bff',
};

/*
@mixin boxShadow() {
  -webkit-box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.25);
  -moz-box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.25);
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.25);
}
*/