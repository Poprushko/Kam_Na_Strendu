function Theme(props){
    // search_display
    var script_tag = document.getElementById('bar_script')
    var search_display = (script_tag.getAttribute("search-display")==null)?true:parseInt(script_tag.getAttribute("search-display"));

    var prefers_theme = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const [dark, changeTheme] = React.useState((getCookie("KrokVpredPrefTheme")!="")?((getCookie("KrokVpredPrefTheme")=="true")?true:false):prefers_theme);
    const [activ_dark_theme, setActivTheme] = React.useState(prefers_theme);
    // useRef
    const theme = React.useRef(document.getElementById("themeLink"));
    const logo = React.useRef();
    const themeSwitch = React.useRef(null);
    
    //#region OnClick 
    // Logo
    var openMainPage = function(e){
        window.location.assign("/");
    }
    
    // Search
    var searchOnClick = function(e){
        var val;
        if (e.keyCode === 13 && val!="") {
            window.location.assign(`search?s=${val}`);
        }
    }
    //#endregion

    //#region Themes
    function SetDark(){
        if(!prefers_theme||!activ_dark_theme){
            //console.log("dark",prefers_theme,dark,activ_dark_theme)
            setActivTheme(true);
            setCookie(true);
            theme.current.href="/assets/css/_dark_theme.css";
        }
        themeSwitch.current.style.filter="invert(100%)";
        logo.current.src="/assets/img/logo_dark.svg";
    }
    function SetLight(){
        if(prefers_theme||activ_dark_theme){
            //console.log("light",prefers_theme,dark,activ_dark_theme)
            setActivTheme(false);
            setCookie(false);
            theme.current.href="/assets/css/_light_theme.css";
        }
        themeSwitch.current.style.filter="";
        logo.current.src="/assets/img/logo.svg";
    }

    React.useLayoutEffect(() => {
        if(dark){
            SetDark();
        }else{
            SetLight();
        }
    },[dark]);
    var switchTheme = function(e){
        (themeSwitch.current.style.filter == "invert(100%)")? changeTheme(false):changeTheme(true);
    }
    //#endregion

    //#region Cookie
    function setCookie(cvalue) {
        const d = new Date();
        d.setTime(d.getTime() + (365*24*60*60*1000));
        let expires = "expires="+ d.toUTCString();
        document.cookie = "KrokVpredPrefTheme" + "=" + `${cvalue}` + ";" + expires + ";path=/";
    }
    function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
    }
    //#endregion Cookie
    return(
        <div className={"bar"}>
            <img id={"logo"} src={"/assets/img/logo.svg"} ref={logo} onClick={openMainPage}/>
            {(search_display)?
            <Search searchEnter={searchOnClick}/>
            :<div></div>}
            <img src={"/assets/img/theme.svg"} className={"theme_switch"} onClick={switchTheme} ref={themeSwitch}/>
        </div>
    );
}

function Search(props){
    //React.useEffect(()=>{console.log()},[hasFocus]);
    const ref = React.useRef();
    const [hasFocus, setFocus] = React.useState(false);

    React.useEffect(() => {
        if (document.hasFocus() && ref.current.contains(document.activeElement)) {
          setFocus(true);
        }
      }, []);
    
    var c = {border:"var(--border-rad) solid var(--border-color)"}
    var cf = {border:"var(--border-rad) solid var(--border-color)",boxShadow:"0 0 10px var(--search-shadow-color)"}
    return(
        <div className={"search_container"} style={(hasFocus)?cf:c}  onClick={() => {document.getElementById('search-input').focus();}}>
            <input id={"search-input"} className={"search-input"} placeholder={"VYHLADAT SKOLU"}
            onKeyUp={props.searchEnter} 
            ref={ref} onFocus={() => setFocus(true)} onBlur={() => setFocus(false) }/>
            <img className={"search-img img"} src={"/assets/img/search-glass.svg"}/>
        </div>
    );
}
ReactDOM.render(
    <Theme/>,
    document.getElementById("main_bar")
);