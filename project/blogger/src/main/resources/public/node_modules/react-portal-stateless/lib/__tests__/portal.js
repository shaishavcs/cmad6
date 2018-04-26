'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _portal = require('../portal');

var _portal2 = _interopRequireDefault(_portal);

var _enzyme = require('enzyme');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('propTypes.children should be required', function () {
  expect(_portal2.default.propTypes.children).toEqual(_propTypes2.default.element.isRequired);
});