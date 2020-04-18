"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = require("react-redux");
const Loader_1 = require("Common/UI/Base/Loader");
const HttpRequestQuery_1 = require("Common/Domain/RequestHandling/Base/Http/Query/HttpRequestQuery");
const mapStateToProps = (state) => {
    return {
        isVisible: HttpRequestQuery_1.isHttpRequestRunningWithEnabledLoader(state.http),
    };
};
exports.Loader = react_redux_1.connect(mapStateToProps)(Loader_1.Loader);
//# sourceMappingURL=Loader.js.map