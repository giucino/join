const STORAGE_TOKEN = 'LGDOVY1L7ICOV660H27VIF5G9HUMBEBVL9LD86JP';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';

/**
 * Sets an item using a key-value pair in the storage.
 * @param {string} key - The key for the item.
 * @param {*} value - The value to be stored.
 * @returns {Promise<Object>} - A Promise containing the JSON response object.
 */
async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload) })
        .then(res => res.json());
}


/**
 * Gets the value linked to the given key from storage.
 * @param {string} key - The key used for searching..
 * @returns {Promise<any>} - A Promise that resolves to the retrieved value.
 * @throws {string} - If data with the given key is not found.
 */
async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json()).then(res => {
        if (res.data) { 
            return res.data.value;
        } throw `Could not find data with key "${key}".`;
    });
}