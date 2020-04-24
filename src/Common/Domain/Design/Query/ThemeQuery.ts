import { Theme, DesignState } from "Common/Domain/Design/Types";

export function getTheme(state: DesignState): Theme {
    return state.theme;
}

const defaultTheme: Theme = {
    colorText: "#212529",
    colorPrimary: "#007bff",
    colorSecondary: "#b3c2cf",
    colorSuccess: "#28a745",
    colorInfo: "#17a2b8",
    colorWarning: "#ffc107",
    colorError: "#dc3545",
    colorInteractive: "#007bff",
    colorInteracting: "#007bff",
    colorSmoothLineOnWhite: "#ededed",
};

export function getDefaultTheme(): Theme {
    return defaultTheme;
}
