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

    /**
     * The constructor of the class.
     * 
     * @param httpClient a http client used to make the requests
     */
    constructor(private httpClient: HttpClient) { }

    /**
     * Make a get request to the Staff DB and returns a Staff Observable.
     * 
     * @param username the passed username
     * @param password the passed password
     * @returns a Staff Observable
     */
    public getLogin(username: string, password: string): Observable<Login> {
        const queryURL = this.dbUrl.concat(`/${username}/${password}`);
        return this.httpClient.get<Login>(queryURL)
            .pipe(
                map(response => response)
            );
    }

    /**
     * Sets OTP.
     * 
     * @param login the login session
     */
    public setOTP(login: Login) {
        login.otp = Math.floor(100000 + Math.random() * 900000);
    }

    /**
     * Sets the login session.
     * 
     * @param login the login obj
     */
    public setLogin(login: Login) {
        this.login = login;
    }

    /**
     * Gets the login object.
     * 
     * @returns the login obj
     */
    public retrieveLogin(): Login {
        return this.login;
    }

}
