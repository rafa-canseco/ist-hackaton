# Recommendation Contract

## Address on testnet of Scroll:

## 0xC181BAd0421EA319152057D6d9d98860910B6ed9

https://sepolia.scrollscan.com/address/0xC181BAd0421EA319152057D6d9d98860910B6ed9

## Description
The `RecommendationContract` is an Smart contract build for Scroll L2 that allows users to create recommendations for places across three different categories: restaurants, coworking spaces, and tourist attractions. Each recommendation can receive votes affecting the score of the recommended place.

## Features
- **Create Recommendations**: Users can propose recommended places by providing specific details and a category.
- **Voting**: Other users can vote whether they agree (`agree`) or disagree (`disagree`) with the recommendation.
- **Retrieving Recommendations**: Recommendations can be retrieved by their ID or filtered by category.
- **User Scoring**: The user who makes a recommendation earns points for positive votes.

## Data Structure
Each `Recommendation` has the following properties:
- `categoryId`: The category identifier (1 for restaurants, 2 for coworking, 3 for tourist attractions).
- `proposer`: Ethereum address of the user making the recommendation.
- `score`: Accumulated score of the recommendation.
- `agree`/`disagree`: Counters for votes in favor or against.
- `details`: Detailed description of the recommendation.
- `ubication`: Physical location of the recommended place.
- `cardAccepted`: Indicates whether card payments are accepted.
- `fastWifi`: Availability of fast Wi-Fi.
- `ratingOverall`: Overall rating of the place (1-5).
- `cryptoAccepted`: Acceptance of cryptocurrency payments.
- `niceBathroom`: Whether it has nice bathrooms.

## Core Functions

## propose
```solidity
function propose(
    uint256 _categoryId,
    string memory _ubication,
    bool _cardAccepted,
    bool _cryptoAccepted,
    bool _fastWifi,
    bool _niceBathroom,
    string memory _details,
    uint256 _ratingOverall
) publicz```

Allows a user to propose a new recommendation.

## vote
```
function vote(uint256 _recommendationId, uint256 _vote) public
Allows a user to vote on an existing recommendation.```

##getRecommendation
```
function getRecommendation(uint256 _recommendationId) public view returns (Recommendation memory)
Retrieves the details of a recommendation by its ID.```

## getRecommendationsByCategory

```
function getRecommendationsByCategory(uint256 _categoryId) public view returns (uint256[] memory)
Returns an array of recommendation IDs that belong to a specific category.```

## getUserScore
```
function getUserScore(address _user) public view returns (int256)
Queries a user's score based on the votes of their recommendations.```

## Development Environment
```
To compile and deploy the contract, you'll need Hardhat.```

## Testing
```
Contract tests are written using Chai and are run with Hardhat.```

## Deployment
```
Include instructions on how to deploy the contract to an Ethereum network.


npx hardhat run scripts/deploy.ts  --network scrollSepolia 

### IMPORTANT replace in env the private key, rpc and api key of scrollscan when running this code for deploy with verification