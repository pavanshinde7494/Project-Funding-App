
pragma solidity ^0.4.17 ;
 
 
 

contract CampaignFactory{
    address[] public deplyedCampaigns;
    
    function createCampaign(uint minimum) public{
        address newCampaign = new Campaign(minimum , msg.sender);
        deplyedCampaigns.push(newCampaign);
    }
    
    function getDeloyedCampaigns() public view returns(address[]) {
        return deplyedCampaigns;
    }
    
}


contract Campaign{
    
    struct Request{
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }
    
    Request[] public requests; 
    address public manager;
    uint public minimumContribution;
    mapping(address=>bool) public approvers;
    uint public approversCount ;
    
     modifier restricted(){
         require(msg.sender == manager);
         _;
    }
     
    function Campaign(uint minimum,address creator) public{
        manager = creator;
        minimumContribution = minimum;
        approversCount = 0;
    }
     
    function contribute() public payable{
        require(msg.value >= minimumContribution);
        if(approvers[msg.sender] == false){
            approvers[msg.sender] = true;
            approversCount++;
        }
    }
    
    function createRequest(string description,uint value,address recipient) 
        public restricted {
         Request memory newRequest = Request({
             description : description,
             value : value,
             recipient : recipient,
             complete : false,
             approvalCount : 0
             
         });
         requests.push(newRequest);
    }
    function approveRequest(uint index) public {
        Request storage request = requests[index]; 
        
        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);
        
        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }
    
    function finalizeRequest(uint index) public payable restricted{
        Request storage request = requests[index];  
        require(!request.complete);
        require(request.approvalCount >= approversCount/2);
        
        
        uint amtToTransfer = ((request.value < this.balance) ? request.value : this.balance);
        request.recipient.transfer(amtToTransfer);
        request.complete = true;
    }

    function getSummary() public view returns(
        uint,uint,uint,uint,address
    ){
        return (
            minimumContribution,
            this.balance,
            requests.length,
            approversCount,
            manager
        );
    }

    function getRequestsCount()public view returns(uint){
        return requests.length;
    }
}















