"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _deepmerge = require("deepmerge");

var _deepmerge2 = _interopRequireDefault(_deepmerge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var guessWidget = function guessWidget(fieldSchema, theme) {
  if (fieldSchema.widget) {
    return fieldSchema.widget;
  } else if (fieldSchema.hasOwnProperty("enum")) {
    return "choice";
  } else if (fieldSchema.hasOwnProperty("oneOf")) {
    return "oneOf";
  } else if (theme[fieldSchema.format]) {
    return fieldSchema.format;
  }
  return fieldSchema.type || "object";
};

var renderField = function renderField(fieldSchema, fieldName, theme) {
  var prefix = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";
  var context = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
  var required = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;

  if (fieldSchema.hasOwnProperty("allOf")) {
    fieldSchema = _extends({}, fieldSchema, _deepmerge2.default.all(fieldSchema.allOf));
    delete fieldSchema.allOf;
  }

  var widget = guessWidget(fieldSchema, theme);

  if (!theme[widget]) {
    throw new Error("liform: " + widget + " is not defined in the theme");
  }

  var newFieldName = prefix ? prefix + fieldName : fieldName;

  return _react2.default.createElement(theme[widget], {
    key: fieldName,
    fieldName: widget === "oneOf" ? fieldName : newFieldName,
    label: fieldSchema.showLabel === false ? "" : fieldSchema.title || fieldName,
    required: required,
    schema: fieldSchema,
    theme: theme,
    context: context,
    prefix: prefix
  });
};

exports.default = renderField;