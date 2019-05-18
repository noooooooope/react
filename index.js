"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var React = _interopRequireWildcard(_react);

var _store = require("./store");

var _store2 = _interopRequireDefault(_store);

var _reactDom = require("react-dom");

var ReactDOM = _interopRequireWildcard(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Movie App Components
 */
var MovieApp = function (_React$Component) {
    _inherits(MovieApp, _React$Component);

    function MovieApp(props) {
        _classCallCheck(this, MovieApp);

        var _this = _possibleConstructorReturn(this, (MovieApp.__proto__ || Object.getPrototypeOf(MovieApp)).call(this, props));

        _this.state = {
            currentData: [{}],
            listFag: false,
            data: _store2.default
        };
        return _this;
    }

    /**
     * 搜索
     * @private
     */


    _createClass(MovieApp, [{
        key: "__Search",
        value: function __Search() {
            var _this2 = this;

            return React.createElement(
                "div",
                { className: "container" },
                React.createElement(
                    "div",
                    { className: "row" },
                    React.createElement(
                        "div",
                        { className: "input-field col s12" },
                        React.createElement("input", { id: "search", type: "text", className: "validate" }),
                        React.createElement(
                            "label",
                            { htmlFor: "search" },
                            "search..."
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "col s12 center-align" },
                        React.createElement(
                            "button",
                            { className: "center btn blue darken-1 waves-effect", onClick: function onClick() {
                                    _this2.__searchId();
                                } },
                            " \u641C\u7D22"
                        ),
                        React.createElement(
                            "button",
                            { className: "center btn red darken-1 waves-effect", onClick: function onClick() {
                                    _this2.__reset();
                                } },
                            " \u91CD\u7F6E"
                        )
                    )
                )
            );
        }

        /**
         * 匹配搜索结果
         * @returns {boolean}
         * @private
         */

    }, {
        key: "__searchId",
        value: function __searchId() {
            var data = this.state.data;
            var name = $('#search').val();
            if (name.length <= 0 || name === "") {
                return false;
            }
            //  console.log(name);
            var findData = [];
            data.map(function (row, idx) {
                // console.log(row);
                var pattern = new RegExp(".*?" + name + ".*?", "isg");
                if (pattern.test(row["show"]["name"])) {
                    //  console.log(row);
                    findData.push(row);
                }
            });
            if (findData.length <= 0) {
                M.toast({ html: "没有找到哦！" });
                return false;
            }
            var tmp = this.state;
            tmp.currentData = findData;
            tmp.listFag = true;
            this.setState(tmp);
        }

        /**
         * 重置
         * @private
         */

    }, {
        key: "__reset",
        value: function __reset() {
            $('#search').val("");
            var tmp = this.state;
            tmp.currentData = [{}];
            tmp.listFag = false;
            this.setState(tmp);
        }

        /**
         * 渲染搜索列表
         * @returns {any[]}
         * @private
         */

    }, {
        key: "__List",
        value: function __List() {
            var data = this.state.currentData;
            return data.map(function (row, idx) {
                console.log(row);
                var url = row["show"]["image"];
                console.log(url);
                if (url === null) {
                    url = "./res/images/sorry.jpg";
                } else {
                    url = row["show"]["image"]["medium"];
                }
                return React.createElement(
                    "div",
                    { key: idx },
                    React.createElement(
                        "div",
                        { className: "col s12 m3 l2" },
                        React.createElement(
                            "div",
                            { className: "card ", key: idx },
                            React.createElement(
                                "div",
                                { className: "card-image waves-effect waves-block waves-light" },
                                React.createElement("img", { className: "activator circle responsive-img", src: url, alt: url })
                            ),
                            React.createElement(
                                "div",
                                { className: "card-content truncate" },
                                React.createElement(
                                    "span",
                                    { className: "orange-text" },
                                    "Score:",
                                    Math.ceil(row["score"])
                                ),
                                React.createElement(
                                    "span",
                                    { className: "card-title activator truncate" },
                                    row["show"]["name"]
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "card-reveal" },
                                React.createElement(
                                    "span",
                                    { className: "card-title grey-text text-darken-4" },
                                    row["show"]["name"],
                                    React.createElement("i", { className: "fa fa-close right" })
                                ),
                                React.createElement(
                                    "p",
                                    null,
                                    "runTime:",
                                    row["show"]["runtime"]
                                ),
                                React.createElement(
                                    "p",
                                    null,
                                    "premiered:",
                                    row["show"]["premiered"]
                                ),
                                React.createElement(
                                    "p",
                                    null,
                                    "language:",
                                    row["show"]["language"]
                                ),
                                React.createElement(
                                    "p",
                                    null,
                                    "rating:",
                                    row["show"]["rating"]["average"],
                                    React.createElement("i", { className: "fa fa-star" })
                                ),
                                React.createElement(
                                    "p",
                                    null,
                                    "type:",
                                    row["show"]["type"]
                                ),
                                React.createElement(
                                    "p",
                                    null,
                                    "officialSite:",
                                    row["show"]["officialSite"]
                                ),
                                React.createElement("p", { dangerouslySetInnerHTML: { __html: row["show"]["summary"] } })
                            )
                        )
                    )
                );
            });
        }

        /**
         * 导航
         * @returns {*}
         * @private
         */

    }, {
        key: "render",


        //渲染组件
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "div",
                    null,
                    " ",
                    MovieApp.__NavBar()
                ),
                React.createElement(
                    "div",
                    { className: "Search-box" },
                    this.__Search()
                ),
                React.createElement(
                    "div",
                    { className: "row List-box" },
                    this.state.listFag ? this.__List() : null
                ),
                React.createElement(
                    "div",
                    null,
                    " ",
                    MovieApp.__Footer()
                )
            );
        }
    }], [{
        key: "__NavBar",
        value: function __NavBar() {
            return React.createElement(
                "nav",
                null,
                React.createElement(
                    "div",
                    { className: "nav-wrapper blue darken-1" },
                    React.createElement(
                        "a",
                        { href: "#", className: "brand-logo" },
                        "Movies"
                    )
                )
            );
        }

        /**
         * 底部
         * @returns {*}
         * @private
         */

    }, {
        key: "__Footer",
        value: function __Footer() {
            return React.createElement(
                "footer",
                { className: "page-footer blue darken-1" },
                React.createElement(
                    "div",
                    { className: "row" },
                    React.createElement(
                        "div",
                        { className: "col l6 s12" },
                        React.createElement(
                            "p",
                            { className: "grey-text text-lighten-4" },
                            "\u5E0C\u671B\u60A8\u6709\u4E00\u4E2A\u6109\u5FEB\u7684\u4F53\u9A8C"
                        )
                    )
                ),
                React.createElement(
                    "div",
                    { className: "footer-copyright" },
                    React.createElement(
                        "div",
                        { className: "container" },
                        "\xA9 2019 Copyright",
                        React.createElement(
                            "a",
                            { className: "grey-text text-lighten-4 right", href: "#" },
                            "Movie Search "
                        )
                    )
                )
            );
        }
    }]);

    return MovieApp;
}(React.Component);

//渲染程序


ReactDOM.render(React.createElement(MovieApp, null), document.getElementById("app"));