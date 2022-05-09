export interface Asset {
    path: string
}

export interface CollectionLink {
    _id: string,
    link: string,
    display: string
}

export interface News {
    id: string,
    title: string,
    text: string,
    image: Asset,
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
    image: Asset,
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
    id: string,
    name: string,
    image: Asset,
    spieler: CollectionLink[],
    trainer?: CollectionLink
}

export interface Spieler {
    id: string,
    name: string,
    image: Asset
}

export interface Trainer {
    id: string,
    name: string,
    image: Asset,
    phone: string,
    email: string
}

export interface Sponsor {
    name: string,
    url: string,
    image: Asset
}

export interface NWInfo {
    text: string,
    name: string,
    image: Asset,
    email: string
}

export interface DocumentInfo {
    statuten: string,
    impressum: string
}