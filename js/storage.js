const STORAGE_TOKEN = TOKEN;
const STORAGE_URL = BACKEND_URL;

let users = [];

let todos = [{
    'id': 0,
    'title': 'Putzen',
    'description': 'Alles was das Herz begehrt',
    'category': 'Design',
    'status': 'todo',
    'priority': 'low',
    'assignedTo': ['Anna Schmidt', 'Emilia Koch'],
    'subtasks': [
        {
            'title': 'teste das mal',
            'status': false
        }
    ]
}, {
    'id': 1,
    'title': 'Kochen',
    'description': 'Alles was das Herz begehrt',
    'category': 'Sales',
    'status': 'todo',
    'priority': 'high',
    'dueDate': '2023-08-28',
    'assignedTo': ['Anna Schmidt', 'Emilia Koch'],
    'subtasks': [
        {
            'title': 'teste das mal',
            'status': false
        }
    ]
}, {
    'id': 2,
    'title': 'Waschen',
    'description': 'Alles was das Herz begehrt',
    'category': 'Tech',
    'status': 'todo',
    'priority': 'medium',
    'assignedTo': ['Anna Schmidt', 'Emilia Koch'],
    'subtasks': [
        {
            'title': 'teste das mal',
            'status': false
        }
    ]
}, {
    'id': 3,
    'title': 'Saugen',
    'description': 'Alles was das Herz begehrt',
    'category': 'Tech',
    'status': 'feedback',
    'priority': 'low',
    'dueDate': '2023-10-28',
    'assignedTo': ['Anna Schmidt', 'Emilia Koch'],
    'subtasks': [
        {
            'title': 'teste das mal',
            'status': false
        }
    ]
}, {
    'id': 4,
    'title': 'Schlafen',
    'description': 'Alles was das Herz begehrt',
    'category': 'Sales',
    'status': 'todo',
    'priority': 'medium',
    'assignedTo': ['Anna Schmidt', 'Emilia Koch'],
    'subtasks': [
        {
            'title': 'teste das mal',
            'status': false
        }
    ]
}, {
    'id': 5,
    'title': 'Einkaufen',
    'description': 'Alles was das Herz begehrt',
    'category': 'Backoffice',
    'status': 'feedback',
    'priority': 'low',
    'assignedTo': ['Anna Schmidt', 'Emilia Koch'],
    'subtasks': [
        {
            'title': 'teste das mal',
            'status': false
        }
    ]
}, {
    'id': 6,
    'title': 'Tanzen',
    'description': 'Alles was das Herz begehrt',
    'category': 'Tech',
    'status': 'done',
    'priority': 'high',
    'assignedTo': ['Anna Schmidt', 'Emilia Koch'],
    'subtasks': [
        {
            'title': 'teste das mal',
            'status': false
        }
    ]
}
];


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