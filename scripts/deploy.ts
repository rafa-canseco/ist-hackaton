import {ethers} from "ethers";
import * as dotenv from "dotenv";
import { run } from "hardhat";
import { RecommendationContract__factory } from "../typechain-types";
dotenv.config();

function setUpProvider(){
    const provider = new ethers.JsonRpcProvider(
        process.env.RPC_ENDPOINT_URL ?? ""
    );
    return provider;
}

async function main(){
    const provider = setUpProvider();
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "", provider);
    console.log("deploying contract");

    const recommendationContractFactory = new RecommendationContract__factory(wallet);
    const recommendationContract = await recommendationContractFactory.deploy();
    const deploymentTransaction = recommendationContract.deploymentTransaction();
    await deploymentTransaction?.wait(5);
    await recommendationContract.waitForDeployment();
    console.log("contract deployed")
    const recommendationContractAddress = await recommendationContract.getAddress()
    console.log("waiting for 5 confirmations...");
    console.log("transaction has been confirmed 5 times");
    console.log("contract address:", recommendationContractAddress);

    await run("verify:verify", {
        address: recommendationContractAddress
    });

    console.log("Recommendation contract Adress:",recommendationContractAddress)
}

main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error);
    process.exit(1);
});