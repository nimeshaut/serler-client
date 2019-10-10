const searchOperation = {
  isEqualTo: {
    title: "Is equal to",
    value: "$eq",
    types: ["string", "number", "boolean"]
  },
  isNotEqualTo: {
    title: "Is not equal to",
    value: "$ne",
    types: ["string", "number", "boolean"]
  },
  contains: {
    title: "Contains",
    value: "$in",
    types: ["string"]
  },
  doesNotContain: {
    title: "Does not contain",
    value: "$nin",
    types: ["string"]
  },
  beginsWith: {
    title: "Begins with",
    value: "$eq",
    types: ["string"]
  },
  endsWith: {
    title: "Ends with",
    value: "$eq",
    types: ["string"]
  },
  isLessThan: {
    title: "Is less than",
    value: "$lt",
    types: ["number"]
  },
  isLessThanOrEqualTo: {
    title: "Is less than or equal to",
    value: "$lte",
    types: ["number"]
  },
  isGreaterThan: {
    title: "Is greater than",
    value: "$gt",
    types: ["number"]
  },
  isGreaterThanOrEqualTo: {
    title: "Is greater than or equal to",
    value: "$gte",
    types: ["number"]
  },
  between: {
    title: "Between",
    value: "$eq",
    types: ["number"]
  }
};

function findOperationsForType(type) {
  const operations = [];
  const operationsMongo = [];

  for (let operationName in searchOperation) {
    const operation = searchOperation[operationName];
    const operationMongo = searchOperation[operationName].value;
    if (operation.types.includes(type)) {
      operations.push(operationName);
      operationsMongo.push(operationMongo);
      //operations.push(operationName);
    }
  }

  return operations;
}

function findMongoOperationsForType(type) {
  const operations = [];
 

  for (let operationName in searchOperation) {
    const operation = searchOperation[operationName];
    
    if (operation.types.includes(type)) {
      operations.push(operation.value);
      
      //operations.push(operationName);
    }
  }

  return operations;
}
export { searchOperation as default, findOperationsForType ,findMongoOperationsForType};
