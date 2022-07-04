import { ApolloCache } from '@apollo/client/core';
export interface TriggerFunctionConfig<T> {
    cache: ApolloCache<T>;
}
declare const _default: <T>({ cache }: TriggerFunctionConfig<T>) => (persist: () => void) => () => void;
export default _default;
