window.addEventListener("load", function() {

    //set backgorund colors for events of text and textarea inputs
    let focusBackgroundColor = "palegoldenrod";
    let blurBackgroundColor = "white";
    let invalidInputIndicatorColor = "palevioletred";
    let submitButtonPressedBackgroundColor = "grey";

    //assign elements that need event listeners to javascript variables
    let inputList = document.getElementsByTagName("input");
    let textarea = document.getElementById("message");
    let submitButton = document.getElementById("submit-button");
    let honorific = document.getElementById("honorific");
    let name = document.getElementById("name");
    let company = document.getElementById("company");
    let email = document.getElementById("email");
    let telephone = document.getElementById("telephone_number");
    let message = document.getElementById("message")

    let honorificRegExp = new RegExp('^[a-z]{0,10}[\.]?$', 'i');
    let nameRegExp = new RegExp("^[a-z]?([a-z]| |'){0,127}$", "i");
    let companyRegExp = new RegExp("^([a-z]|[0-9])?([a-z]|[0-9]| |\'|\-|\_){0,127}$", "i");
    
    let emailPrefixRegExp = new RegExp("^(([a-z]|[0-9])+(|\-|\_|\.))+([a-z]|[0-9])", "i");
    let emailDomainRegExp = new RegExp("^(([a-z]|[0-9])+((\-)?([a-z]|[0-9])+)+)+$", "i");

    let telephoneRegExp = new RegExp(/^([0-9]{0,3}(\-| ){0,1})?((\([0-9]{3}\)|[0-9]{3}))((\-| )?[0-9]{3})((\-| )?[0-9]{4})$/);

    //grab default backgorund color submit input
    let submitButtonOriginalBackgroundColor = submitButton.style.backgroundColor;

    //loop through and add event listeners to text inputs
    for(let i = 0; i < inputList.length - 1; i ++) {
        inputList[i].addEventListener("focus", function() {changeBackgroundColor(inputList[i], focusBackgroundColor)});
        inputList[i].addEventListener("blur", function() {changeBackgroundColor(inputList[i], blurBackgroundColor)});
    }

    //add event listeners to textarea input
    textarea.addEventListener("focus", function() {changeBackgroundColor(textarea, focusBackgroundColor)});
    textarea.addEventListener("blur", function() {changeBackgroundColor(textarea, blurBackgroundColor)});

    //add event listeners to submit input
    submitButton.addEventListener("focus", function() {changeBackgroundColor(submitButton, submitButtonPressedBackgroundColor)})
    submitButton.addEventListener("blur", function() {changeBackgroundColor(submitButton, submitButtonOriginalBackgroundColor)});


    //add event listener for creating feedback on valid input
    honorific.addEventListener("blur", function() {
        let isHonorificValid = honorificRegExp.test(honorific.value);
        isInputValid(honorific, isHonorificValid);
    });

     //add event listener for creating feedback on valid input
    name.addEventListener("blur", function() {
        let isNameValid = nameRegExp.test(name.value);
        isInputValid(name, isNameValid);
        
    });

     //add event listener for creating feedback on valid input
    company.addEventListener("blur", function() {
        let isCompanyValid = companyRegExp.test(company.value);
        isInputValid(company, isCompanyValid);
    });

     //add event listener for creating feedback on valid input
    email.addEventListener("blur", function (){
        let isEmailValid = true;
        let call = function () {
            isEmailValid = false;
            isInputValid(email, isEmailValid);
        }

        let validCall = function() {
            isInputValid(email, isEmailValid);
        }

        if(email.value === "") {
            validCall();
            return;
        }

        let emailPrefixAndDomain = email.value.split(/@/);
        if(emailPrefixAndDomain.length != 2){
            call();
            return;
        }

        if(!emailPrefixRegExp.test(emailPrefixAndDomain[0])) {
            call();
            return;
        }

        if(emailPrefixAndDomain[1].length < 3 | emailPrefixAndDomain[1].length > 255) {
            call();
            return;
        }

        let emailDomains = emailPrefixAndDomain[1].split(/\./);
        let maxIterations = emailDomains.length;
        
        if(emailDomains.length < 2) {
            call();
            return;
        }

        for(index = 0; index < maxIterations; index++) {
            if(!emailDomainRegExp.test(emailDomains[index])) {
                call()
                break;
            }
        }

        isInputValid(email, isEmailValid);

    });

    telephone.addEventListener("blur", function() {
        let isPhoneValid = telephoneRegExp.test(telephone.value);
        if(!isPhoneValid && telephone.value !== "") {
            isInputValid(telephone, isPhoneValid);
        }
    })
    
    submitButton.addEventListener("onClick", function(event) {
        event.preventDefault();
    })

    //changes background color to specified color for the specified element
    function changeBackgroundColor(element, color) {
      element.style = "background-color: " + color;
     }

     function isInputValid(element, input) {
        if(!input) {
            changeBackgroundColor(element, invalidInputIndicatorColor);
        } else {
            changeBackgroundColor(element, blurBackgroundColor);
        }
     }

     
 
});