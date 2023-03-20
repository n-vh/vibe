import V from 'fluent-json-schema';

export const RouteSchema = {
  body: V.object()
    .prop('username', V.string().required())
    .prop('email', V.string().format('email').required()),
};
