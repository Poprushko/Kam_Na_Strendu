function Theme(props){
    // search_display
    var script_tag = document.getElementById('bar_script')
    var search_display = (script_tag.getAttribute("search-display")==null)?true:parseInt(script_tag.getAttribute("search-display"));

    var prefers_theme = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const [dark, changeTheme] = React.useState(prefers_theme);
    const [activ_dark_theme, setActivTheme] = React.useState(prefers_theme);
    const [uChange,userChange] = React.useState(false);
    // useRef
    const theme = React.useRef(document.getElementById("themeLink"));
    const logo = React.useRef();
    const themeSwitch = React.useRef(null);

    //#region OnClick 
    // Search
    var searchOnClick=function(e){
        if (e.keyCode === 13) {
            e.preventDefault();
            console.log(e.target.value);
           }
    }
    // Logo
    var openMainPage = function(e){
        window.location.assign("/");
    }
    //#endregion
    
    // Input Focus Search
    //*
    var searchOnClick = function(e){
        if (e.keyCode === 13 && e.target.value!="") {
            console.log(e.target.value);
           }
    }
    //*/

    //#region Themes
    function SetDark(){
        if(!prefers_theme||!activ_dark_theme){
            //console.log("dark",prefers_theme,dark,activ_dark_theme)
            setActivTheme(true);
            theme.current.href="/assets/css/_dark_theme.css";
        }
        themeSwitch.current.style.filter="invert(100%)";
        logo.current.src="/assets/img/logo_dark.svg";
    }
    function SetLight(){
        if(prefers_theme||activ_dark_theme){
            //console.log("light",prefers_theme,dark,activ_dark_theme)
            setActivTheme(false);
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
        userChange(true);
        (themeSwitch.current.style.filter == "invert(100%)")? changeTheme(false):changeTheme(true);
    }
    //#endregion
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