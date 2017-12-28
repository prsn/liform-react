"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _reduxForm = require("redux-form");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var renderInput = function renderInput(field) {
  var className = (0, _classnames2.default)(["form-group", { "has-error": field.meta.touched && field.meta.error }]);
  return _react2.default.createElement(
    "div",
    { className: className },
    _react2.default.createElement(
      "label",
      { className: "control-label", htmlFor: field.id },
      field.label
    ),
    _react2.default.createElement("input", _extends({}, field.input, {
      type: field.type,
      required: field.required,
      className: "form-control",
      placeholder: field.placeholder
    })),
    field.meta.touched && field.meta.error && _react2.default.createElement(
      "span",
      { className: "help-block" },
      field.meta.error
    ),
    field.description && _react2.default.createElement(
      "span",
      { className: "help-block" },
      field.description
    )
  );
};

var BaseInputWidget = function (_Component) {
  _inherits(BaseInputWidget, _Component);

  function BaseInputWidget(props) {
    _classCallCheck(this, BaseInputWidget);

    var _this = _possibleConstructorReturn(this, (BaseInputWidget.__proto__ || Object.getPrototypeOf(BaseInputWidget)).call(this, props));

    _this.toggleHovering = function (isHovering) {
      _this.setState({
        hover: isHovering
      });
    };

    _this.state = {
      hover: false
    };
    return _this;
  }

  _createClass(BaseInputWidget, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var isHovering = this.state && this.state.hover || false,
          props = this.props,
          isEditMode = props.isEditMode || false;

      return _react2.default.createElement(
        "div",
        { onMouseEnter: function onMouseEnter() {
            _this2.toggleHovering(true);
          }, onMouseLeave: function onMouseLeave() {
            _this2.toggleHovering(false);
          } },
        isEditMode && _react2.default.createElement(
          "div",
          { style: { height: 20 } },
          isHovering && _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(
              "a",
              { href: "#", onClick: function onClick() {
                  return console.log('Edit clicked');
                }, style: { marginRight: 7 } },
              _react2.default.createElement("span", { className: "glyphicon glyphicon-edit m2 p2" })
            ),
            _react2.default.createElement(
              "a",
              { href: "#", onClick: function onClick() {
                  return console.log('Remove clicked');
                }, style: { marginRight: 7 } },
              _react2.default.createElement("span", { className: "glyphicon glyphicon-trash m2 p2" })
            )
          )
        ),
        _react2.default.createElement(_reduxForm.Field, {
          component: renderInput,
          label: props.label,
          name: props.fieldName,
          required: props.required,
          id: "field-" + props.fieldName,
          placeholder: props.schema.default,
          description: props.schema.description,
          type: props.type,
          normalize: props.normalizer
        })
      );
    }
  }]);

  return BaseInputWidget;
}(_react.Component);

BaseInputWidget.propTypes = {
  schema: _propTypes2.default.object.isRequired,
  type: _propTypes2.default.string.isRequired,
  required: _propTypes2.default.bool,
  fieldName: _propTypes2.default.string,
  label: _propTypes2.default.string,
  normalizer: _propTypes2.default.func
};

exports.default = BaseInputWidget;