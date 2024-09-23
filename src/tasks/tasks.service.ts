import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import {
    Connection,
    Keypair,
    LAMPORTS_PER_SOL,
    PublicKey,
    clusterApiUrl,
  } from '@solana/web3.js';

import * as idl from './Idl/Contract.json'; // Directly import the IDL
import bs58 from 'bs58';
import {
    AnchorProvider,
    BN,
    Idl,
    Program,
    Wallet,
    EventParser,
    BorshCoder,
  } from '@coral-xyz/anchor';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TasksService {
  private connection: Connection;
  private provider: AnchorProvider;
  private program: Program;
  private wallet: Wallet;

  constructor(private configService: ConfigService) {
    // Connect to the Solana cluster
    

    // Load wallet from secret key
    const pvtKeyBytes = bs58.decode(this.configService.get<string>('PVT_KEY'))
    const keypair = Keypair.fromSecretKey(pvtKeyBytes);
    this.wallet = new Wallet(keypair);
   
    this.connection = new Connection(this.configService.get<string>('NODE_URL'), {
        commitment: 'confirmed',
        wsEndpoint: this.configService.get<string>('WSS_URL'),
      });
    // Create the provider
    this.provider = new AnchorProvider(this.connection, this.wallet, {
        commitment: 'confirmed',
      });
    // Create the program with the imported IDL
    const programId = new PublicKey(this.configService.get<string>('PROGRAM_ID'))
    this.program = new Program(
        idl as unknown as Idl,
        programId,
        this.provider,
      );
  }

  @Cron('0 0 */4 * *') // Run every minute
  async handleCron() {
    try {
      // Call the 'double' function in your Solana program
      console.log( this.wallet)
    //   const tx = await this.program.rpc.double({
    //     accounts: {
    //       myAccount: new PublicKey('TARGET_ACCOUNT_PUBLIC_KEY'), // Replace with the account you want to modify
    //     },
    //   });

    //   console.log('Transaction successful with signature:', tx);
    } catch (error) {
      console.error('Error executing transaction:', error);
    }
  }
}
