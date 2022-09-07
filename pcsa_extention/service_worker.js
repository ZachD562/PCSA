if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('background.js');
    });
}
console.log('starting background')

var transferData = ''


chrome.runtime.onMessage.addListener(GotMessage)


function sendMessage(response) {
    let message = transferData
    chrome.runtime.sendMessage({passData: message}, (response) => {
        console.log(response)
    })
}

function GotMessage(message, sender, sendResponse) {
    if(message.request == 'getPassword') {
        sendResponse(transferData)
    } else {
        console.log('Data: ' + message.data + ' from content script')
        transferData = message.data
        sendResponse('service_worker received message')
    }

}


