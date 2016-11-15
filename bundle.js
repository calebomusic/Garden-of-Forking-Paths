/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var Game = __webpack_require__(1);
	var Stage = __webpack_require__(2);
	var Grid = __webpack_require__(3);
	
	document.addEventListener("DOMContentLoaded", function () {
	  var canvasEl = document.getElementsByTagName("canvas")[0];
	  canvasEl.width = 1000;
	  canvasEl.height = 1000;
	
	  var ctx = canvasEl.getContext("2d");
	  // const game = new Game();
	  // new Stage(game, ctx).start();
	});
	
	window.grid = Grid;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Grid = __webpack_require__(3);
	// const Maze = require('/.maze');
	
	var Game = function Game(player) {
	  _classCallCheck(this, Game);
	
	  this.grid = new Grid(20, 20);
	  this.player = player;
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Grid = __webpack_require__(3);
	
	var Stage = function Stage(game, ctx) {
	  _classCallCheck(this, Stage);
	
	  this.game = game;
	  this.ctx = ctx;
	};
	
	module.exports = Stage;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Cell = __webpack_require__(4);
	
	var Grid = function () {
	  function Grid(rows, cols) {
	    _classCallCheck(this, Grid);
	
	    this.rows = rows;
	    this.cols = cols;
	    this.cells = this.prepareGrid();
	    this.configureCells();
	  }
	
	  _createClass(Grid, [{
	    key: 'prepareGrid',
	    value: function prepareGrid() {
	      var cells = [];
	
	      for (var i = 0; i < this.rows; i++) {
	        cells[i] = [];
	        for (var j = 0; j < this.cols; j++) {
	          cells[i].push(new Cell(i, j));
	        }
	      }
	
	      return cells;
	    }
	  }, {
	    key: 'configureCells',
	    value: function configureCells() {
	      var _this = this;
	
	      this.eachCell(function (cell) {
	        var row = cell.row;
	        var col = cell.col;
	
	        if (_this.inBounds(row - 1, _this.rows)) {
	          cell.north = _this.cells[row - 1][col];
	        }
	        if (_this.inBounds(row + 1, _this.rows)) {
	          cell.south = _this.cells[row + 1][col];
	        }
	        if (_this.inBounds(col - 1, _this.cols)) {
	          cell.east = _this.cells[row][col - 1];
	        }
	
	        if (_this.inBounds(col + 1, _this.cols)) {
	          cell.west = _this.cells[row][col + 1];
	        }
	      });
	    }
	  }, {
	    key: 'inBounds',
	    value: function inBounds(newCoord, dimension) {
	      if (dimension === this.rows) {
	        return newCoord >= 0 && newCoord < this.rows;
	      } else {
	        return newCoord >= 0 && newCoord < this.cols;
	      }
	    }
	  }, {
	    key: 'eachCell',
	    value: function eachCell(callback) {
	      this.cells.forEach(function (row) {
	        row.forEach(function (cell) {
	          callback(cell);
	        });
	      });
	    }
	  }]);
	
	  return Grid;
	}();
	
	module.exports = Grid;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Cell = function () {
	  function Cell(row, col) {
	    _classCallCheck(this, Cell);
	
	    this.row = row;
	    this.col = col;
	    this.north = null;
	    this.east = null;
	    this.west = null;
	    this.south = null;
	    this.links = {};
	  }
	
	  _createClass(Cell, [{
	    key: "link",
	    value: function link(cell) {
	      var bidi = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
	
	      this.links[cell] = true;
	      if (bidi) {
	        cell.link(this, false);
	      }
	
	      return this;
	    }
	  }, {
	    key: "unlink",
	    value: function unlink(cell) {
	      var bidi = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
	
	      delete this.links(cell);
	
	      if (bidi) {
	        cell.link(this, false);
	      }
	
	      return this;
	    }
	  }, {
	    key: "isLinked",
	    value: function isLinked(cell) {
	      Object.keys(this.links).forEach(function (linkedCell) {
	        if (cell.row === linkedCell.row && cell.col === linkedCell.col) {
	          return true;
	        }
	      });
	      return false;
	    }
	  }, {
	    key: "neighbors",
	    value: function neighbors() {
	      var list = [];
	
	      if (this.north) {
	        list.push(this.north);
	      }
	      if (this.west) {
	        list.push(this.west);
	      }
	      if (this.east) {
	        list.push(this.east);
	      }
	      if (this.south) {
	        list.push(this.south);
	      }
	    }
	  }]);
	
	  return Cell;
	}();
	
	module.exports = Cell;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map