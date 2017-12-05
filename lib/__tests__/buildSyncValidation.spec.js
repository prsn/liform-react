"use strict";

var _expect = require("expect");

var _expect2 = _interopRequireDefault(_expect);

var _buildSyncValidation = require("../buildSyncValidation.js");

var _buildSyncValidation2 = _interopRequireDefault(_buildSyncValidation);

var _ajv = require("ajv");

var _ajv2 = _interopRequireDefault(_ajv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("sync validation", function () {
  it("Works with basic objects", function () {
    var schema = {
      properties: {
        name: {
          type: "string",
          minLength: 3
        }
      },
      required: ["name"]
    };

    var values = {};
    var errors = (0, _buildSyncValidation2.default)(schema)(values);
    (0, _expect2.default)(errors).toBeA("object").toIncludeKey("name");
  });
  it("Errors on arrays are in _error key of the array", function () {
    var schema = {
      properties: {
        columns: {
          type: "array",
          minItems: 1,
          items: {
            type: "string"
          }
        }
      },
      required: ["columns"]
    };

    var values = {};
    var errors = (0, _buildSyncValidation2.default)(schema)(values);
    (0, _expect2.default)(errors).toBeA("object").toIncludeKey("columns");
    (0, _expect2.default)(errors.columns).toBeA("object").toIncludeKey("_error");
  });
  it("Works with array elements", function () {
    var schema = {
      properties: {
        columns: {
          type: "array",
          minItems: 1,
          items: {
            type: "string",
            minLength: 3
          }
        }
      },
      required: ["columns"]
    };

    var values = { columns: ["a"] };
    var errors = (0, _buildSyncValidation2.default)(schema)(values);
    (0, _expect2.default)(errors).toBeA("object").toIncludeKey("columns");
    (0, _expect2.default)(errors.columns).toBeA("object").toIncludeKey("0");
  });
  it("Works with several errors", function () {
    var schema = {
      properties: {
        name: {
          type: "string",
          minLength: 3
        },
        columns: {
          type: "array",
          minItems: 1,
          items: {
            type: "string",
            minLength: 3
          }
        }
      },
      required: ["columns", "name"]
    };

    var values = { columns: ["a"], name: "aa" };
    var errors = (0, _buildSyncValidation2.default)(schema)(values);
    (0, _expect2.default)(errors).toBeA("object").toIncludeKey("columns");
    (0, _expect2.default)(errors).toBeA("object").toIncludeKey("name");
    (0, _expect2.default)(errors.columns).toBeA("object").toIncludeKey("0");
  });
});