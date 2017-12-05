"use strict";

var _expect = require("expect");

var _expect2 = _interopRequireDefault(_expect);

var _renderFields = require("../renderFields");

var _renderFields2 = _interopRequireDefault(_renderFields);

var _bootstrap = require("../themes/bootstrap3");

var _bootstrap2 = _interopRequireDefault(_bootstrap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("renderFields", function () {
  var schema = {
    title: "A schema",
    properties: {
      name: {
        type: "string",
        title: "A name"
      }
    }
  };

  var schemaWrong = {
    title: "A schema",
    properties: {
      name: {
        type: "asdf"
      }
    }
  };

  it("raises exception if type is not defined", function () {
    (0, _expect2.default)(function () {
      (0, _renderFields2.default)(schemaWrong, _bootstrap2.default);
    }).toThrow(/liform:/);
  });

  it("creates element with a label", function () {
    var elems = (0, _renderFields2.default)(schema, _bootstrap2.default);
    (0, _expect2.default)(elems[0].props).toIncludeKey("label");
  });
  it("respects order of elements", function () {
    var schemaOrder = {
      title: "A schema",
      properties: {
        familyName: {
          type: "string",
          title: "A surname",
          propertyOrder: 2
        },
        name: {
          type: "string",
          title: "A name",
          propertyOrder: 1
        },
        another: {
          type: "string",
          title: "Another",
          propertyOrder: 3
        }
      }
    };
    var elems = (0, _renderFields2.default)(schemaOrder, _bootstrap2.default);
    (0, _expect2.default)(elems[0].props.label).toBe("A name");
    (0, _expect2.default)(elems[1].props.label).toBe("A surname");
    (0, _expect2.default)(elems[2].props.label).toBe("Another");
  });
});