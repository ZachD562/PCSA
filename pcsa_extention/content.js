console.log('starting foreground')


let passInput = document.querySelector('input[type=password]')

let isPassword = false
let passData = ''

function sendMessage(response) {
    let message = passData
    chrome.runtime.sendMessage({data: message}, (response) => {
        console.log(response)
    })
    console.log('message sent')
}



function passGen(password) {

    let updatedPass = password
    let passW = password

    let tmpSpecNum = 0
    let tmpUpperNum = 0
    let tmpLowerNum = 0
    let tmpNumsNum = 0


    for(let i=0; i<updatedPass.length; i++) {

        currentChar = updatedPass[i]

        //Checking for 3 or more consecutive lowercase charaters 
        // =>
        // Replace fourth with upper case 
        if(/[a-z]/.exec(currentChar)) {
            if(tmpLowerNum >= 3) {
                randNum = Math.floor(Math.random()*2)
                index = i - randNum
                char = updatedPass[index].toString()
                charUpper = char.toUpperCase()
                updatedPass = updatedPass.replace(char, charUpper)
                tmpLowerNum = 0
            } else {
                tmpLowerNum += 1    
            }
        }

        //Checking for 3 or more consecutive upper case charaters
        // =>
        //Replace fourth with lower case
        if(/[A-Z]/.exec(currentChar)) {
            if(tmpUpperNum >= 3) {
                randNum = Math.floor(Math.random()*2)
                index = i - randNum
                char = updatedPass[index].toString()
                charLower = char.toLowerCase()
                updatedPass = updatedPass.replace(char, charLower)
                tmpUpperNum = 0
            } else {
                tmpUpperNum += 1    
            }
        }

        //Checking for a charter followed by numbers in the password 
        // =>
        //Add an '-' charater between the charater and first instance of number
        if(/[0-9]/.exec(currentChar)) {
            char = updatedPass[i-1]
            if(/^[a-zA-Z]+$/.test(char)) {
                let passArray = updatedPass.split('')
                let passFirstHalf = passArray.splice(i)
                let passSecondHalf = passArray.splice(0, i)
                let passHalfs = [passSecondHalf.join(''), passFirstHalf.join('')]
                updatedPass = passHalfs.join('-') 
            }
            
        }

        //Check for a special charater in the password
        // => 
        //Duplicate the special charater if only one is present
        if(/[!"£\$%\^=&\*\(\)_\+\{\}\[\];:'@#~,<\.>/\?\\\|`¬`]+/.exec(currentChar)) {
            if((updatedPass.match(/[!"£\$%\^=&\*\(\)_\+\{\}\[\];:'@#~,<\.>/\?\\\|`¬`]/g) || []).length == 1) {
                let passArray = updatedPass.split('')
                let passFirstHalf = passArray.splice(i)
                let passSecondHalf = passArray.splice(0, i)
                let passHalfs = [passSecondHalf.join(''), passFirstHalf.join('')]
                updatedPass = passHalfs.join(currentChar) 
            }
        }
    }
    console.log(password)
    console.log(updatedPass)

    return updatedPass
}


function passCheck(passwd)  {
    let length = false
    let upper = false
    let lower = false
    let num = false
    let spl = false
    //check password length
    if (!length) {
        if(passwd.length < 8) {
            console.log('0 length')
        } else {
            if(!length) {
                length = true
                console.log('1 length')
            } 
        }
    }
    //check for lower character 
    if (!upper) {
        let n = /[A-Z]/.exec(passwd)
        if(!n) {
            console.log('0 upper')
        } else {
            if(!upper) {
                upper = true
                console.log('1 upper')
            } 
        }
    }
    //check for uppercase character 
    if (!lower) {
        let n = /[a-z]/.exec(passwd)
        if(!n) {
            console.log('0 lower')
        } else {
            if(!lower) {
                lower = true
                console.log('1 lower')
            } 
        }
    }
    //check for number
    if (!num) {
        let n = /[0-9]/.exec(passwd)
        if(!n) {
            console.log('0 number')
        } else {
            if(!num) {
                num = true
                console.log('1 number')
            } 
        }
    }
    //check for special character 
    if (!spl) {
        let n = /[!"£\$%\^=&\*\(\)_\+\{\}\[\];:'@#~,<\.>/\?\\\|`¬`]+/.exec(passwd)
        if(!n) {
            console.log('0 special')
        } else {
            if(!spl) {
                spl = true
                console.log('1 special')
            }
        }
    }
    if(upper && lower && num && length && spl) {
        isPassword = true
        passData = passGen(passwd)
    } else {
        isPassword = false
    }
    return isPassword
};

$(function () {
    $(passInput).on('keyup', function () {
        const val = passInput.value
        val.trim();
        console.clear()
        passCheck(passInput.value);
        console.log(isPassword) 
        if(!isPassword) {
            passData = ''
        }
        sendMessage()
        
    });
});

