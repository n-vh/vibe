import V from 'fluent-json-schema';

export const VerifyRouteSchema = {
  body: V.object().prop('token', V.string().required()).prop('password', V.string()),
};
