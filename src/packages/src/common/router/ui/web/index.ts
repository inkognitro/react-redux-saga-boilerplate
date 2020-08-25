import {
    RouterSpecification as RouterSpecificationType,
    RouteComponentSpecification as RouteComponentSpecificationType,
    RouterProps as RouterPropsType,
} from './router';

export type RouterSpecification = RouterSpecificationType;
export type RouteComponentSpecification = RouteComponentSpecificationType;
export type RouterProps = RouterPropsType;

export { RouteLink, FunctionalLink } from './link';
export { Router } from './router';
