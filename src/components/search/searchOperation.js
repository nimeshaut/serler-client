const searchOperation = {
  isEqualTo: {
    title: "Is equal to",
    types: ["string", "number", "boolean"]
  },
  isNotEqualTo: {
    title: "Is not equal to",
    types: ["string", "number", "boolean"]
  },
  contains: {
    title: "Contains",
    types: ["string"]
  },
  doesNotContain: {
    title: "Does not contain",
    types: ["string"]
  },
  beginsWith: {
    title: "Begins with",
    types: ["string"]
  },
  endsWith: {
    title: "Ends with",
    types: ["string"]
  },
  isLessThan: {
    title: "Is less than",
    types: ["number"]
  },
  isLessThanOrEqualTo: {
    title: "Is less than or equal to",
    types: ["number"]
  },
  isGreaterThan: {
    title: "Is greater than",
    types: ["number"]
  },
  isGreaterThanOrEqualTo: {
    title: "Is greater than or equal to",
    types: ["number"]
  },
  between: {
    title: "Between",
    types: ["number"]
  }
};

function findOperationsForType(type) {
  const operations = [];

  for (let operationName in searchOperation) {
    const operation = searchOperation[operationName];
    if (operation.types.includes(type)) {
      operations.push(operationName);
    }
  }

  return operations;
}

export { searchOperation as default, findOperationsForType };
