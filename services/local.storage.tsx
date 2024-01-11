import {MMKV} from 'react-native-mmkv';

interface ILocalStorage {
  saveUser(key: string, data: any): void;
  getUser(key: string): any;
}

class LocalStorage implements ILocalStorage {
  private storage: MMKV;
  constructor() {
    this.storage = new MMKV();
  }

  saveUser(key: string, data: any): void {
    this.storage.set(key, JSON.stringify(data));
    console.log('Saved');
  }

  getUser(key: string): any {
    const jsonUser = this.storage.getString(key);
    if (jsonUser) {
      const userObject = JSON.parse(jsonUser);
      console.log(`Saved Data: ${jsonUser}`);
      return userObject;
    }
  }
}

export default LocalStorage;
