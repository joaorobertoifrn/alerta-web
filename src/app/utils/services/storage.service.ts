import { Injectable } from '@angular/core';
import { STORAGE_KEYS } from 'src/app/config/storage_keys.config';
import { LocalUser } from 'src/app/models/local_user';

@Injectable()
export class StorageService {

    getLocalUser(): LocalUser {
        const usr = localStorage.getItem(STORAGE_KEYS.localUser);
        if (usr == null) {
            return null;
        } else {
            return JSON.parse(usr);
        }
    }

    setLocalUser(obj: LocalUser) {
        if (obj == null) {
            localStorage.removeItem(STORAGE_KEYS.localUser);
        } else {
            localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
        }
    }

}
