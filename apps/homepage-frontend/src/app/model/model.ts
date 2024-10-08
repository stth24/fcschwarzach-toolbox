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
    modified: Date,
    active: boolean
}

export interface ClubHistory {
    text: string
}

export interface Vorstandsmitglied {
    name: string,
    funktion: string,
    email: string | null,
    phone: string | null,
    image: Asset,
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
    trainer?: CollectionLink[],
    info?: string
}

export interface Spieler {
    id: string,
    name: string,
    image: Asset
}

export type Trainer = Vorstandsmitglied;

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

export interface SocialMediaLinks {
    instagram: string,
    facebook: string,
    github: string,
    youtube: string
}

export interface NewsletterInfo {
    link: string,
    text: string
}