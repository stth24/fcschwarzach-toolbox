export interface Image {
    path: string
}

export interface News {
    id: string,
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
    image: Image,
    prio: string
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

export interface Sponsor {
    name: string,
    url: string,
    image: Image
}

export interface NWInfo {
    text: string,
    name: string,
    image: Image,
    email: string
}