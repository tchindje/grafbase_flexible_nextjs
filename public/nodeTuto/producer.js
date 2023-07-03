const validator = {
  set(obj, prop, value) {
    if (prop === "age") {
      if (!Number.isInteger(value)) {
        throw new TypeError("The age is not an integer");
      }
      if (value > 200) {
        throw new RangeError("The age seems invalid");
      }
    }

    // The default behavior to store the value
    obj[prop] = value;

    // Indicate success
    return true;
  },

  get: (target, property) => {
    if (property === "poste") {
      return ` ${target[property]} 5 etoiles`;
    }

    if (property === "hello") {
      return `${target.hello()} comportement de plusss -- proxy`;
    }

    return target[property];
  },
};

const person = {
  poste: "ministre",
  ville: "yaounde",
  hello: function () {
    return `hello`;
  },
};

//design factory : doit etre generique
const createProxyPerson = (target, handler) => {
  return new Proxy(target, handler);
};
const proxyPerson = createProxyPerson(person, validator);

// decorator pattern
const createDecoratorPerson = (person) => {
  return {
    ...person,
    hello: function () {
      return `${person.hello()} comportement de plusss - decorateur`;
    },
  };
};

// le proxy sert ici de validateur et
// de decorateur

console.log(proxyPerson.hello);

console.log(person.hello());

console.log(createDecoratorPerson(person).hello());
