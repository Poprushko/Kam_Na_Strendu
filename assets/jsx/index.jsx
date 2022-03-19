var kraj = ["Banskobystrický kraj","Bratislavský kraj","Košický kraj","Nitriansky kraj","Prešovský kraj","Trenčiansky kraj","Trnavský kraj","Žilinský kraj"];
var druh = ["Gymnázium","Hotelová akadémia","Konzervatórium","Obchodná akadémia","Odborná škola","Priemyselná škola","Zdravotnícka škola","Iné"];
function Main(props){
    var searchOnClick = function(e){
        if (e.keyCode === 13 && e.target.value!="") {
            console.log(e.target.value);
        }
    }
    // LOADER
    React.useLayoutEffect(()=>{window.setTimeout(()=>{document.getElementById("loader").style.display="none"}, 400)},[]);
    return(
        <div id={"main"}>
            <div className={"page"}>
                <div class="text-p1">
                    <h1 class="text-big">Nahliadnite do svojej budúcnosti.</h1>
                    <a class=" text-small">S našou pomocou nájdete <b>strednú školu</b> podľa Vašich predstáv.</a><br/>
                    <Search searchEnter={searchOnClick}/>
                </div>
                <img src="/assets/img/man.png" id="man"></img>
            </div>

            <div className={"page"} id={"page2"}>

                <div class="text-p2">
                    <h1 class="text-big">Hľadajte školu podľa Vašich preferencií.</h1>
                </div>
                <SelectFilters/>
            </div>

            <div className={"page"}>
                <div id="Top_3_Schools"></div>
            </div>
        </div>
    );
}
//#region Elements

//<SelectFilters/>
function SelectFilters(props) {
    var selectedRegion = [];
    var selectedDruh = [];
    var send = function(){
        window.location.assign(`/search?${(selectedRegion.length)?"region="+selectedRegion.join():""}${(selectedRegion.length&&selectedDruh.length)?"&":""}${(selectedDruh.length)?"druh="+selectedDruh.join():""}`);
    }
    return ( <div className={"test"}>
            <div className={'selectGridMain'}>
                <SelOpt title={"KRAJ"} list={kraj} clicked={selectedRegion} img={"/assets/img/mesto.png"} tag={"sqe"} dir={"row"}/>
                <SelOpt title={"DRUHY"} list={druh} clicked={selectedDruh} img={"/assets/img/kniha.png"} tag={"awd"} dir={"row-reverse"}/>
            </div>
            <button className={"buttonSearch"} onClick={send}>VYHĽADAŤ</button>
    </div>);
}
// <SelOpt title={} list={} clicked={} img={} tag={} dir={"row || row-reverse"}/>
function SelOpt(props){
    //                                                              document.getElementById("myButton").focus({preventScroll:false});
    var clicked = React.useRef(props.clicked);
    var list = React.useRef(props.list);
    var index = function(mes){ return(list.current.indexOf(mes)+props.tag);}
    var onClick = function(e){
        var el = list.current.indexOf(e.target.labels[0].innerHTML)+1;
        var is = clicked.current.indexOf(el);
        (is == -1)?clicked.current.push(el):clicked.current.splice(is, 1); 
    }
    const clss = {gap:"30px",display:"flex",flexDirection:props.dir,justifyContent:"center"};
    //       SET onclick to div
    return(
    <div style={clss}>
        <img src={props.img} className={"img"}/>
        <div className={'selectItem'}>
            <a className={'contTitle'}>{props.title}</a>
            <div className={'selectGrid'}>
                {list.current.map((message) => <div className={"text-element"}><input onClick={onClick} type="checkbox" id={index(message)}/><label for={index(message)} className={'elToSel noselect'}>{message}</label></div>)}
            </div>
        </div>
    </div>);
}
// <Search searchEnter={Enter funtion}/>
function Search(props){

    const ref = React.useRef();
    const [hasFocus, setFocus] = React.useState(false);

    React.useEffect(() => {
        if (document.hasFocus() && ref.current.contains(document.activeElement)) {
          setFocus(true);
        }
      }, []);
    
    var c = {border:"var(--border-rad) solid var(--border-color)"}
    var cf = {border:"var(--border-rad) solid var(--border-color)",boxShadow:"0 0 10px 1px var(--search-shadow-color)"}
    return(
        <div className={"search_container"} style={(hasFocus)?cf:c}  onClick={() => {document.getElementById('search-input').focus();}}>
            <input id={"search-input"} className={"search-input"} placeholder={"VYHLADAT SKOLU"}
            onKeyUp={props.searchEnter} 
            ref={ref} onFocus={() => setFocus(true)} onBlur={() => setFocus(false) }/>
            <img className={"search-img img"} src={"/assets/img/search-glass.svg"}/>
        </div>
    );
}
//#endregion

ReactDOM.render(
    <Main/>,
    document.getElementById("app")
);