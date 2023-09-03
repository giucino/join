const STORAGE_TOKEN = TOKEN;
const STORAGE_URL = BACKEND_URL;

let users = [];

let todos = [
    {
        'id': 0,
        'title': 'Website planen',
        'description': 'Planung der neuen Unternehmenswebsite',
        'category': 'Webdesign',
        'status': 'todo',
        'priority': 'low',
        'dueDate': '2023-08-28',
        'assignedTo': ['Anna Schmidt', 'Emilia Koch'],
        'bgcolor': ['#C888B0', '#0206C3'],
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
        'category': 'Marketing',
        'status': 'todo',
        'priority': 'high',
        'dueDate': '2023-08-28',
        'assignedTo': ['Max Müller', 'Sophie Wagner'],
        'bgcolor': ['#133465', '#F68997'],
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
        'category': 'Tech',
        'status': 'todo',
        'priority': 'medium',
        'dueDate': '2023-08-28',
        'assignedTo': ['Felix Schulz', 'Laura Hoffmann'],
        'bgcolor': ['#51C3C9', '#037E49'],
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
    },
    {
        'id': 3,
        'title': 'Neue Werbekampagne',
        'description': 'Start einer neuen Werbekampagne',
        'category': 'Tech',
        'status': 'feedback',
        'priority': 'low',
        'dueDate': '2023-10-28',
        'assignedTo': ['Sophie Wagner', 'Paul Becker'],
        'bgcolor': ['#F68997', '#8595D2'],
        'subtasks': [
            {
                'title': 'Werbematerial erstellen',
                'status': false
            },
            {
                'title': 'Werbekanäle auswählen',
                'status': false
            }
        ]
    },
    {
        'id': 4,
        'title': 'Präsentation vorbereiten',
        'description': 'Vorbereitung für die Präsentation',
        'category': 'Sales',
        'status': 'todo',
        'priority': 'medium',
        'dueDate': '2023-08-28',
        'assignedTo': ['Emilia Koch', 'Max Müller'],
        'bgcolor': ['#0206C3', '#133465'],
        'subtasks': [
            {
                'title': 'Präsentationsmaterial erstellen',
                'status': false
            }
        ]
    },
    {
        'id': 5,
        'title': 'Einkaufsliste erstellen',
        'description': 'Erstellung einer Liste für den nächsten Einkauf',
        'category': 'Backoffice',
        'status': 'feedback',
        'priority': 'low',
        'dueDate': '2023-08-28',
        'assignedTo': ['Anna Schmidt', 'Max Müller'],
        'bgcolor': ['#C888B0', '#133465'],
        'subtasks': [
            {
                'title': 'Einkaufsliste erstellen',
                'status': false
            },
            {
                'title': 'Einkäufe erledigen',
                'status': false
            }
        ]
    },
    {
        'id': 6,
        'title': 'Urlaubsplanung',
        'description': 'Planung des nächsten Urlaubs für Mitarbeiter',
        'category': 'Tech',
        'status': 'done',
        'priority': 'high',
        'dueDate': '2023-08-28',
        'assignedTo': ['Anna Schmidt', 'Emilia Koch'],
        'bgcolor': ['#8595D2', '#0206C3'],
        'subtasks': [
            {
                'title': 'Reiseziele auswählen',
                'status': false
            },
            {
                'title': 'Buchungen vornehmen',
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