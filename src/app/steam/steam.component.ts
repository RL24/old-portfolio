import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import {
  GetPlayerSummaries,
  GetOwnedGames,
  SteamUser,
  SteamGame
} from '../utility/steam.util';

import { Subscribed } from '../utility/subscribed.utility';

enum ApiRequests {
  GET_PLAYER_SUMMARIES
}

@Component({
  selector: 'app-steam',
  templateUrl: './steam.component.html',
  styleUrls: ['./steam.component.scss']
})
export class SteamComponent extends Subscribed implements OnInit, OnDestroy {

  public users: SteamUser[] = [];
  public games: SteamGame[] = [];

  public searchForm = new FormGroup({
    search: new FormControl('')
  });

  public loadingSearchUser: boolean;
  public searchUser: SteamUser;
  public userCount: number;
  public loadingResults: boolean;
  public results: { user: SteamUser, games: SteamGame[] }[] = [];

  private apiRequests: { [key: string]: Subscription } = {};

  constructor(private http: HttpClient, private titleService: Title) {
    super();
  }

  public ngOnInit(): void {
    this.titleService.setTitle('Steam Library Lookup');

    this.subscribe(this.searchForm.get('search').valueChanges.pipe(debounceTime(1000)).subscribe((value) => {
      this.updateUserSearch(value.trim());
    }));
  }

  public ngOnDestroy(): void {
    this.unsubscribeAll();
  }

  private updateUserSearch(search: string): void {
    if (search.length > 0) {
      this.loadingSearchUser = true;
      if (this.apiRequests[ApiRequests.GET_PLAYER_SUMMARIES] != null)
        this.unsubscribe(this.apiRequests[ApiRequests.GET_PLAYER_SUMMARIES]);
      this.subscribe(this.apiRequests[ApiRequests.GET_PLAYER_SUMMARIES] = this.http.get(`/api/steam/getPlayerSummaries/${search}`).subscribe((getPlayerSummaries: GetPlayerSummaries) => {
        this.loadingSearchUser = false;
        if (getPlayerSummaries && getPlayerSummaries.response && getPlayerSummaries.response.players && getPlayerSummaries.response.players.length > 0) {
          this.searchUser = getPlayerSummaries.response.players[0];
        } else {
          this.searchUser = null;
        }
      }));
    }
  }

  private removeDuplicatesByKey(arr: any[], str: string): any[] {
    const narr: any[] = [];
    arr.forEach((val) => {
      for (let i = 0; i < narr.length; i++)
        if (narr[i][str] === val[str])
          return;
      narr.push(val);
    });
    return narr;
  }

  private clearArrays(...arrs: any[]): void {
    arrs.forEach((arr) => arr.splice(0, arr.length));
  }

  private resetSearch(): void {
    this.clearArrays(this.users, this.games, this.results);
    this.userCount = 0;
    this.loadingResults = true;
  }

  private updateGames(user: SteamUser, games: SteamGame[]) {
    this.results.push({
      user: user,
      games: games
    });

    if (this.results.length == this.userCount) {
      this.clearArrays(this.users, this.games);

      this.users = this.results.map((val) => val.user);

      if (this.results.length > 1) {
        let counter: { count: number, game: SteamGame }[] = [];
        this.results.forEach((result) => {
          result.games.forEach((game) => {
            const found = counter.find((val) => val.game.appid === game.appid);
            if (found == null)
              counter.push({
                count: 1,
                game: game
              });
            else
              found.count++;
          });
        });
        this.games = counter.filter((val) => val.count === this.users.length).map((val) => val.game);
      } else
        this.games = this.results[0].games;

      this.games = this.games.sort((a, b) => a.name.localeCompare(b.name));
      this.searchForm.patchValue({ search: '' });
      this.loadingResults = false;
    }
  }

  public loadSearchResults(): void {
    /*const value: string = this.searchForm.get('search').value.trim();

    if (value.length > 0) {
      this.resetSearch();

      this.userCount = value.split(',').length;

      this.http.get(`/api/steam/getPlayerSummaries/${value}`).subscribe((getPlayerSummaries: GetPlayerSummaries) => {
        if (getPlayerSummaries != null && getPlayerSummaries.response != null && getPlayerSummaries.response.players != null)
          if (getPlayerSummaries.response.players.length > 0)
            this.removeDuplicatesByKey(getPlayerSummaries.response.players, 'steamid').forEach((user: SteamUser) => {
              this.http.get(`/api/steam/getOwnedGames/${user.steamid}/1`).subscribe((getOwnedGames: GetOwnedGames) => {
                if (getOwnedGames != null && getOwnedGames.response != null && getOwnedGames.response.games != null)
                  if (getOwnedGames.response.games.length > 0)
                    this.updateGames(user, getOwnedGames.response.games);
                  else
                    this.error = `${user.personaname} has no games yet`;
                else
                  this.error = 'An error occurred while fetching results. The user may have their profile set to private';
              }, (error) => {
                this.loading = false;
                if (error != null) {
                  this.error = 'An error occurred while fetching results. The user may have their profile set to private';
                  console.error('An error occurred: loadSearchResults', error);
                }
              });
            });
          else
            this.error = `No user found from the Steam ID${this.userCount > 1 ? 's' : ''}: ${value}`;
      }, (error) => {
        this.loading = false;
        if (error != null) {
          this.error = 'An error occurred while fetching results. One or more users may have their profiles set to private';
        }
      });
    }*/
  }

  public getUsernames(users: SteamUser[]): string {
    return users.length > 1 ? (`${users.filter((user, index) => index < users.length - 1).map((user) => user.personaname).join(', ')} and ${users[users.length - 1].personaname}`) : users[0].personaname;
  }

  public getRunUrl(game: SteamGame): string {
    return `steam://run/${game.appid}`;
  }

  public isSearchable(): boolean {
    return this.searchForm.get('search').value.trim().length > 0;
  }

}

