export interface NavigationEntry {
    id: string,
    label: string,
    tag: any
}

export const navigationEntries = {
    Generalplan: {
        id: 'generalplan',
        label: 'Generalplan',
        tag: 'app-generalplan'
    },
    NewPlayerForm: {
        id: 'newplayerform',
        label: 'Spieleranmeldung',
        tag: 'app-newplayer-form'
    }
}

export const adminNavigationEntries = {
    TeamsData: {
        id: 'teamsdata',
        label: 'Team Daten',
        tag: 'app-teams-data'
    }
}

export const navigationEntriesList = [navigationEntries.Generalplan, navigationEntries.NewPlayerForm];
export const adminNavigationEntriesList = [adminNavigationEntries.TeamsData];