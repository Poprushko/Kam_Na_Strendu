var li = ["Banskobystrický kraj","Bratislavský kraj","Košický kraj","Nitriansky kraj","Prešovský kraj","Trenčiansky kraj","Trnavský kraj","Žilinský kraj"];
var li2 = ["Gymnázium","Hotelová akadémia","Konzervatórium","Obchodná akadémia","Odborná škola","Priemyselná škola","Zdravotnícka škola","Iné"];
function Main(props){
    return(
        <div id={"main"}>
            <div className={"page"}>
                <div class="text-p1">
                    <h1 class="text-big">Nahliadnite do svojej budúcnosti.</h1>
                    <a class=" text-small">S našou pomocou nájdete <b>strednú školu</b> podľa Vašich predstáv.</a><br/>
                    <input id="search" placeholder="VYHLADAT SKOLU"/>
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
//<SelectFilters/>
function SelectFilters(props) {
    var selectedRegion = [];
    var selectedDruh = [];
    var send = function(){
        console.log(selectedRegion.length);
        console.log(selectedDruh.length);
        window.location.assign(`/search?region=${(selectedRegion.length)?selectedRegion.join():""}&druh=${(selectedDruh.length)?selectedDruh.join():""}`);
    }
    return ( <div className={"test"}>
            <div className={'selectGridMain'}>
                <SelOpt title={"KRAJ"} list={li} clicked={selectedRegion} img={"/assets/img/mesto.png"} tag={"sqe"} dir={"row"}/>
                <SelOpt title={"DRUHY"} list={li2} clicked={selectedDruh} img={"/assets/img/kniha.png"} tag={"awd"} dir={"row-reverse"}/>
            </div>
            <button className={"buttonSearch"} onClick={send}>VYHĽADAŤ</button>
    </div>);
}
// <SelOpt title={} list={} clicked={} img={} tag={} dir={"row || row-reverse"}/>
function SelOpt(props){
    var clicked = React.useRef(props.clicked);
    var list = React.useRef(props.list);
    var index = function(mes){ return(list.current.indexOf(mes)+props.tag);}
    var onClick = function(e){
        var el = list.current.indexOf(e.target.labels[0].innerHTML)+1;
        var is = clicked.current.indexOf(el);
        (is == -1)?clicked.current.push(el):clicked.current.splice(is, 1); 
    }
    const clss = {gap:"30px",display:"flex",flexDirection:props.dir,justifyContent:"center"};
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
ReactDOM.render(
    <Main/>,
    document.getElementById("app")
);