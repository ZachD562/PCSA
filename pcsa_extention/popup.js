console.log('popup.js running')



$(function() {
	let button = document.getElementById('btn')
	console.log('in function')
	$(button).on('click', function() {
		let passwordFieldData = document.getElementById('phtext')
		navigator.clipboard.writeText(passwordFieldData.innerText)
	})
});

function changeDivs (isData) {
	let passwordFieldDiv = document.getElementById('contentDiv')
	let criteriaDiv = document.getElementById('criteriaDiv')
	if(isData) {
		criteriaDiv.style.display = 'none'
		passwordFieldDiv.style.display = 'block'
	} else if(!isData) {		
		criteriaDiv.style.display = 'block'
		passwordFieldDiv.style.display = 'none'
	}
}


async function run() {
	let isData = false
	while(true) {
		chrome.runtime.sendMessage({request: 'getPassword'}, (response) => {
			if(response) {
				isData = true
				changeDivs(isData)
				console.log('got: ' + response + ' from service_worker.js')
				let passwordFieldData = document.getElementById('phtext')
				passwordFieldData.innerText = response
			} else {
				isData = false
				changeDivs(isData)
				console.log('No data')
			}
		})
		await new Promise(resolve => setTimeout(resolve, 250))
	}	
}

run()
