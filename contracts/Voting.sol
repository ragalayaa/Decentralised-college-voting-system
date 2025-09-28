// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Voting {
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    mapping(uint => Candidate) public candidates;
    mapping(address => bool) public hasVoted;
    uint public candidatesCount;

    // Events
    event Voted(uint candidateId, address voter);

    // Add candidate
    function addCandidate(string memory _name) public {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    // Vote for a candidate
    function vote(uint _candidateId) public {
        require(!hasVoted[msg.sender], "Already voted");
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate");

        hasVoted[msg.sender] = true;
        candidates[_candidateId].voteCount++;

        emit Voted(_candidateId, msg.sender);
    }

    // Get votes for a candidate
    function getVotes(uint _candidateId) public view returns (uint) {
        return candidates[_candidateId].voteCount;
    }
}
