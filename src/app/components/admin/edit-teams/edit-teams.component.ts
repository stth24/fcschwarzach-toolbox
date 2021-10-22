import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';
import { Team } from 'src/app/model/team.model';



@Component({
    selector: 'app-edit-teams',
    templateUrl: './edit-teams.component.html',
    styleUrls: ['./edit-teams.component.scss']
})
export class EditTeamsComponent implements OnInit {

    teams: Team[] = [];

    uneditedTeamData: Team[] = [];

    showAddTeam = false;
    newTeamName = '';
    newTeamUrl = '';

    showModal = false;
    modalMessage = '';
    onModalClose: (result: boolean) => void = (res) => { }

    constructor(private apiService: ApiService) { }

    ngOnInit(): void {
        this.fetchTeamsFromDB();
    }

    fetchTeamsFromDB() {
        this.apiService.getTeams()
            .then(data => {
                this.teams = data;

                this.uneditedTeamData = this.teams.map(t => Object.assign({}, t));
            })
            .catch(error => alert(error))
    }

    toggleShowAddTeam() {
        this.showAddTeam = !this.showAddTeam;

        this.newTeamName = '';
        this.newTeamUrl = '';
    }

    addTeam() {
        this.apiService.insertTeam(this.newTeamName, this.newTeamUrl)
            .then(team => {
                alert('Hinzufügen erfolgreich!');

                this.teams.push(team);
                this.uneditedTeamData.push(Object.assign({}, team));
            })

        this.toggleShowAddTeam();
    }

    checkTeamChanged(team: Team) {
        return JSON.stringify(team) === JSON.stringify(this.uneditedTeamData[this.teams.indexOf(team)]);
    }

    saveTeamChanges(team: Team) {
        this.apiService.updateTeam(team)
            .then(() => {
                alert('Speichern erfolgreich!');
                this.uneditedTeamData[this.teams.indexOf(team)] = Object.assign({}, team);
            })
    }

    deleteTeam(team: Team) {
        this.openModal(
            `Sind Sie sicher, dass Sie ${team.name} löschen wollen?`,
            (result: boolean) => {
                if (result) {
                    this.apiService.deleteTeam(team.id)
                        .then(() => {
                            alert('Löschen erfolgreich!');

                            const index = this.teams.indexOf(team);
                            if (index > -1) {
                                this.teams.splice(index, 1);
                                this.uneditedTeamData.splice(index, 1);
                            }
                        })
                }
            })
    }

    openModal(message: string, onClose: (result: boolean) => void) {
        this.modalMessage = message;
        this.onModalClose = onClose;

        this.showModal = true;
    }

    closeModal(result: boolean) {
        this.onModalClose(result);

        this.showModal = false;
    }

}
