// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract SupplyChain3 {
    struct VendorInfo {
        string organization;
        uint256 gstin;
        string location;
        bool isRegistered;
    }

    struct ConsumerInfo {
        string name;
        string email;
        string phone;
        bool isRegistered;
        uint256[] purchaseHistory;
    }

    struct Product {
        string name;
        string category;
        string description;
        uint256 price;
        uint256 quantity;
        uint256 barcodeNo;
        uint256[] rawMaterials;
        uint256 greenScore;
        address currentVendor;
        address[] previousVendors;
        bool isActive;
        bool isCreated;  // To distinguish between created and purchased products
    }

    struct JourneyStep {
        address vendor;
        address consumer;
        string organization;
        string location;
        string status;
        uint256 timestamp;
        uint256 quantity;
    }

    struct ProductJourney {
        uint256 productId;
        JourneyStep[] steps;
    }

    mapping(uint256 => Product) public products;
    mapping(uint256 => ProductJourney) public productJourneys;
    mapping(address => uint256[]) public vendorProducts;
    mapping(address => uint256) public vendorReputationScores;
    mapping(address => VendorInfo) public vendorDetails;
    mapping(address => ConsumerInfo) public consumerDetails;
    
    uint256 private productCounter = 0;
    
    event ProductAdded(uint256 productId, string name, address vendor);
    event ProductPurchased(uint256 productId, address from, address to, uint256 quantity);
    event InventoryUpdated(uint256 productId, uint256 newQuantity);
    event VendorRegistered(address vendor, string organization, string location);
    event ConsumerRegistered(address consumer, string name);
    event ConsumerPurchase(uint256 productId, address consumer, uint256 quantity);

    modifier onlyRegisteredVendor() {
        require(vendorDetails[msg.sender].isRegistered, "Vendor not registered");
        _;
    }

    modifier onlyRegisteredConsumer() {
        require(consumerDetails[msg.sender].isRegistered, "Consumer not registered");
        _;
    }

    modifier onlyProductVendor(uint256 _productId) {
        require(products[_productId].currentVendor == msg.sender, "Only current vendor can modify this product");
        _;
    }

    function registerConsumer(string memory _name, string memory _email, string memory _phone) public {
        require(!consumerDetails[msg.sender].isRegistered, "Consumer already registered");
        uint256[] memory emptyHistory = new uint256[](0);
        consumerDetails[msg.sender] = ConsumerInfo({
            name: _name,
            email: _email,
            phone: _phone,
            isRegistered: true,
            purchaseHistory: emptyHistory
        });
        emit ConsumerRegistered(msg.sender, _name);
    }

    function registerVendor(string memory _organization, uint256 _gstin, string memory _location) public {
        require(!vendorDetails[msg.sender].isRegistered, "Vendor already registered");
        vendorDetails[msg.sender] = VendorInfo({
            organization: _organization,
            location: _location,
            gstin: _gstin,
            isRegistered: true
        });
        emit VendorRegistered(msg.sender, _organization, _location);
    }

    function addProduct(
        string memory _name,
        string memory _category,
        string memory _description,
        uint256 _price,
        uint256 _quantity,
        uint256 _barcodeNo,
        uint256[] memory _rawMaterials
    ) public onlyRegisteredVendor returns (uint256) {
        require(_quantity > 0, "Quantity must be greater than 0");
        require(_price > 0, "Price must be greater than 0");
        
        for(uint256 i = 0; i < _rawMaterials.length; i++) {
            require(products[_rawMaterials[i]].isActive, "Invalid raw material product ID");
        }
        
        uint256 greenScore = calculateGreenScore(_rawMaterials);
        productCounter++;
        
        products[productCounter] = Product({
            name: _name,
            category: _category,
            description: _description,
            price: _price,
            quantity: _quantity,
            barcodeNo: _barcodeNo,
            rawMaterials: _rawMaterials,
            greenScore: greenScore,
            currentVendor: msg.sender,
            previousVendors: new address[](0),
            isActive: true,
            isCreated: true
        });

        JourneyStep memory initialStep = JourneyStep({
            vendor: msg.sender,
            consumer: address(0),
            organization: vendorDetails[msg.sender].organization,
            location: vendorDetails[msg.sender].location,
            status: "Created",
            timestamp: block.timestamp,
            quantity: _quantity
        });

        productJourneys[productCounter].productId = productCounter;
        productJourneys[productCounter].steps.push(initialStep);

        vendorProducts[msg.sender].push(productCounter);
        
        emit ProductAdded(productCounter, _name, msg.sender);
        return productCounter;
    }

    function purchaseProduct(uint256 _productId, uint256 _quantity) public onlyRegisteredVendor {
        Product storage product = products[_productId];
        require(product.isActive, "Product is not active");
        require(product.quantity >= _quantity, "Insufficient quantity");
        
        product.quantity -= _quantity;
        product.previousVendors.push(product.currentVendor);
        product.currentVendor = msg.sender;
        product.isCreated = false;
        
        productJourneys[_productId].steps.push(JourneyStep({
            vendor: msg.sender,
            consumer: address(0),
            organization: vendorDetails[msg.sender].organization,
            location: vendorDetails[msg.sender].location,
            status: "Purchased",
            timestamp: block.timestamp,
            quantity: _quantity
        }));
        
        vendorProducts[msg.sender].push(_productId);
        
        emit ProductPurchased(_productId, product.currentVendor, msg.sender, _quantity);
    }

    function consumerPurchaseProduct(uint256 _productId, uint256 _quantity) public onlyRegisteredConsumer {
        Product storage product = products[_productId];
        require(product.isActive, "Product is not active");
        require(product.quantity >= _quantity, "Insufficient quantity");
        
        product.quantity -= _quantity;
        
        productJourneys[_productId].steps.push(JourneyStep({
            vendor: product.currentVendor,
            consumer: msg.sender,
            organization: "Consumer Purchase",
            location: "Consumer Location",
            status: "Purchased by Consumer",
            timestamp: block.timestamp,
            quantity: _quantity
        }));
        
        consumerDetails[msg.sender].purchaseHistory.push(_productId);
        
        emit ConsumerPurchase(_productId, msg.sender, _quantity);
    }

    function getVendorCreatedProducts(address _vendor) public view returns (uint256[] memory) {
        uint256[] memory allProducts = vendorProducts[_vendor];
        uint256 createdCount = 0;
        
        // First count created products
        for (uint256 i = 0; i < allProducts.length; i++) {
            if (products[allProducts[i]].isCreated) {
                createdCount++;
            }
        }
        
        // Then fill array with created products
        uint256[] memory createdProducts = new uint256[](createdCount);
        uint256 currentIndex = 0;
        
        for (uint256 i = 0; i < allProducts.length; i++) {
            if (products[allProducts[i]].isCreated) {
                createdProducts[currentIndex] = allProducts[i];
                currentIndex++;
            }
        }
        
        return createdProducts;
    }

    function getVendorPurchasedProducts(address _vendor) public view returns (uint256[] memory) {
        uint256[] memory allProducts = vendorProducts[_vendor];
        uint256 purchasedCount = 0;
        
        // First count purchased products
        for (uint256 i = 0; i < allProducts.length; i++) {
            if (!products[allProducts[i]].isCreated) {
                purchasedCount++;
            }
        }
        
        // Then fill array with purchased products
        uint256[] memory purchasedProducts = new uint256[](purchasedCount);
        uint256 currentIndex = 0;
        
        for (uint256 i = 0; i < allProducts.length; i++) {
            if (!products[allProducts[i]].isCreated) {
                purchasedProducts[currentIndex] = allProducts[i];
                currentIndex++;
            }
        }
        
        return purchasedProducts;
    }

    function getProduct(uint256 _productId) public view returns (
        string memory name,
        string memory category,
        string memory description,
        uint256 price,
        uint256 quantity,
        uint256 barcodeNo,
        uint256[] memory rawMaterials,
        uint256 greenScore,
        address currentVendor,
        string memory currentVendorOrg,
        string memory currentVendorLocation
    ) {
        Product storage product = products[_productId];
        VendorInfo storage vendor = vendorDetails[product.currentVendor];
        return (
            product.name,
            product.category,
            product.description,
            product.price,
            product.quantity,
            product.barcodeNo,
            product.rawMaterials,
            product.greenScore,
            product.currentVendor,
            vendor.organization,
            vendor.location
        );
    }

    function calculateGreenScore(uint256[] memory _rawMaterials) private view returns (uint256) {
        uint256 score = 100;
        
        for(uint256 i = 0; i < _rawMaterials.length; i++) {
            if(products[_rawMaterials[i]].isActive) {
                score += products[_rawMaterials[i]].greenScore;
            }
        }
        
        if(_rawMaterials.length > 0) {
            score = score / (_rawMaterials.length + 1);
        }
        
        uint256 vendorScore = vendorReputationScores[msg.sender];
        if(vendorScore > 0) {
            score = (score + vendorScore) / 2;
        }
        
        return score;
    }   

    modifier onlyVendor(uint256 _productId) {
        require(products[_productId].currentVendor == msg.sender, "Only current vendor can modify this product");
        _;
    }

    function updateProductQuantity(uint256 _productId, uint256 _newQuantity) public onlyVendor(_productId) {
        require(_newQuantity >= 0, "Quantity cannot be negative");
        products[_productId].quantity = _newQuantity;
        emit InventoryUpdated(_productId, _newQuantity);
    }

    function getVendorProducts(address _vendor) public view returns (uint256[] memory) {
        return vendorProducts[_vendor];
    }
     function getProductJourney(uint256 _productId) public view returns (
        uint256 productId,
        JourneyStep[] memory steps
    ) {
        ProductJourney storage journey = productJourneys[_productId];
        return (
            journey.productId,
            journey.steps
        );
    }

}