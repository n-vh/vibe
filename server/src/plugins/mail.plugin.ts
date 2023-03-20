import type { FastifyPluginCallback } from 'fastify';
import type Options from 'mailgun.js/interfaces/Options';
import { MailService } from '~/services';

declare module 'fastify' {
  interface FastifyInstance {
    mail: MailService;
  }
}

export const mail: FastifyPluginCallback<Options> = (app, opts, next) => {
  const mail = new MailService(app, opts);
  app.decorate('mail', mail);

  next();
};

mail[Symbol.for('skip-override')] = true;
