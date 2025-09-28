// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    mapping(uint => Candidate) public candidates;
    mapping(address => bool) public hasVoted;
    uint public candidatesCount;

    event Voted(address voter, uint candidateId);

    function addCandidate(string memory _name) public {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    function vote(uint _candidateId) public {
        require(!hasVoted[msg.sender], "Already voted.");
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate ID");

        candidates[_candidateId].voteCount++;
        hasVoted[msg.sender] = true;

        emit Voted(msg.sender, _candidateId);
    }

    function getVotes(uint _candidateId) public view returns (uint) {
        return candidates[_candidateId].voteCount;
    }
}
