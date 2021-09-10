/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/components/favourites.js":
/*!*****************************************!*\
  !*** ./src/js/components/favourites.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Favourite = /*#__PURE__*/function () {
  function Favourite() {
    _classCallCheck(this, Favourite);

    this.events();
  }

  _createClass(Favourite, [{
    key: "events",
    value: function events() {
      var _this = this;

      var favouriteBtns = document.querySelectorAll(".favourite-btn");
      favouriteBtns.forEach(function (btn) {
        return btn.addEventListener("click", _this.handleClick.bind(_this));
      });
    }
  }, {
    key: "handleClick",
    value: function handleClick(e) {
      var btnClicked = e.currentTarget;

      if (btnClicked.dataset.favourited == "yes") {
        // User is unfavouriting
        this.unfavourite(btnClicked);
      } else {
        this.favourite(btnClicked);
      }
    }
  }, {
    key: "favourite",
    value: function favourite(btn) {
      // Send PUT HTTP req to the URL
      var URL = "".concat(data.root_url, "/wp-json/webblast/v1/favourite");
      var id = btn.dataset.event;
      fetch(URL, {
        method: "POST",
        headers: {
          "X-WP-Nonce": data.nonce,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          eventID: id
        })
      }).then(function (data) {
        return data.json();
      }).then(function (response) {
        // response is the new favourite ID
        btn.dataset.favid = response;
        btn.dataset.favourited = "yes";
      });
    }
  }, {
    key: "unfavourite",
    value: function unfavourite(btn) {
      // Send DELETE HTTP req to URL
      var URL = "".concat(data.root_url, "/wp-json/webblast/v1/favourite");
      var id = btn.dataset.event;
      var favouriteID = btn.dataset.favid;
      fetch(URL, {
        method: "DELETE",
        headers: {
          "X-WP-Nonce": data.nonce,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          eventID: id,
          favouriteID: favouriteID
        })
      }).then(function (data) {
        return data.json();
      }).then(function (response) {
        console.log(response);
        btn.dataset.favourited = "no";
      });
    }
  }]);

  return Favourite;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Favourite);

/***/ }),

/***/ "./src/js/components/navigation.js":
/*!*****************************************!*\
  !*** ./src/js/components/navigation.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Navigation = /*#__PURE__*/function () {
  function Navigation() {
    _classCallCheck(this, Navigation);

    this.open = document.querySelector(".nav__open");
    this.close = document.querySelector(".nav__close");
    this.nav = document.querySelector(".nav");
    this.overlay = document.querySelector(".dark-overlay");
    this.events();
  }

  _createClass(Navigation, [{
    key: "events",
    value: function events() {
      var _this = this;

      this.open.addEventListener("click", this.openNavigation.bind(this));
      this.close.addEventListener("click", this.closeNavigation.bind(this));
      var dropdownBtns = document.querySelectorAll(".dropdown__btn");
      dropdownBtns.forEach(function (btn) {
        return btn.addEventListener("click", _this.toggleDropdown.bind(_this));
      });
      window.addEventListener("scroll", this.scrollHandler.bind(this));
    }
  }, {
    key: "scrollHandler",
    value: function scrollHandler(e) {
      if (window.scrollY > 0) {
        // Add Bubble to the open button
        this.open.classList.add("nav__open--bubble");
      } else {
        this.open.classList.remove("nav__open--bubble");
      }
    }
  }, {
    key: "openNavigation",
    value: function openNavigation() {
      this.nav.classList.add("nav--open");
      this.overlay.classList.add("dark-overlay--show");
    }
  }, {
    key: "closeNavigation",
    value: function closeNavigation() {
      this.nav.classList.remove("nav--open");
      this.overlay.classList.remove("dark-overlay--show");
    }
  }, {
    key: "toggleDropdown",
    value: function toggleDropdown(e) {
      var dropdown = e.currentTarget.closest(".dropdown");
      dropdown.classList.toggle("dropdown--open");
    }
  }]);

  return Navigation;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Navigation);

/***/ }),

