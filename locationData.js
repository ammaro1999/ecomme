const WILAYAS = [
    { id: 1, name: "Adrar" },
    { id: 2, name: "Chlef" },
    { id: 3, name: "Laghouat" },
    { id: 4, name: "Oum El Bouaghi" },
    { id: 5, name: "Batna" },
    { id: 6, name: "Béjaïa" },
    { id: 7, name: "Biskra" },
    { id: 8, name: "Béchar" },
    { id: 16, name: "Alger" },
    // Add all 58 wilayas...
];

const COMMUNES = {
    16: [ // Alger communes
        "Alger-Centre",
        "Bab El Oued",
        "Bologhine",
        "Casbah",
        "Hussein Dey",
        // Add more communes...
    ],
    6: [ // Béjaïa communes
        "Béjaïa",
        "Akbou",
        "Souk El Ténine",
        "Tazmalt",
        // Add more communes...
    ],
    // Add communes for other wilayas...
};

const STOP_DESKS = {
    16: [ // Alger stop desks
        {
            id: "ALG1",
            name: "Alger Centre Bureau",
            address: "123 Rue Didouche Mourad",
            hours: "8:00 - 17:00"
        },
        {
            id: "ALG2",
            name: "Bab Ezzouar Stop",
            address: "45 Boulevard Principal",
            hours: "9:00 - 18:00"
        },
        // Add more stop desks...
    ],
    // Add stop desks for other wilayas...
};
