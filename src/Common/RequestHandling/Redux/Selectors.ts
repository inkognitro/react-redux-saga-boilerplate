import {ExecutionSummary} from "Common/RequestHandling/Redux/Types";

export function getResponseBodyJson(summary: ExecutionSummary): object {
    if (!summary.response || !summary.response.body) {
        return {};
    }
    return summary.response.body;
}