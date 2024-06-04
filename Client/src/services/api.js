const BASE_URL = process.env.REACT_APP_BASE_URL;
const createEndpoints = (category, apiDefinitions) => {
    const result = {};
    for (const [apiName, endpoint] of Object.entries(apiDefinitions)) {
      result[apiName] = `${BASE_URL}/${category}/${endpoint}`;
    }
    return result;
  };

export const userEndpoints = createEndpoints('user', {
    LOGIN_API: 'login',
    SIGNUP_API: 'signup',
})