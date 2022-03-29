export interface Image {
    path: string
}

export interface News {
    title: string,
    text: string,
    image: Image,
    modified: Date
}

export interface ClubHistory {
    text: string
}

export interface Vorstandsmitglied {
    name: string,
    funktion: string,
    email: string,
    phone: string,
    image: Image
}

export interface Kontakt {
    addresse: string,
    plz: string,
    ort: string,
    email: string,
    phone: string
}

export interface Mannschaft {
    name: string,
    image: Image
}