/***/ "./src/js/components/reviews.js":
/*!**************************************!*\
  !*** ./src/js/components/reviews.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Reviews = /*#__PURE__*/function () {
  function Reviews() {
    _classCallCheck(this, Reviews);

    this.overlay = document.querySelector(".dark-overlay");
    this.events();
  }

  _createClass(Reviews, [{
    key: "events",
    value: function events() {
      var _this = this;

      // Form Submits
      var addReviewForm = document.querySelector(".add-review");
      if (addReviewForm) addReviewForm.addEventListener("submit", this.addReview.bind(this));
      var editReviewForm = document.querySelector(".edit-review");
      if (editReviewForm) editReviewForm.addEventListener("submit", this.editReview.bind(this)); // Modal Options

      var cancel = document.querySelector(".delete__no");
      if (cancel) cancel.addEventListener("click", this.cancelDelete.bind(this));
      var confirm = document.querySelector(".delete__yes");
      if (confirm) confirm.addEventListener("click", this.confirmDelete.bind(this)); // Add Review

      var openAdd = document.querySelector(".reviews__add");
      if (openAdd) openAdd.addEventListener("click", this.openAdd.bind(this)); // Dynamic Buttons

      var reviewContainer = document.querySelector(".reviews");
      if (reviewContainer) reviewContainer.addEventListener("click", this.handleClick.bind(this)); // Close Modals

      var modalCloses = document.querySelectorAll(".modal__close");
      if (modalCloses) modalCloses.forEach(function (btn) {
        return btn.addEventListener("click", _this.closeModal.bind(_this));
      });
    }
  }, {
    key: "showOverlay",
    value: function showOverlay() {
      this.overlay.classList.add("dark-overlay--show");
    }
  }, {
    key: "hideOverlay",
    value: function hideOverlay() {
      this.overlay.classList.remove("dark-overlay--show");
    }
  }, {
    key: "closeModal",
    value: function closeModal(e) {
      var modal = e.target.closest(".modal");
      this.hideModal(modal);
    }
  }, {
    key: "showModal",
    value: function showModal(modal) {
      modal.classList.add("modal--show");
      modal.setAttribute("aria-hidden", false);
      this.showOverlay();
    }
  }, {
    key: "hideModal",
    value: function hideModal(modal) {
      modal.classList.remove("modal--show");
      modal.setAttribute("aria-hidden", true);
      this.hideOverlay();
    }
  }, {
    key: "handleClick",
    value: function handleClick(e) {
      if (e.target.classList.contains("delete-review")) {
        this.deleteReview.call(this, e);
      } else if (e.target.classList.contains("open-edit")) {
        this.openEdit.call(this, e);
      }
    }
  }, {
    key: "openAdd",
    value: function openAdd(e) {
      e.stopPropagation();
      var modal = document.querySelector(".add");
      this.showModal(modal);
    }
  }, {
    key: "openEdit",
    value: function openEdit(e) {
      var modal = document.querySelector(".edit");
      var review = e.target.closest(".review");
      var title = review.querySelector(".review__title").innerHTML;
      var content = review.querySelector(".review__content").textContent;
      var numberStars = review.querySelector(".stars").dataset.count; // Set Form Values

      modal.querySelector(".edit__title").value = title;
      modal.querySelector(".edit__content").innerHTML = content;
      modal.querySelector(".edit__stars").value = numberStars;
      modal.querySelector(".edit-review").dataset.review = review.dataset.id;
      this.showModal(modal);
    }
  }, {
    key: "addReview",
    value: function addReview(e) {
      var _this2 = this;

      e.preventDefault();
      var URL = "".concat(data.root_url, "/wp-json/webblast/v1/review");
      var ID = e.currentTarget.dataset.event;
      var reviewData = new FormData(e.currentTarget);
      document.body.style.cursor = "wait";
      var modal = document.querySelector(".add");
      fetch(URL, {
        method: "POST",
        headers: {
          "X-WP-Nonce": data.nonce,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "title": reviewData.get("title"),
          "content": reviewData.get("content"),
          "event_id": ID,
          "star_count": parseInt(reviewData.get("stars"))
        })
      }).then(this.handleErrors).then(function (response) {
        return response.json();
      }).then(function (newReviewID) {
        modal.querySelector("form").reset();

        _this2.hideModal(modal);

        var stars = _this2.createStars(parseInt(reviewData.get("stars")), false); // Create new Review


        var newReview = "<div class=\"review\" data-id=\"".concat(newReviewID, "\">\n\t\t\t\t<h3 class=\"review__title\">").concat(reviewData.get("title"), "</h3>\n\t\t\t\t<div class=\"review__options\">\n\t\t\t\t\t<button class=\"btn open-edit\">Edit</button>\n\t\t\t\t\t<button class=\"btn btn--secondary delete-review\">Delete</button>\n\t\t\t\t</div>\n\t\t\t\t").concat(stars, "\n\t\t\t\t<p class=\"review__content\">").concat(reviewData.get("content"), "</p>\n\t\t\t</div>");
        document.querySelector(".reviews__content").innerHTML += newReview; //Hide 'Add Review' button

        var addBtn = document.querySelector(".reviews__add");
        addBtn.classList.add("btn--hidden");
        addBtn.setAttribute("aria-hidden", true); // Hide 'No Reviews' Text

        _this2.setHidden(document.querySelector(".reviews__none"), true);

        var reviewsAverage = document.querySelector(".reviews__avg");
        var numberReviews = document.querySelectorAll(".review").length;

        if (numberReviews == 1) {
          // Add Average Review Text if first review
          _this2.setHidden(reviewsAverage, false);

          reviewsAverage.innerHTML = "<p>Average Review: </p> ".concat(_this2.createStars(parseInt(reviewData.get("stars")), true));
        } else {
          // Update Average if second and up review
          var average = _this2.getReviewAverage();

          reviewsAverage.innerHTML = "<p>Average Review: </p> ".concat(_this2.createStars(average, true));
        }

        document.body.style.cursor = "default";
      })["catch"](function (err) {
        console.log(err);
        document.body.style.cursor = "default";
      });
      return false;
    }
  }, {
    key: "getReviewAverage",
    value: function getReviewAverage() {
      var reviews = _toConsumableArray(document.querySelectorAll(".review"));

      var avg = 0;
      reviews.forEach(function (review) {
        avg += parseInt(review.querySelector(".stars").dataset.count);
      });
      avg /= reviews.length;
      return avg;
    }
  }, {
    key: "createStars",
    value: function createStars(numStars, isInline) {
      var stars = isInline ? "<div class=\"stars stars--inline\" data-count=\"".concat(numStars, "\">") : "<div class=\"stars\" data-count=\"".concat(numStars, "\">");

      for (var i = 0; i < numStars; i++) {
        stars += "<i class=\"fa fa-star star\"></i>";
      }

      stars += "</div>";
      return stars;
    }
  }, {
    key: "deleteReview",
    value: function deleteReview(e) {
      var modal = document.querySelector(".delete");
      this.showModal(modal);
      var review = e.target.closest(".review");
      modal.dataset.review = review.dataset.id;
    }
  }, {
    key: "cancelDelete",
    value: function cancelDelete(e) {
      var modal = e.target.closest(".modal");
      this.hideModal(modal);
      modal.dataset.review = "";
    }
  }, {
    key: "confirmDelete",
    value: function confirmDelete(e) {
      var _this3 = this;

      var modal = e.currentTarget.closest(".modal"); // Send DELETE Request to the custom URL

      var URL = "".concat(data.root_url, "/wp-json/webblast/v1/review");
      document.body.style.cursor = "wait";
      var reviewID = modal.dataset.review;
      fetch(URL, {
        method: "DELETE",
        headers: {
          "X-WP-Nonce": data.nonce,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          reviewID: reviewID
        })
      }).then(this.handleErrors).then(function (response) {
        return response.json();
      }).then(function (data) {
        _this3.hideModal(modal);

        document.body.style.cursor = "default"; // Remove Review

        var review = document.querySelector(".review[data-id=\"".concat(reviewID, "\"]"));
        review.parentNode.removeChild(review); //Add 'Add Review' button

        var addBtn = document.querySelector(".reviews__add");
        addBtn.classList.remove("btn--hidden");
        addBtn.setAttribute("aria-hidden", false); // If no reviews  -> add 'no review' text && remove average review text

        var reviews = document.querySelectorAll(".review");

        if (reviews.length == 0) {
          _this3.setHidden(document.querySelector(".reviews__none"), false);

          _this3.setHidden(document.querySelector(".reviews__avg"), true);
        } else {
          var average = _this3.getReviewAverage();

          document.querySelector(".reviews__avg").innerHTML = "<p>Average Review: </p> ".concat(_this3.createStars(average, true));
        }
      })["catch"](function (err) {
        console.log(err);
        document.body.style.cursor = "default";
      });
    }
  }, {
    key: "setHidden",
    value: function setHidden(ele, isHidden) {
      if (isHidden) {
        ele.classList.add("hidden");
        ele.setAttribute("aria-hidden", "true");
      } else {
        ele.classList.remove("hidden");
        ele.setAttribute("aria-hidden", "false");
      }
    }
  }, {
    key: "editReview",
    value: function editReview(e) {
      var _this4 = this;

      e.preventDefault();
      var URL = "".concat(data.root_url, "/wp-json/webblast/v1/review");
      var reviewID = e.currentTarget.dataset.review;
      var reviewData = new FormData(e.currentTarget);
      document.body.style.cursor = "wait";
      fetch(URL, {
        method: "PUT",
        headers: {
          "X-WP-Nonce": data.nonce,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "title": reviewData.get("title"),
          "content": reviewData.get("content"),
          "review_id": parseInt(reviewID),
          "star_count": parseInt(reviewData.get("stars"))
        })
      }).then(this.handleErrors).then(function (response) {
        return response.json();
      }).then(function (data) {
        // Hide Modal
        _this4.hideModal(document.querySelector(".edit")); // Redraw Review


        var review = document.querySelector(".review[data-id=\"".concat(reviewID, "\"]"));
        review.querySelector(".review__title").textContent = reviewData.get("title");
        review.querySelector(".review__content").textContent = reviewData.get("content");
        var stars = "";

        for (var i = 0; i < parseInt(reviewData.get("stars")); i++) {
          stars += "<i class=\"fa fa-star star\"></i>";
        }

        review.querySelector(".stars").innerHTML = stars;
        review.querySelector(".stars").dataset.count = parseInt(reviewData.get("stars"));

        var average = _this4.getReviewAverage();

        document.querySelector(".reviews__avg").innerHTML = "<p>Average Review: </p> ".concat(_this4.createStars(average, true)); // Reset Cursor

        document.body.style.cursor = "default";
      })["catch"](function (err) {
        console.log(err);
        document.body.style.cursor = "default";
      });
      return false;
    }
  }, {
    key: "handleErrors",
    value: function handleErrors(response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }

      return response;
    }
  }]);

  return Reviews;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Reviews);

