function Theme(props){
    var script_tag = document.getElementById('bar_script')
    console.log(script_tag.getAttribute("search-display"));
    var search_display = (script_tag.getAttribute("search-display")==null)?true:parseInt(script_tag.getAttribute("search-display"));

    var prefers_theme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const [dark, changeTheme] = React.useState(prefers_theme);
    const [uChange,userChange] = React.useState(false);
    const theme = React.useRef(document.getElementById("themeLink"));
    const logo = React.useRef();
    const themeSwitch = React.useRef(null);
    
    function SetDark(){
        theme.current.href="/assets/css/_dark_theme.css";
        themeSwitch.current.style.filter="invert(100%)";
        logo.current.src="/assets/img/logo_dark.svg";
    }
    function SetLight(){
        theme.current.href="/assets/css/_light_theme.css";
        themeSwitch.current.style.filter="";
        logo.current.src="/assets/img/logo.svg";
    }
    React.useLayoutEffect(() => {
        if(!uChange){
            if(dark){
                SetDark();
            }else{
                SetLight();
            }
        }
      },[dark]);
    var click = function(e){
        userChange(true);
        (themeSwitch.current.style.filter == "invert(100%)")? SetLight():SetDark();
    }
    return(
        <div className={"bar"}>
            <img id={"logo"} src={"/assets/img/logo.svg"} ref={logo}/>
            {(search_display)?<div className={"search_container"}>
                <input className={"search-input"} placeholder={"VYHLADAT SKOLU"}/>
                <img className={"search-input-img img"} src={"/assets/img/search-glass.svg"}/>
            </div>:<div></div>}
            <img src={"/assets/img/theme.svg"} className={"theme_switch"} onClick={click} ref={themeSwitch}/>
        </div>
    );
}

ReactDOM.render(
    <Theme/>,
    document.getElementById("main_bar")
);