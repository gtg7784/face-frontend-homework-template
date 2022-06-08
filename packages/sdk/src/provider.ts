import { ethers } from "ethers";
import { GlobalKey } from "./const";
import { logger } from "./logger";

interface RequestArguments {
  readonly method: string;
  readonly params?: unknown[] | object;
}

export class Provider {
  nodeUrl: string;
  fallbackPovider: any;

  constructor(nodeUrl: string) {
    this.nodeUrl = nodeUrl;
    this.fallbackPovider = new ethers.providers.JsonRpcProvider(nodeUrl);
  }

  async request(args: RequestArguments): Promise<unknown> {
    logger.info("request", args);
    if (args.method === "eth_accounts") {
      return [GlobalKey.address];
    }
    if (args.method === "eth_sendTransaction") {
      return this._sendTransaction(args.params);
    }
    return this.fallbackPovider.send(args.method, args.params);
  }

  async _sendTransaction(params: any) {
    const { type, nonce, to, gas, value, input, chainId } = params[0];

    let transactionRequest: any = {
      to,
      nonce,
      value,
      gasLimit: gas,
      data: input,
      chainId,
      type,
    };
    if (type === 0 || type === "0x0" || type == null) {
      transactionRequest = {
        ...transactionRequest,
        gasPrice: params[0].gasPrice,
        type: 0,
      };
    } else if (type === 2 || type === "0x2") {
      transactionRequest = {
        ...transactionRequest,
        maxFeePerGas: params[0].maxFeePerGas,
        maxPriorityFeePerGas: params[0].maxPriorityFeePerGas,
        type: 2,
      };
    }
    logger.info(transactionRequest);
    const signedTx = await GlobalKey.wallet.signTransaction(transactionRequest);
    return this.fallbackPovider.send("eth_sendRawTransaction", [signedTx]);
  }
}
