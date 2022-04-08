var app=angular.module('myApp',[]);

app.controller('creditValidatorCtrl',['$scope',function($scope){
    $scope.imageName='';
    $scope.cardNumber='';
    $scope.isValid = true;
    $scope.validate = function(n){
        let dWithoutSpace = n.replace(/ /g, "");
        let digits = dWithoutSpace.toString().split('').map(Number);
        let start1 = n[0];
        let start2 = n[0]+''+n[1];
        let start4 = n[0]+''+n[1]+''+n[2]+''+n[3];
        if(start1 == '4'){
            $scope.imageName='visa2';
            $scope.cardType = '';
            if((digits.length == 13 || digits.length == 16) && $scope.cardNoValidate(n)){
                $scope.isValid = true;
                $scope.textColor='green';
                $scope.cardType = "VISA (valid)";
            }else if(digits.length >= 13){
                $scope.isValid = true;
                $scope.textColor='red';
                $scope.cardType = "VISA (invalid)";
            }
        }
        else if(start2 == '34' || start2 == '37'){
            $scope.imageName='amex2';
            $scope.cardType = '';
            if(digits.length == 15 && $scope.cardNoValidate(n)){
                $scope.isValid = true;
                $scope.textColor='green';
                $scope.cardType = "AMEX (valid)";
            }else if(digits.length >= 15){
                $scope.isValid = true;
                $scope.textColor='red';
                $scope.cardType = "AMEX (invalid)";
            }
        }
        else if(start2 == '50' || start2 == '51' || start2 == '52' ||
            start2 == '53' || start2 == '54' || start2 == '55'){
            $scope.imageName='mastercard2';
            $scope.cardType = '';
            if(digits.length == 16 && $scope.cardNoValidate(n)){
                $scope.isValid = true;
                $scope.textColor='green';
                $scope.cardType = "MasterCard (valid)";
            }else if(digits.length >= 16){
                $scope.isValid = true;
                $scope.textColor='red';
                $scope.cardType = "MasterCard (invalid)";
            }
        }
        else if(start4 == '6011'){
            $scope.imageName='discover2';
            $scope.cardType = '';
            if(digits.length == 16 && $scope.cardNoValidate(n)){
                $scope.isValid = true;
                $scope.textColor='green';
                $scope.cardType = "Discover (valid)";
            }else if(digits.length >= 16){
                $scope.isValid = true;
                $scope.textColor='red';
                $scope.cardType = "Discover (invalid)";
            }
        }
        else{
            if(start1 == '4' || start2 == '34' || start2 == '37' || 
            start2 == '50' || start2 == '51' || start2 == '52' ||
            start2 == '53' || start2 == '54' || start2 == '55' ||
            start4 == '6011'){
                $scope.cardType = '';
            }
            if(digits.length == 0){
                $scope.imageName='';
                $scope.isValid = false;
            }
            else{
                $scope.textColor='red';
                $scope.imageName='';
                $scope.isValid = true;
                $scope.cardType = "Unknown (invalid)";
            }
        }

        $scope.formatCreditCard();
    }

    $scope.cardNoValidate=function(n){
        let dWithoutSpace = n.replace(/ /g, "");
        let digits = dWithoutSpace.toString().split('').map(Number);
        if(digits.length % 2 === 0){
            digits = digits.map((digit, idx) => idx % 2 === 0 ? digit * 2 : digit);
        } else {
            digits = digits.map((digit, idx) => idx % 2 === 1 ? digit *2 : digit);
        }
        digits = digits.map(digit => digit > 9 ? digit -9 : digit);
        const sum = digits.reduce((acc, digit) => acc+= digit, 0);
        return sum % 10 === 0;
    }
    
    $scope.formatCreditCard=function(){
        var ccNumString=document.getElementById('credit-card').value;
        ccNumString=ccNumString.replace(/[^0-9]/g, '');
        
        var block1='';
        var block2='';
        var block3='';
        var block4='';
        var formatted='';
            
        block1 = ccNumString.substring(0, 4);
        if (block1.length==4) {
            block1=block1 + ' ';
        }

        block2 = ccNumString.substring(4, 8);
        if (block2.length==4) {
            block2=block2 + ' ';
        }

        block3 = ccNumString.substring(8, 12);
        if (block3.length==4) {
            block3=block3 + ' ';
        }
        
        block4 = ccNumString.substring(12, 16);

        formatted=block1 + block2 + block3 + block4;
        $scope.cardNumber=formatted;
    }
}]);
