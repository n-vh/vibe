import type { MailgunMessageData } from 'mailgun.js/interfaces/Messages';
import type { FastifyInstance } from 'fastify';
import type { User } from '~/shared/types';
import type Client from 'mailgun.js/client';
import Mailgun from 'mailgun.js';
import FormData from 'form-data';
import Options from 'mailgun.js/interfaces/Options';

export class MailService {
  private app: FastifyInstance;
  private client: Client;

  constructor(app: FastifyInstance, options: Options) {
    const mailgun = new Mailgun(FormData);

    this.app = app;
    this.client = mailgun.client(options);
  }

  public sendSignUp(user: Partial<User>) {
    const { url, token } = this.appendTokenToURL('signup', user, '24h');

    this.send({
      to: user.email,
      subject: 'Vibe account signup',
      text: url,
      html: `
        <p>Thank you for signing up with Vibe.</p>
        <p>To confirm your signup, please click on the following link:</p>
        <p>
          <a href="${url}">${url}</a>
        </p>
        <p>Thank you,<br />The Vibe Team</p>
      `,
    });

    return token;
  }

  private async send(data: MailgunMessageData) {
    this.client.messages
      .create(import.meta.env.VITE_DOMAIN_NAME, {
        ...data,
        from: `Vibe <noreply@${import.meta.env.VITE_DOMAIN_NAME}>`,
      })
      .catch((err) => console.error(err));
  }

  private appendTokenToURL<T>(route: string, payload: T, expiresIn: string) {
    const token = this.app.jwt.sign({ payload }, { expiresIn });
    return { url: `${import.meta.env.VITE_HOST_URL}/${route}/${token}`, token };
  }
}
