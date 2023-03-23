import V from 'fluent-json-schema';

export const RouteSchema = {
  body: V.object()
    .prop('username', V.string().required())
    .prop('email', V.string().format('email').required()),
};

export const LoginRouteSchema = {
  body: V.object()
    .prop('username', V.string().required())
    .prop('password', V.string().required()),
};

export const ForgotPasswordRouteSchema = {
  body: V.object().prop('email', V.string().format('email').required()),
};
