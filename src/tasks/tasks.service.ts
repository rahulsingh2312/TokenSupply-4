import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ethers } from 'ethers';
import { ConfigService } from '@nestjs/config';
import { contractABI } from '../commons/contract/Abi'

@Injectable()
export class TasksService {
  private provider: ethers.providers.JsonRpcProvider;
  private contract: ethers.Contract;
  private signer: ethers.Wallet;

  constructor(private configService: ConfigService) {
    // Connect to the Ethereum network
    this.provider = new ethers.providers.JsonRpcProvider(this.configService.get<string>('ETH_NODE_URL'));

    // Create a signer from the private key
    const privateKey = this.configService.get<string>('PRIVATE_KEY');
    this.signer = new ethers.Wallet(privateKey, this.provider);

    
    
    const contractAddress = this.configService.get<string>('CONTRACT_ADDRESS');

    // Create a contract instance connected to the signer
    this.contract = new ethers.Contract(contractAddress, contractABI, this.signer);
  }

  @Cron('0 0 */4 * *') // Run every minute
  async handleCron() {
    try {
      // Call the on-chain function (e.g., a function named 'myFunction')
    //   const result = await this.contract.myFunction(); // Adjust this to your function
     console.log("scheduled work....")
    } catch (error) {
      console.error('Error calling on-chain function:', error);
    }
  }
}