/***/ }),

/***/ "./src/js/components/timeline.js":
/*!***************************************!*\
  !*** ./src/js/components/timeline.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Timeline = /*#__PURE__*/function () {
  function Timeline() {
    _classCallCheck(this, Timeline);

    this.events();
  }

  _createClass(Timeline, [{
    key: "events",
    value: function events() {
      var _this = this;

      var readMoreBtns = document.querySelectorAll(".timeline__more");

      if (readMoreBtns) {
        readMoreBtns.forEach(function (btn) {
          return btn.addEventListener("click", _this.showMore.bind(_this));
        });
      }
    }
  }, {
    key: "showMore",
    value: function showMore(e) {
      var event = e.currentTarget.closest(".timeline__event");
      var longText = event.querySelector(".timeline__content--long");
      var shortText = event.querySelector(".timeline__content--short");
      longText.classList.toggle("timeline__content--hide");
      shortText.classList.toggle("timeline__content--hide");
    }
  }]);

  return Timeline;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Timeline);

/***/ }),

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_favourites__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/favourites */ "./src/js/components/favourites.js");
/* harmony import */ var _components_navigation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/navigation */ "./src/js/components/navigation.js");
/* harmony import */ var _components_reviews__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/reviews */ "./src/js/components/reviews.js");
/* harmony import */ var _components_timeline__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/timeline */ "./src/js/components/timeline.js");




new _components_favourites__WEBPACK_IMPORTED_MODULE_0__["default"]();
new _components_navigation__WEBPACK_IMPORTED_MODULE_1__["default"]();
new _components_reviews__WEBPACK_IMPORTED_MODULE_2__["default"]();
new _components_timeline__WEBPACK_IMPORTED_MODULE_3__["default"]();

/***/ }),

/***/ "./src/scss/style.scss":
/*!*****************************!*\
  !*** ./src/scss/style.scss ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/dist/js/main": 0,
/******/ 			"dist/css/main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkwebblast"] = self["webpackChunkwebblast"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["dist/css/main"], () => (__webpack_require__("./src/js/main.js")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["dist/css/main"], () => (__webpack_require__("./src/scss/style.scss")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;