var p = new URLSearchParams(document.location.search);
var res = [];

function getData(listOfListOfParams){
    var req="";
    if(listOfListOfParams!=undefined){
    for(var [key,value] in listOfListOfParams.entries()){
        var pa = `${key}=${value.join(",")}`;
    }}
    const request = new Request(`/server?${req}`,{method: 'GET'});
    fetch(request)
        .then(response => {
            if (response.status === 200) {
            return response.json();
            } else {
            throw new Error('Error');
            }
        })
        .then(response => {
            res = response;

            ReactDOM.render(
                <SearchPage />,
                document.getElementById("app")
            );
        }).catch(error => {
            console.error(error);
    });
}


function SearchPage(props){
    var all_filters=[];
    var all_schools =  res;
    const [activ_page,setActivPage] = React.useState(0)
    const page_size = 3;
    var [pages_list,setPages] = React.useState([[]]);
    var [loading,setLoading] = React.useState(true);

    //#region Filters
    var [regions_list,setRegionList] = React.useState((p.get("region")!=null)? p.get("region").split(",").map((x)=>parseInt(x)):[]);
    var [druh_list,setDruhList] = React.useState((p.get("druh")!=null)? p.get("druh").split(",").map((x)=>parseInt(x)):[]);
    var regions = React.useRef(regions_list);

    // ПЕРЕДАТЬ В ФТЛЬТРЫ ССЫЛКУ НА ЛИСТ

    React.useEffect(()=>{console.log("send to db:","region=",regions_list,"druh=",druh_list);},[regions_list,druh_list]);
    //#endregion
    var reserFilters = function(e){
        setRegionList([]);
        setDruhList([]);
    }

    function createPages(){
        var pages_count = Math.ceil((all_schools.length-1)/ page_size);
        var p_list = [];
        //console.log(all_schools);
        //console.log(all_schools.length);
        for(let i=0;i<pages_count;i++){
            var schools = Array.from(all_schools);
            var page = schools.splice((i*page_size), Math.min((all_schools.length-(i*page_size)),page_size));
            //console.log(page);
            p_list.push(page);
        }
        setPages(Array.from(p_list));
        //console.log(pages_list);
        // console.log(pages_count,p_list)
        //console.log("p0",pages_list[activ_page]);
        //console.log("p1",pages_list[activ_page][0]);
        //console.log("p2",pages_list[activ_page].map((school) => school["school_id"]))
    }
    /*
    React.useLayoutEffect(() => {
        console.log("real:",activ_page,"/",pages_list.length,"normal:",activ_page+1,"/",pages_list.length,"logic:",activ_page,"/",pages_list.length-1);
    },[activ_page]);
    //*/
    React.useEffect(() => {
        createPages();
        setLoading(false);
    },[all_schools]);

// SchoolEmlement Close after change Page
    //Loader
    React.useLayoutEffect(()=>{
        window.setTimeout(()=>{document.getElementById("loader").style.display="none"}, 500)
    },[loading]);

    return(
        <div>
            <div className="search_main_grid">
                <div className="school_elements_grid">
                    <div className="s_es_inp"><Search/></div>
                    <div className="pages">
                        <img src={"/assets/img/arrow.svg"} className={"img page_arrow"} style={{transform:"rotate(-90deg)",order:"1"}} onClick={() => {setActivPage((activ_page<pages_list.length-1)?activ_page+1:activ_page)}}/>
                        <img src={"/assets/img/arrow.svg"} className={"img page_arrow"} style={{transform:"rotate(90deg)",order:"-1"}} onClick={() => {setActivPage((activ_page>0)?activ_page-1:activ_page)}}/>
                    </div>
                    {pages_list[activ_page].map((school) => <SchoolElement title={
                        school["name"]} 
                        rate={school["rate"]} logo={school["logo_href"]}
                        phone={school["Phone"]} email={school["Email"]}
                        address={school["street"]+","+school["PSC"]+","+school["second_name"]}
                        info={school["info"]} odvetie={[]}
                        website={school["website"]} 
                        odbory={(school["Odbory"].slice(1,school["Odbory"].length)).split(";")}/>
                    )}
                </div>
                <div className={"filters_grid"}>
                    <button className="zmazat_filtre" onClick={reserFilters}>VYMAZAŤ VŠETKY FILTRE</button>
                    <FilterBox title={"FILTROVAŤ PODĽA ODBORU"} checkedList={[]} filterList={["filter 1","filter 2","filter 3","filter 4","filter 5"]} tag={"ua"}/>
                    <FilterBox title={"FILTROVAŤ PODĽA KRAJA"} checkedList={regions} filterList={["Banskobystrický kraj","Bratislavský kraj","Košický kraj","Nitriansky kraj","Prešovský kraj","Trenčiansky kraj","Trnavský kraj","Žilinský kraj"]} tag={"will"}/>
                    <FilterBox title={"FILTROVAŤ PODĽA DRUHU ŠKOLY"} checkedList={druh_list} filterList={["Gymnázium","Hotelová akadémia","Konzervatórium","Obchodná akadémia","Odborná škola","Priemyselná škola","Zdravotnícka škola","Iné"]} tag={"win"}/>
                </div>
            </div>
        </div>
    );
}
//#region Elements

