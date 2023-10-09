let selectedPriority = '';
let selectedCategory = '';
let selectedContacts = [];
let subtasks = [];
let subtaskIdCounter = 0;


let contacts = [
    {
        bgcolor: '#00BEE8',
        id: 0,
        name: 'Anna',
        surname: 'Schmidt',
        email: 'anna.schmidt@example.com',
        telefon: '1234567890',
        password: '1234'
    },
    {
        bgcolor: '#00BEE8',
        id: 1,
        name: 'Max',
        surname: 'Müller',
        email: 'max.mueller@example.com',
        telefon: '234567890',
        password: '1234'
    },
    {
        bgcolor: '#1FD7C1',
        id: 2,
        name: 'Sophie',
        surname: 'Wagner',
        email: 'sophie.wagner@example.com',
        telefon: '3456789012',
        password: '1234'
    },
    {
        bgcolor: '#6E52FF',
        id: 3,
        name: 'Paul',
        surname: 'Becker',
        email: 'paul.becker@example.com',
        telefon: '456789012',
        password: '1234'
    },
    {
        bgcolor: '#9327FF',
        id: 4,
        name: 'Laura',
        surname: 'Hoffmann',
        email: 'laura.hoffmann@example.com',
        telefon: '567890123',
        password: '1234'
    },
    {
        bgcolor: '#C3FF2B',
        id: 5,
        name: 'Felix',
        surname: 'Schulz',
        email: 'felix.schulz@example.com',
        telefon: '6789012345',
        password: '1234'
    },
    {
        bgcolor: '#FFA35E',
        id: 6,
        name: 'Emilia',
        surname: 'Koch',
        email: 'emilia.koch@example.com',
        telefon: '7890123456',
        password: '1234'
    }
];


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
    {
        categoryName: "User Story",
        categoryColor: "#FF7A00"
    },
    {
        categoryName: "Technical Task",
        categoryColor: "#0038FF"
    },
];