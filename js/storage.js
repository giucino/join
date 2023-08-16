const STORAGE_TOKEN = 'LGDOVY1L7ICOV660H27VIF5G9HUMBEBVL9LD86JP';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';

/**
 * 
 * @param {*} key 
 * @param {*} value 
 * @returns 
 */
async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload) })
        .then(res => res.json());
}

async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json()).then(res => {
        if (res.data) { 
            return res.data.value;
        } throw `Could not find data with key "${key}".`;
    });
}

