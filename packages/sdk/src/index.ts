/**
 *
 * const sdk = new FaceSDK()
 * sdk.signup();
 * sdk.login();
 * sdk.getProvider()
 */

import { Provider } from "./provider";

function delay(ms: number) {
  return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      });
    });
}

export class FaceSDK {
  nodeUrl: string;

  constructor(nodeUrl: string) {
    this.nodeUrl = nodeUrl;
  }

  async checkEmail(email: string): Promise<boolean> {
    await delay(300);
    return true;
  }

  async sendVerificationEmail(email: string): Promise<void> {
    await delay(300);
  }

  async verifyEmailVerificationCode(email: string, verificationCode: string): Promise<boolean> {
    await delay(300);
    return true;
  }

  async signUp({ email, password }: { email: string; password: string }) {
    await delay(300);
    return {
      email,
      userId: "1",
    };
  }

  getProvider() {
    return new Provider(this.nodeUrl);
  }
}
