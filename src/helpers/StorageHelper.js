import AsyncStorage from '@react-native-async-storage/async-storage';

export const StorageHelper = {
  get: async tableName => {
    const data = await AsyncStorage.getItem(tableName);
    return data ? JSON.parse(data) : null;
  },
  set: async (tableName, data) =>
    AsyncStorage.setItem(tableName, JSON.stringify(data)),
  update: async (tableName, data) => {
    let res = await this.get(tableName);
    if (res) {
      for (let k in data) {
        res[k] = data[k];
      }
    }
    return await this.set(tableName, res);
  },
  remove: async tableName => AsyncStorage.removeItem(tableName),

  multiGet: async tableNames => {
    const data = await AsyncStorage.multiGet([...tableNames]);
    const obj = {};
    data.forEach(item => {
      const key = item[0];
      const value = item[1];
      obj[key] = JSON.parse(value);
    });
    return obj;
  },
  multiSet: async pairs => {
    AsyncStorage.multiSet([...pairs]);
  },
  multiRemove: async tableNames => AsyncStorage.multiRemove(tableNames),
};
