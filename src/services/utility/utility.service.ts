import { Injectable } from '@angular/core';

@Injectable()
export class UtilityService {

  constructor() { }

  isValid(data: string) {
    if(data && data !== null && data !== "undefined") {
      return true;
    }
    return false;
  }

  getStringDataFromLocalStorage(key: string) {
    if(this.isValid(localStorage.getItem(key))) {
      return localStorage.getItem(key);
    }
  }

  getJsonDataFromLocalStorage(key: string) {
    if(this.isValid(localStorage.getItem(key))) {
      return JSON.parse(localStorage.getItem(key));
    }
    return [];
  }

  getBooleanDataFromLocalStorage(key: string) {
    if(this.isValid(localStorage.getItem(key))) {
      if(localStorage.getItem(key) === 'true') {
        return true;
      }
    }
    return false;
  }

  getIntDataFromLocalStorage(key: string) {
    if(this.isValid(localStorage.getItem(key))) {
      return parseInt(localStorage.getItem(key));
    }
  }

  setStringDataToLocalStorage(key: string, data: string) {
    localStorage.setItem(key, data);
  }

  setJsonDataToLocalStorage(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  setIntDataToLocalStorage(key: string, data: number) {
    localStorage.setItem(key, '' + data);
  }

  setBooleanDataToLocalStorage(key: string, data: boolean) {
    if(data) {
      localStorage.setItem(key, 'true');
    } else {
      localStorage.setItem(key, 'false');
    }
  }

  removeMultipleDataFromLocalStorage(keys: string[]) {
    keys.forEach(function(key) {
      localStorage.removeItem(key);
    });
  }

  removeSingleDataFromLocalStorage(key: string) {
      localStorage.removeItem(key);
  }

}