//<SchoolElement title={} rate={} logo={} phone={} email={} addassetss={}info={} odvetie={} odbory={}/>
function SchoolElement(props){
    const arrow = React.useRef(null);
    const [disp,changeDisp] = React.useState("none");
    var showInfo = function(e){
        //console.log(arrow.current.style.transform);
        arrow.current.style.transform = (disp == "")? "rotate(-90deg)":"rotate(0deg)";
        changeDisp((disp == "")? "none" : "");
    }
    var openSchool = function(){
        var arr = [];
        for (var [key, value] of Object.entries(props)) arr.push(key+"="+value);
        window.location.assign(`/school?${arr.join("&")}`);
    }
    return(
        <div className={"school_element"}>
            <div className={'s_e_main_grid'}>
                <img src={props.logo} className={"s_e_logo"} onClick={showInfo}/>
                <div className={"s_e_title_grid"}>
                    <a className={'s_e_title'} onClick={showInfo}>{props.title}</a>
                    <div className={"s_e_rate_container"}><img className={"img rate-img"} src="/assets/img/star.svg"/><a className={"s_e_rate"}>{props.rate.toFixed(1)}</a></div>
                    <div style={{display:disp}}><a dangerouslySetInnerHTML={{__html: props.info}}></a></div>
                </div>
                <img src="/assets/img/arrow.svg" className={"arrow-img img"} ref={arrow} onClick={showInfo}/>
            </div>
            <div style={{display:disp}} className={'s_e_second_grid'}>
                <div className="school_element_info_grid">
                    <div className={"s_e_about_conatiner"}><img className={"img info_img"} src="/assets/img/phone.svg"/>   <a className={"about_text"}>{props.phone}</a></div>
                    <div className={"s_e_about_conatiner"}><img className={"img info_img"} src="/assets/img/email.svg"/>   <a className={"about_text"}>{props.email}</a></div>
                    <div className={"s_e_about_conatiner"}><img className={"img info_img"} src="/assets/img/location.svg"/><a className={"about_text"}>{props.address}</a></div>
                </div>
                <div style={{display:"flex",flexDirection:"column-reverse"}}>
                    <button onClick={openSchool} className={"s_e_button_viac"}>VIAC INFORMÁCI</button>
                </div>
            </div>
        </div>
    );
}
// <FilterBox title={} checkedList={} filterList={} tag={""}/>
function FilterBox(props){
    const checkedList = React.useRef(props.checkedList);
    React.useLayoutEffect(() => {    
        for(let i=0;i<checkedList.current.length;i++)
        {
            console.log(checkedList.current[i]);
            var id = checkedList.current[i]-1+props.tag;
            document.getElementById(id).checked = true;
        }
        },[]);
    var click = function(e){
        var el = props.filterList.indexOf(e.target.labels[0].innerHTML)+1;
        var is = checkedList.current.indexOf(el);
        if(is == -1) { 
            checkedList.current.push(el); 
        } else { 
            checkedList.current.splice(is, 1); 
        }
        console.log(checkedList.current);
    }
    var index = function(mes){ return(props.filterList.indexOf(mes)+props.tag); }
    return(
        <div className={"filter_box"}>
            <div className={"filter_box_title"}>{props.title}</div>
            <div className={"filter_box_info_container"}>
                {props.filterList.map((el) => <div className="filter_element">
                    <label className={"label_filter"} for={index(el)}>{el}</label>
                    <input className={"check_box_filter"} type="checkbox" id={index(el)} onClick={click}/>
                    </div>)}
            </div>
        </div>
    );
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
    var cf = {border:"var(--border-rad) solid var(--search-shadow-color)",boxShadow:"0 0 10px 1px var(--search-shadow-color)"}
    return(
        <div className={"search_container"} style={(hasFocus)?cf:c}  onClick={() => {document.getElementById('search-input').focus();}}>
            <input id={"search-input"} className={"search-input"} placeholder={"VYHLADAT SKOLU"}
            onKeyUp={searchEnter} 
            ref={ref} onFocus={() => setFocus(true)} onBlur={() => setFocus(false) }/>
            <img className={"search-img img"} src={"/assets/img/search-glass.svg"}/>
        </div>
    );
}

//#endregion [p.get("region").split(","),p.get("druh").split(",")]
console.log((p.get("region")!=null)? {"region":p.get("region").split(",")}:null);
//console.log();
window.onload=getData();