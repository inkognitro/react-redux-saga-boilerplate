const suffix = '1b901980-6cd9-4799-a19b-08f05941611b';

const REFRESH_TOKEN_ACTION_TYPE = 'REFRESH_TOKEN-' + suffix;
const refreshToken = () => {
    return {
        type: REFRESH_TOKEN_ACTION_TYPE,
    };
};

export {
    REFRESH_TOKEN_ACTION_TYPE, refreshToken,
};