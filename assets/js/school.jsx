function SchoolElement(props){
    const arrow = React.useRef(null);
    const [disp,changeDisp] = React.useState("none");
    var showInfo = function(e){
        console.log(arrow.current.style.transform);
        arrow.current.style.transform = (disp == "")? "rotate(-90deg)":"rotate(0deg)";
        changeDisp((disp == "")? "none" : "");
    }
    var openSchool = function(){
        var arr = [];
        for (var [key, value] of Object.entries(props)) arr.push(key+"="+value);
        window.location.assign(`http://127.0.0.1/school?${arr.join("&")}`);
    }
    return(
        <div className={"school_element"}>
            <div className={'school_element_main_grid'} onClick={showInfo}>
                <img src={"http://127.0.0.1"+props.logo} className={"school_element_logo"}/>
                <div className={"school_element_title_grid"}>
                    <a className={'school_element_title'}>{props.title}</a>
                    <a className={"school_element_rate"}>{props.rate}</a>
                    <div style={{display:disp}}><a>{props.info}</a></div>
                </div>
                <img src="http://127.0.0.1/res/img/arrow.svg" className={"arrow-img"} ref={arrow}/>
            </div>
            <div style={{display:disp}} className={'school_element_second_grid'}>
                <div className="school_element_info_grid">
                    <div><img src="http://127.0.0.1/res/img/PPPPPP"/><a>{props.phone}</a></div>
                    <div><img src="http://127.0.0.1/res/img/PPPPPP"/><a>{props.email}</a></div>
                    <div><img src="http://127.0.0.1/res/img/PPPPPP"/><a>{props.address}</a></div>
                </div>
                <div style={{display:"flex",flexDirection:"column-reverse"}}>
                    <button onClick={openSchool} className={"school_element_button_viac"}>VIAC INFORMÁCI</button>
                </div>
            </div>
        </div>
    );
}
ReactDOM.render(
    <div>
    <SchoolElement title="Skool Title" rate="5.0" logo="/res/img/school_logo_1.png" phone="+380501901509" email="Google@gmail.com" address="Kosice ebanij veter 59a"info="awdaeadiahdaesufhasuapdko"/>
    <SchoolElement title="Skool Titlekool Titlekool Titlekool Titlekool Titlekool Titlekool Titlekool Titlekool Titlekool Titlekool Titlekool Titlekool Titlekool Titlekool Titlekool Titlekool Titlekool Titlekool Titlekool Titlekool Titlekool Titlekool Titlekool Titlekool Titlekool Titlekool Titlekool Titlekool Title" rate="5.0" logo="/res/img/school_logo_1.png" phone="+380501901509" email="Google@gmail.com" address="Kosice ebanij veter 59a"info="awdaeadiahdaesufhasuapdkoawdaeadiahdaesufhasuapdkoawdaeadiahdaesufhasuapdkoawdaeadiahdaesufhasuapdkoawdaeadiahdaesufhasuapdkoawdaeadiahdaesufhasuapdk"/>
    </div>,
    document.getElementById("el")
)