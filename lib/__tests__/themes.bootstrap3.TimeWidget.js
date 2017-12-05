"use strict";

var _expect = require("expect");

var _expect2 = _interopRequireDefault(_expect);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _ = require("../");

var _2 = _interopRequireDefault(_);

var _testUtils = require("./test-utils");

var _enzyme = require("enzyme");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("TimeWidget", function () {
  it("should render a form with a type time widget", function () {
    var schema = {
      title: "A schema",
      properties: {
        field: {
          type: "string",
          widget: "time"
        }
      }
    };

    var Component = _react2.default.createElement(
      _testUtils.FormFrame,
      null,
      _react2.default.createElement(_2.default, { schema: schema })
    );

    var wrapper = (0, _enzyme.render)(Component);

    (0, _expect2.default)(wrapper.find("input[type=time]").length).toEqual(1);
  });
  it("required gives the input the required attribute", function () {
    var schema = {
      title: "A schema",
      properties: {
        field: {
          type: "string",
          widget: "time"
        }
      },
      required: ["field"]
    };

    var Component = _react2.default.createElement(
      _testUtils.FormFrame,
      null,
      _react2.default.createElement(_2.default, { schema: schema })
    );

    var wrapper = (0, _enzyme.render)(Component);

    (0, _expect2.default)(wrapper.find("input[required]").length).toEqual(1);
  });
});