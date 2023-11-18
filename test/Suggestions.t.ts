import { expect } from "chai";
import { ethers } from "hardhat";
import {  SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import { RecommendationContract, RecommendationContract__factory} from "../typechain-types";

describe("RecommendationContract", function () {
let recommendationContract: RecommendationContract;
let deployer: SignerWithAddress;
let addr1 : SignerWithAddress;
let addr2 :SignerWithAddress;

beforeEach(async () => {
  [deployer,addr1,addr2] = await ethers.getSigners();

  const RecomendationContractFactory = await ethers.getContractFactory("RecommendationContract");
  recommendationContract = (await RecomendationContractFactory.deploy()) as unknown as RecommendationContract;
  await recommendationContract.waitForDeployment()

});


it("should allow a user to propose a recommendation", async function () {
  const proposeTx = await recommendationContract.propose(
    1,// categoria
    "123 main st", //ubication
    true,//CardAccepted
    true,// cryptoAccepted
    true, //openwifi,
    true, // niceBathroom
    "nice place with a great view", //details
    5 //ratingOverall
  );

  await proposeTx.wait();

  const recommendation = await recommendationContract.recommendations(0);

  expect(recommendation.categoryId).to.equal(1);
  expect(recommendation.ubication).to.equal("123 main st");
  expect(recommendation.cardAccepted).to.be.true;
  expect(recommendation.cryptoAccepted).to.be.true;
  expect(recommendation.fastWifi).to.be.true;
  expect(recommendation.niceBathroom).to.be.true;
  expect(recommendation.details).to.equal("nice place with a great view");
  expect(recommendation.ratingOverall).to.equal(5);
});

it("should allow a user to propose a recommendation", async function () {
  const proposeTx = await recommendationContract.propose(
    1,// categoria
    "123 main st", //ubication
    true,//CardAccepted
    true,// cryptoAccepted
    true, //openwifi
    true,
    "nice place with a great view", //details
    5 //ratingOverall
  );

  await proposeTx.wait();

  const recommendation = await recommendationContract.recommendations(0);

  expect(recommendation.categoryId).to.equal(1);
  expect(recommendation.ubication).to.equal("123 main st");
  expect(recommendation.cardAccepted).to.be.true;
  expect(recommendation.cryptoAccepted).to.be.true;
  expect(recommendation.fastWifi).to.be.true;
  expect(recommendation.niceBathroom).to.be.true;
  expect(recommendation.details).to.equal("nice place with a great view");
  expect(recommendation.ratingOverall).to.equal(5);
});

it("should allow users to vote on a recommendation",async function() {
  await recommendationContract.propose(2,"ubication",true,false,true,true,"details",4);

  await recommendationContract.connect(addr1).vote(0,1);

  await recommendationContract.connect(addr2).vote(0,2);

  const recommendation = await recommendationContract.recommendations(0);

  expect(recommendation.agree).to.equal(1);
  expect(recommendation.disagree).to.equal(1);
});

it("should retrieve all recommendations of a specific category", async function () {
  // Proponer algunas recomendaciones en diferentes categorías
  await recommendationContract.propose(1, "Ubication1", true, true, true, true, "Details1", 4);
  await recommendationContract.propose(2, "Ubication2", true, false, true, true, "Details2", 3);
  await recommendationContract.propose(1, "Ubication3", false, true, false, true, "Details3", 5);

  // Recuperar las recomendaciones de la categoría 1
  const recommendationsCategory1 = await recommendationContract.getRecommendationsByCategory(1);

  // Verificar que solo se devuelvan las recomendaciones de la categoría 1
  expect(recommendationsCategory1.length).to.equal(2);
  for (const id of recommendationsCategory1) {
    const recommendation = await recommendationContract.recommendations(id);
    expect(recommendation.categoryId).to.equal(1);
  }
});
  
});
 