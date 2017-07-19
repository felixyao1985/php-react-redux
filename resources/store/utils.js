import objectAssign from 'object-assign'

let Utils = {
  store(schema, origin, object) {

    let result = {};
    for (let columnName in schema) {
      if (!schema.hasOwnProperty(columnName)) {
        continue;
      }
      let columnType = schema[columnName];
      let columnValue = this.getColumnValue(object, columnName, columnType);
      if (columnValue !== null) {
        result[columnName] = columnValue;
      }
    }

    return objectAssign({}, origin, result);
  },

  storeList(schema, origin, objectList) {
    
    let result = [];
    for (let key in objectList) {
      if (!objectList.hasOwnProperty(key)) {
        continue;
      }
      result.push(this.store(schema, {}, objectList[key]))
    }

    return result;
  },

  getColumnValue(object, columnName, columnType) {

    let columnValue = null;
    if (!object.hasOwnProperty(columnName)) {
      return columnValue
    }

    return this.convertColumnType(object[columnName], columnType);
  },

  convertColumnType(columnValue, columnType) {
    let value = columnValue;
    switch (columnType) {
      case 'object':
        if (typeof value != 'object') {
          value = {};
        }
        break;
      case 'string':
        value = value.toString();
        if (typeof value != 'string') {
          value = "";
        }
        break;
      case 'number':
        value = Number(value);
        if (typeof value !== 'number' || Number.isNaN(value)) {
          return 0;
        }
        break;
    }

    return value;
  }
};

export default Utils;