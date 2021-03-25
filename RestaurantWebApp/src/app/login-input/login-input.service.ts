import { Injectable } from '@angular/core';
import { Login } from '../../models/Login';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

/**
 * The class that handles DB requests for the login.
 */
export class InputService {
    /**
     * The url of the staff DB to make requetsts to.
     */
    private dbUrl = 'http://localhost:8080/api/v1/staff'

    /**
     * The login session object.
     */
    login: Login = new Login;
    constructor(private httpClient: HttpClient) {}
    /**
     * The method for querying user input against the information in the staff database.
     * 
     * @param {string} username The username entered by the user.
     * @param {string} password  The password entered by the user.
     * @returns {Observable<Login>} An object incapsulating the login details which correpsond to the user input.
     */
    public getLogin(username: string, password: string): Observable<Login> {
        const queryURL = this.dbUrl.concat(`/${username}/${password}`);
        return this.httpClient.get<Login>(queryURL)
            .pipe(
                map(response => response)
            );
    }
}
