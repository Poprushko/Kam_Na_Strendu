function Theme(props){
    var prefers_theme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const [dark, changeTheme] = React.useState(prefers_theme);
    const [uChange,userChange] = React.useState(false);
    const theme = React.useRef(document.getElementById("themeLink"));
    const logo = React.useRef(document.getElementById("logo"));
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
        <img src={"/assets/img/theme.svg"} className={"theme_switch"} onClick={click} ref={themeSwitch}/>
    );
}
ReactDOM.render(
    <Theme/>,
    document.getElementById("bar")
);