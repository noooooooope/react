import * as React from "react";
import initData from './store';
import * as ReactDOM from "react-dom";

/**
 * Movie App Components
 */
class MovieApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentData: [{}],
            listFag: false,
            data: initData
        }
    }

    /**
     * 搜索
     * @private
     */
    __Search() {
        return (
            <div className="container">
                <div className="row">
                    <div className="input-field col s12">
                        <input id="search" type="text" className="validate"/>
                        <label htmlFor="search">search...</label>
                    </div>
                    <div className="col s12 center-align">
                        <button className="center btn blue darken-1 waves-effect" onClick={() => {
                            this.__searchId()
                        }}> 搜索
                        </button>
                        <button className="center btn red darken-1 waves-effect" onClick={() => {
                            this.__reset()
                        }}> 重置
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    /**
    
     * @returns {boolean}
     * @private
     */
    __searchId() {
        let data = this.state.data;
        let name = $('#search').val();
        if(name.length <= 0 || name === ""){
            return false
        }
      //  console.log(name);
        let findData = [];
        data.map((row, idx) => {
           // console.log(row);
            let pattern = new RegExp(".*?" + name + ".*?","isg");
            if (pattern.test(row["show"]["name"])) {
              //  console.log(row);
                findData.push(row)
            }
        });
        if (findData.length <= 0) {
            M.toast({html: "没有找到哦！"});
            return false;
        }
        let tmp = this.state;
        tmp.currentData = findData;
        tmp.listFag = true;
        this.setState(tmp);
    }

    /**
     * 重置
     * @private
     */
    __reset() {
        $('#search').val("");
        let tmp = this.state;
        tmp.currentData = [{}];
        tmp.listFag = false;
        this.setState(tmp);

    }

    /**
     * 渲染搜索列表
     * @returns {any[]}
     * @private
     */
    __List() {
        let data = this.state.currentData;
        return (
            data.map((row, idx) => {
                console.log(row);
                let url = row["show"]["image"];
                console.log(url);
                if (url === null) {
                    url = "./res/images/sorry.jpg"
                } else {
                    url = row["show"]["image"]["medium"]
                }
                return (
                   <div  key={idx}>
                       <div className="col s12 m3 l2">
                           <div className="card " key={idx}>
                               <div className="card-image waves-effect waves-block waves-light">
                                   <img  className="activator circle responsive-img" src={url} alt={url}/>
                               </div>
                               <div className="card-content truncate">

                                   <span className="orange-text">Score:{Math.ceil(row["score"])}</span>
                                   <span className="card-title activator truncate">{row["show"]["name"]}
                                      </span>
                               </div>
                               <div className="card-reveal">
                            <span className="card-title grey-text text-darken-4">{row["show"]["name"]}
                                <i className="fa fa-close right"/>
                            </span>
                                   <p>runTime:{row["show"]["runtime"]}</p>
                                   <p>premiered:{row["show"]["premiered"]}</p>
                                   <p>language:{row["show"]["language"]}</p>
                                   <p>rating:{row["show"]["rating"]["average"]}<i  className="fa fa-star"/></p>
                                   <p>type:{row["show"]["type"]}</p>
                                   <p>officialSite:{row["show"]["officialSite"]}</p>
                                   <p dangerouslySetInnerHTML={{__html:row["show"]["summary"]}}/>
                               </div>
                           </div>
                       </div>
                   </div>
                )
            })
        )
    }

    /**
     * 导航
     * @returns {*}
     * @private
     */
    static __NavBar() {
        return (
            <nav>
                <div className="nav-wrapper blue darken-1">
                    <a href="#" className="brand-logo">Movies</a>
                </div>
            </nav>
        )
    }

    /**
     * 底部
     * @returns {*}
     * @private
     */
    static __Footer() {
        return (
            <footer className="page-footer blue darken-1">
                    <div className="row">
                        <div className="col l6 s12">
                            <p className="grey-text text-lighten-4">希望您有一个愉快的体验</p>
                        </div>
                    </div>
                <div className="footer-copyright">
                    <div className="container">
                        © 2019 Copyright
                        <a className="grey-text text-lighten-4 right" href="#">Movie Search </a>
                    </div>
                </div>
            </footer>
        )
    }

    //
    render() {
        return (
            <div>
                <div> {MovieApp.__NavBar()}</div>
                <div className="Search-box">{this.__Search()}</div>
                <div className="row List-box">{this.state.listFag ? this.__List() : null}</div>
                <div> {MovieApp.__Footer()}</div>
            </div>

        )
    }
}

//
ReactDOM.render(<MovieApp/>, document.getElementById("app"));