"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _renderField = require("../../renderField");

var _renderField2 = _interopRequireDefault(_renderField);

var _reduxForm = require("redux-form");

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _ChoiceWidget = require("./ChoiceWidget");

var _ChoiceWidget2 = _interopRequireDefault(_ChoiceWidget);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var renderArrayFields = function renderArrayFields(count, schema, theme, fieldName, remove, context, swap) {
  var prefix = fieldName + ".";
  if (count) {
    return _lodash2.default.times(count, function (idx) {
      return _react2.default.createElement(
        "div",
        { key: idx },
        _react2.default.createElement(
          "div",
          { className: "btn-group pull-right " },
          idx !== count - 1 && count > 1 ? _react2.default.createElement(
            "button",
            {
              className: "btn btn-primary",
              onClick: function onClick(e) {
                e.preventDefault();
                swap(idx, idx + 1);
              }
            },
            _react2.default.createElement("span", { className: "glyphicon glyphicon-arrow-down" })
          ) : "",
          idx !== 0 && count > 1 ? _react2.default.createElement(
            "button",
            {
              className: "btn btn-primary",
              onClick: function onClick(e) {
                e.preventDefault();
                swap(idx, idx - 1);
              }
            },
            _react2.default.createElement("span", { className: "glyphicon glyphicon-arrow-up" })
          ) : "",
          _react2.default.createElement(
            "button",
            {
              className: "btn btn-danger",
              onClick: function onClick(e) {
                e.preventDefault();
                remove(idx);
              }
            },
            _react2.default.createElement("span", { className: "glyphicon glyphicon-trash" })
          )
        ),
        (0, _renderField2.default)(_extends({}, schema, { showLabel: false }), idx.toString(), theme, prefix, context)
      );
    });
  } else {
    return null;
  }
};

var renderInput = function renderInput(field) {
  var className = (0, _classnames2.default)(["arrayType", { "has-error": field.meta.submitFailed && field.meta.error }]);

  return _react2.default.createElement(
    "div",
    { className: className },
    _react2.default.createElement(
      "legend",
      { className: "control-label" },
      field.label
    ),
    field.meta.submitFailed && field.meta.error && _react2.default.createElement(
      "span",
      { className: "help-block" },
      field.meta.error
    ),
    renderArrayFields(field.fields.length, field.schema.items, field.theme, field.fieldName, function (idx) {
      return field.fields.remove(idx);
    }, field.context, function (a, b) {
      field.fields.swap(a, b);
    }),
    _react2.default.createElement(
      "button",
      {
        type: "button",
        className: "pull-right btn btn-primary",
        onClick: function onClick() {
          return field.fields.push();
        }
      },
      "Add"
    ),
    _react2.default.createElement("div", { className: "clearfix" })
  );
};

var CollectionWidget = function CollectionWidget(props) {
  return _react2.default.createElement(_reduxForm.FieldArray, {
    component: renderInput,
    label: props.label,
    name: props.fieldName,
    fieldName: props.fieldName,
    schema: props.schema,
    values: props.values,
    theme: props.theme,
    context: props.context
  });
};

var ArrayWidget = function ArrayWidget(props) {
  // Arrays are tricky because they can be multiselects or collections
  if (props.schema.items.hasOwnProperty("enum") && props.schema.hasOwnProperty("uniqueItems") && props.schema.uniqueItems) {
    return (0, _ChoiceWidget2.default)(_extends({}, props, {
      schema: props.schema.items,
      multiple: true
    }));
  } else {
    return CollectionWidget(props);
  }
};

ArrayWidget.propTypes = {
  schema: _propTypes2.default.object.isRequired,
  fieldName: _propTypes2.default.string,
  label: _propTypes2.default.string,
  theme: _propTypes2.default.object,
  context: _propTypes2.default.object
};

exports.default = ArrayWidget;