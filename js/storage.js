const STORAGE_TOKEN = TOKEN;
const STORAGE_URL = BACKEND_URL;

let users = [];

let todos = [
    {
        'id': 0,
        'title': 'Website planen',
        'description': 'Planung der neuen Unternehmenswebsite',
        'category': 'User Story',
        'status': 'todo',
        'priority': 'low',
        'dueDate': '2023-08-28',
        'assignedTo': ['Anna Schmidt', 'Emilia Koch'],
        'bgcolor': ['#00BEE8', '#FFA35E'],
        'subtasks': [
            {
                'title': 'Design-Ressourcen sammeln',
                'status': false
            },
            {
                'title': 'Inhalte erstellen',
                'status': false
            },
            {
                'title': 'Entwicklung starten',
                'status': false
            }
        ]
    },
    {
        'id': 1,
        'title': 'Entwicklung starten',
        'description': 'Beginn der Entwicklung neuer Produkte',
        'category': 'User Story',
        'status': 'todo',
        'priority': 'high',
        'dueDate': '2023-08-28',
        'assignedTo': ['Max Müller', 'Sophie Wagner'],
        'bgcolor': ['#00BEE8', '#1FD7C1'],
        'subtasks': [
            {
                'title': 'Marktforschung durchführen',
                'status': false
            },
            {
                'title': 'Produktideen generieren',
                'status': false
            },
            {
                'title': 'Prototyp entwickeln',
                'status': false
            }
        ]
    },
    {
        'id': 2,
        'title': 'Support verbessern',
        'description': 'Verbesserung des Kundensupports',
        'category': 'Technical Task',
        'status': 'todo',
        'priority': 'medium',
        'dueDate': '2023-08-28',
        'assignedTo': ['Felix Schulz', 'Laura Hoffmann'],
        'bgcolor': ['#C3FF2B', '#9327FF'],
        'subtasks': [
            {
                'title': 'Kundensupport-Hotline einrichten',
                'status': false
            },
            {
                'title': 'FAQ aktualisieren',
                'status': false
            }
        ]
    }
];

let categories = [
    {   categoryName: "User Story",
        categoryColor: "#FF7A00"     
    },
    {   categoryName: "Technical Task",
        categoryColor: "#0038FF"     
    },
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