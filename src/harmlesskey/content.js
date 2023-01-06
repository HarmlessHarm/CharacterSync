/**
 * Initialize message listeners
 * Supported messages:
 * "sync" - syncCharacter
 */ 

chrome.runtime.onMessage.addListener((request, response, sendRequest) => {
	console.log('message received')
	if (request.sync) {
		syncCharacter();
	}
})

const syncCharacter = () => {
	character.updateCharacter();
	storeCharacter(character);
}

const documentChanged = async (mutations) => {
	if (window.location.href !== URL) {
		observer.disconnect();
		console.log("Disconnected")
		return
	}
	// Only sync automatically if the character is in storage
	const characters = await getCharacters();
	if(characters?.[window.location.href]) {
		syncCharacter();
	}
}

const URL = window.location.href;

const character = new HkCharacter();

const observer = new MutationObserver(documentChanged);
observer.observe(document, { childList: true, subtree: true });
