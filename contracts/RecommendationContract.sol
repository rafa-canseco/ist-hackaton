// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract RecommendationContract {
    struct Recommendation {
        uint256 categoryId; // 1 restaurantes // 2 cowork // 3 atracciones turisiticas
        address proposer;
        uint256 score;
        uint256 agree;
        uint256 disagree;
        string details;
        string ubication;
        bool cardAccepted;
        bool fastWifi;
        uint256 ratingOverall;
        bool cryptoAccepted;
        bool niceBathroom;
    }

    Recommendation[] public recommendations;
    mapping(uint256 => mapping(address => bool)) public hasVoted;
    mapping(address => int256) public userScores;

    function propose(
        uint256 _categoryId,
        string memory _ubication,
        bool _cardAccepted,
        bool _cryptoAccepted,
        bool _fastWifi,
        bool _niceBathroom,
        string memory _details,
        uint256 _ratingOverall
        ) public {
        require(_categoryId >= 1 && _categoryId <=3,"Invalid category ID");
        require(_ratingOverall >= 1 && _ratingOverall <=5, "Invalid rating, must be between 1 and 5");

        recommendations.push(Recommendation({
            categoryId: _categoryId,
            details: _details,
            ubication: _ubication,
            cardAccepted: _cardAccepted,
            cryptoAccepted: _cryptoAccepted,
            ratingOverall: _ratingOverall,
            fastWifi: _fastWifi,
            niceBathroom: _niceBathroom,
            proposer: msg.sender,
            score: 0,
            agree: 0,
            disagree: 0
        }));
        }

        function vote(uint256 _recommendationId, uint256 _vote) public {
            require(_recommendationId < recommendations.length, "Recommendation does not exist");
            require(_vote == 1 || _vote == 2, "Invalid vote");
            require(!hasVoted[_recommendationId][msg.sender], "you already voted");

            Recommendation storage recommendation = recommendations[_recommendationId];

            if (_vote == 1) {
                recommendation.agree += 1;
                userScores[recommendation.proposer] += 1;
            } else {
                recommendation.disagree += 1;
                userScores[recommendation.proposer] -= 1;
            }

            recommendation.score = uint256(recommendation.agree) - uint256(recommendation.disagree);

            hasVoted[_recommendationId][msg.sender] = true;
        }

        function getRecommendationCount() public view returns (uint256) {
            return recommendations.length;
        }

        function getRecommendation(uint256 _recommendationId) public view returns (Recommendation memory) {
            require(_recommendationId < recommendations.length, "Recommendation does not exist");
            return recommendations[_recommendationId];
        }

        function getRecommendationsByCategory(uint256 _categoryId) public view returns (uint256[] memory) {
    require(_categoryId >= 1 && _categoryId <= 3, "Invalid category ID");

    uint256[] memory categoryRecommendationsIds = new uint256[](recommendations.length);
    uint256 count = 0;
    
    // Recorremos todas las recomendaciones y almacenamos los índices que coincidan con la categoría
    for (uint256 i = 0; i < recommendations.length; i++) {
        if (recommendations[i].categoryId == _categoryId) {
            categoryRecommendationsIds[count] = i;
            count++;
        }
    }

    // Copiamos los índices al array de tamaño correcto
    uint256[] memory recommendationsIds = new uint256[](count);
    for (uint256 i = 0; i < count; i++) {
        recommendationsIds[i] = categoryRecommendationsIds[i];
    }

    return recommendationsIds;
}


        function getUserScore(address _user) public view returns (int256) {
            return userScores[_user];
        }
    }