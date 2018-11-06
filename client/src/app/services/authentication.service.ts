import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, mergeMap } from 'rxjs/operators';
import { Restangular } from 'ngx-restangular';

import { UrlSettings } from '../config/url.settings';

import { UserClass } from '../domain/user.class';

import { UserService } from './user.service';

@Injectable()
export class AuthenticationService {

  public static readonly INDEX: string[] = ['/index'];
  public static readonly HOME: string[] = ['/home'];

  public static readonly ACCESS_TOKEN = 'access_token';
  public static readonly REGISTERED_USER = 'registered_user';
  public static readonly AUTHORIZATION_HEADER = 'Authorization';

  constructor(private restangular: Restangular,
    private userService: UserService) { }

  /**
   * Are we connected or not ?
   */
  public get isConnected(): boolean {
    return !!localStorage.getItem(AuthenticationService.ACCESS_TOKEN);
  }

  /**
   * Authenticated user
   */
  public get user(): UserClass {
    return localStorage.getItem(AuthenticationService.REGISTERED_USER) ? JSON.parse(localStorage.getItem(AuthenticationService.REGISTERED_USER)) : null;
  }

  /**
   * Returns user's home that's differ from the authenticated state (logged-in or not) and from the role (ie admin or not)
   */
  public get homePage(): string[] {
    return !this.isConnected ? AuthenticationService.INDEX : AuthenticationService.HOME;
  }

  /**
   * To know if there's a connected user or not
   */
  public computeIsLoggedIn(): Promise<boolean> {
    const user = this.user;
    if (user) {
      // There's a session stored in localStorage. Let see if the corresponding token is OK with the server
      return this.restangular.one(UrlSettings.userModel, user.id).all(UrlSettings.userAccessTokens).getList().toPromise()
        .catch(() => {
          console.error('Invalid client token');
          this.resetSession();
        });
    }
    this.resetSession();
    console.error('Client token is missing');
    return new Promise(resolve => {
      resolve(false);
    });
  }

  /**
   * Signin with credentials, and store token & connected user in local storage
   *
   * @param email
   * @param password
   */
  public signin(email: string, password: string): Observable<LoopbackToken> {
    // First, log in
    return this.restangular.all(UrlSettings.userModel).customPOST({ email, password }, UrlSettings.userLogin).pipe(
      tap((token: LoopbackToken) => {
        // Store token in local storage
        localStorage.setItem(AuthenticationService.ACCESS_TOKEN, JSON.stringify(token));
        // Set Restangular header's configuration with new autorization key
        this.restangular.configuration.defaultHeaders = { [AuthenticationService.AUTHORIZATION_HEADER]: token.id };
      }),
      mergeMap((token: LoopbackToken) => this.userService.getById(token.userId).pipe(
        tap((user) => localStorage.setItem(AuthenticationService.REGISTERED_USER, JSON.stringify(user)))
      ))
    );
  }

  /**
   * Signout from application
   */
  public signout(): Observable<any> {
    return this.restangular.all(UrlSettings.userModel).customPOST({}, UrlSettings.userLogout).pipe(
      tap(() => this.resetSession())
    );
  }

  /**
   * Reset session's variables :
   * - Clear access_token in local storage
   * - Clear Restangular default headers
   * - Set connected var to false
   */
  private resetSession() {
    // Clear local storage
    localStorage.removeItem(AuthenticationService.ACCESS_TOKEN);
    localStorage.removeItem(AuthenticationService.REGISTERED_USER);
    // Clear Restangular header's configuration
    this.restangular.configuration.defaultHeaders = {};
  }
}