var p = new URLSearchParams(document.location.search);
var res = [];

//#region LOAD DATA
function firstLoad(listOfListOfParams){
    var req=[];
    if(listOfListOfParams!=undefined){
    for(var key in listOfListOfParams){
        if(listOfListOfParams[key]!="")
        req.push(`${key}=${listOfListOfParams[key].join(",")}`);
    }}
    console.log(`/server?${req.join("&")}`);
    
    const request = new Request(`/server?${req.join("&")}`,{method: 'GET'});
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
            console.log(response);
            ReactDOM.render(
                <SearchPage />,
                document.getElementById("app")
            );
        }).catch(error => {
            console.error(error);
    });
}
//#endregion
/*
function getData(listOfListOfParams){
    var req=[];
    if(listOfListOfParams!=undefined){
    for(var key in listOfListOfParams){
        if(listOfListOfParams[key]!="")
        req.push(`${key}=${listOfListOfParams[key].join(",")}`);
    }}
    console.log(`/server?${req.join("&")}`); 
    const request = new Request(`/server?${req.join("&")}`,{method: 'GET'});
    fetch(request)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
            throw new Error('Error');
            }
        })
        .then(response => {
            return response;
            console.log(response);
        }).catch(error => {
            console.error(error);
    });
}
*/

function SearchPage(props){

    //#region Variables
    var all_filters=[];
    // orig_&_all_schools
    var [orig,setOrig] = React.useState(res);
    var [all_schools,setAllSchools] =  React.useState(orig);
    // ino about schools
    var [activ_page,setActivPage] = React.useState(0)
    var page_size = 15;
    var [all_schools_count,setSchoolsCount] =  React.useState(all_schools.length);
    // schools
    var [pages_list,setPages] = React.useState([[]]);
    // state
    var [noneSchool,setNonSchool] = React.useState(false)
    var [loading,setLoading] = React.useState(true);
    // Filters
    var [regions_list,setRegionList] = React.useState((p.get("region")!=null)? p.get("region").split(",").map((x)=>parseInt(x)):[]);
    var [druh_list,setDruhList] = React.useState((p.get("druh")!=null)? p.get("druh").split(",").map((x)=>parseInt(x)):[]);
    //#endregion Variables

    //#region GET_DATA_FROM_DB
    function getData(listOfListOfParams){
        var req=[];
        if(listOfListOfParams!=undefined){
        for(var key in listOfListOfParams){
            if(listOfListOfParams[key]!="")
            req.push(`${key}=${listOfListOfParams[key].join(",")}`);
        }}
        //console.log(`/server?${req.join("&")}`); 
        const request = new Request(`/server?${req.join("&")}`,{method: 'GET'});
        fetch(request)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
            throw new Error('Error');
            }
        })
        .then(response => {
            //console.log(response);
            setOrig(response);
        }).catch(error => {
            console.error(error);
    });
    }
    //#endregion

    //#region Filters

        //OnChangeFilters

    React.useLayoutEffect(()=>{
        // setLoading(true);
        getData({"region_id":regions_list,"druh_id":druh_list});
    },[regions_list,druh_list]);

        //ResetFilters

    var resetFilters = function(e){
        history.replaceState(null, document.title, "?");
        document.getElementById("search-input").value="";
        setNonSchool(false);
        setRegionList([]);
        setDruhList([]);
        setAllSchools(orig);
    }
        
    //#endregion Filters

    //#region Sort

        // Insert search input

    React.useLayoutEffect(()=>{
        if(p.get("s")!=null){
            document.getElementById("search-input").value = p.get("s");
        }
    },[]);

        // filter

    function filterAllSchools(value){
        //console.log(value.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").replace(/\s/g, ''));
        if(value.replace(/\s/g, '') != ""){
            var filtered_list  = orig.filter((el)=>{
                //console.log(el["name"].toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").replace(/\s/g, ''),value.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").replace(/\s/g, ''));
                //console.log(el["name"].toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").replace(/\s/g, '').search(value.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").replace(/\s/g, ''))!== -1);
                return el["name"].toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").replace(/\s/g, '').search(value.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").replace(/\s/g, '')) !== -1;
            });
            //console.log(filtered_list,filtered_list.length);
            //console.log(filtered_list.length,(filtered_list.length)?"aa":"bb");
            if(filtered_list.length) {
                setNonSchool(false);
                return filtered_list;
            }else {
                setNonSchool(true);
                return orig;
            }
        }else{
            setNonSchool(false);
            return orig;
        }
    }
    //#endregion Sort
    
    //#region createPages
    function createPages(){
        setActivPage(0);
        var filtered_schools = filterAllSchools(document.getElementById("search-input").value);
        setSchoolsCount(filtered_schools.length);
        //console.log(filtered_schools);
        //console.log("schCount:"+all_schools_count);
        var pages_count = Math.ceil((filtered_schools.length)/ page_size);
        var p_list = [];
        //console.log(all_schools);
        //console.log(all_schools.length);
        for(let i=0;i<pages_count;i++){
            var schools = Array.from(filtered_schools);
            var page = schools.splice((i*page_size), Math.min((filtered_schools.length-(i*page_size)),page_size));
            //console.log(page);
            p_list.push(page);
        }
        //console.log("disp");
        setPages(Array.from(p_list));
        setLoading(false);
        //#region debug
        //console.log(pages_list);
        // console.log(pages_count,p_list)
        //console.log("p0",pages_list[activ_page]);
        //console.log("p1",pages_list[activ_page][0]);
        //console.log("p2",pages_list[activ_page].map((school) => school["school_id"]))
        //#endregion
    }

    React.useEffect(()=>{
        createPages()
    },[orig]);
    //#endregion

    //                                                  SchoolEmlement Close after change Page

    var searchOnChange = function(e){
        createPages();
        var queryParams = new URLSearchParams(document.location.search);
        //console.log(queryParams);
        queryParams.set("s", e.target.value.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").replace(/\s/g, ''));
        history.replaceState(null, document.title, "?"+queryParams.toString());
    }
    
    //#region LOADER
    React.useLayoutEffect(()=>{
        if (loading){
            document.getElementById("loader").style.display="";
        }else{
            window.setTimeout(()=>{document.getElementById("loader").style.display="none"}, 400)
        }
    },[loading]);
    //#endregion

    return(
        <div>
            <div className="search_main_grid">
                <div className="school_elements_grid">
                    
                    <div className="s_es_inp">
                        <SearchSort searchOnChange={searchOnChange}startVal={(p.get("s")!=null)? p.get("s"):""}/>
                        <div>
                            Page:{activ_page+1}/{(!noneSchool)?pages_list.length:1}<br/>Schools count:{(!noneSchool)?all_schools_count:0}
                        </div>
                        <img src={"/assets/img/arrow.svg"} className={"img page_arrow"} style={{transform:"rotate(-90deg)",order:"3"}} onClick={() => {setActivPage((!noneSchool)?((activ_page<pages_list.length-1)?activ_page+1:activ_page):0)}}/>
                        <img src={"/assets/img/arrow.svg"} className={"img page_arrow"} style={{transform:"rotate(90deg)",order:"2"}} onClick={() => {setActivPage((!noneSchool)?((activ_page>0)?activ_page-1:activ_page):0)}}/>
                    </div>

                    {(!noneSchool)?pages_list[activ_page].map((school) => <SchoolElement title={
                        school["name"]} 
                        rate={school["rate"]} logo={school["logo_href"]}
                        phone={school["Phone"]} email={school["Email"]}
                        address={(school["PSC"]!="")?(school["street"]+","+school["PSC"]+","+school["second_name"]):(school["street"]+","+school["second_name"])}
                        info={school["info"]} odvetie={(school["chategory"].slice(1,school["chategory"].length)).split(";")}
                        website={school["website"]} maps={school["maps_href"]}
                        odbory={(school["Odbory"].slice(1,school["Odbory"].length)).split(";")}/>
                    ):<div className="noneSchool">None Schools</div>}

                    <div className="pages">
                        <img src={"/assets/img/arrow.svg"} className={"img page_arrow"} style={{transform:"rotate(-90deg)",order:"1"}} onClick={() => {setActivPage((!noneSchool)?((activ_page<pages_list.length-1)?activ_page+1:activ_page):0)}}/>
                        <img src={"/assets/img/arrow.svg"} className={"img page_arrow"} style={{transform:"rotate(90deg)",order:"-1"}} onClick={() => {setActivPage((!noneSchool)?((activ_page>0)?activ_page-1:activ_page):0)}}/>
                    </div>

                </div>

                <div className={"filters_grid"}>

                    <button className="zmazat_filtre" onClick={resetFilters}>VYMAZAŤ VŠETKY FILTRE</button>
                    {/* <FilterBox title={"FILTROVAŤ PODĽA ODBORU"} checkedList={[]} filterList={["filter 1","filter 2","filter 3","filter 4","filter 5"]} tag={"ua"}/> */}
                    <FilterBox title={"FILTROVAŤ PODĽA KRAJA"} checkedList={regions_list} setCheckedList={setRegionList} filterList={["Banskobystrický kraj","Bratislavský kraj","Košický kraj","Nitriansky kraj","Prešovský kraj","Trenčiansky kraj","Trnavský kraj","Žilinský kraj"]} tag={"will"}/>
                    <FilterBox title={"FILTROVAŤ PODĽA TYPOV ŠKOLY"} checkedList={druh_list} setCheckedList={setDruhList} filterList={["Gymnázium","Hotelová akadémia","Konzervatórium","Obchodná akadémia","Odborná škola","Priemyselná škola","Zdravotnícka škola","Iné"]} tag={"win"}/>
                
                </div>
            
            </div>
        </div>
    );
}

//#region Elements

    //#region SchoolElement
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
                <div className={'s_e_main_grid'} onClick={showInfo}>
                    <img src={props.logo} className={"s_e_logo"}/>
                    <div className={"s_e_title_grid"}>
                        <a className={'s_e_title'}>{props.title}</a>
                        <div className={"s_e_rate_container"}><img className={"img rate-img"} src="/assets/img/star.svg"/><a className={"s_e_rate"}>{props.rate.toFixed(1)}</a></div>
                    </div>
                    <img src="/assets/img/arrow.svg" className={"arrow-img img"} ref={arrow}/>
                </div>
                <div style={{display:disp}} >
                    <div style={{display:disp}}><a dangerouslySetInnerHTML={{__html: props.info}}></a></div>
                    <div className={'s_e_second_grid'}>
                        <div className="school_element_info_grid">
                            <div onClick={()=>{window.open("tel:"+props.phone)}} className={"s_e_about_conatiner"}><img className={"img info_img"} src="/assets/img/phone.svg"/>   <a className={"about_text"}>{props.phone}</a></div>
                            <div onClick={()=>{window.open("mailto:"+props.email)}}className={"s_e_about_conatiner"}><img className={"img info_img"} src="/assets/img/email.svg"/>   <a className={"about_text"}>{props.email}</a></div>
                            <div onClick={()=>{window.open(props.maps)}}className={"s_e_about_conatiner"}><img className={"img info_img"} src="/assets/img/location.svg"/><a className={"about_text"}>{props.address}</a></div>
                        </div>
                        <div style={{display:"flex",flexDirection:"column-reverse"}}>
                            <button onClick={openSchool} className={"s_e_button_viac"}>VIAC INFORMÁCI</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    //#endregion

    //#region FilterBox 
    // <FilterBox title={} checkedList={} setCheckedList={} filterList={} tag={""}/>
    function FilterBox(props){
        const checkedList = props.checkedList;
        React.useLayoutEffect(() => {    
            for(let i=0;i<props.filterList.length;i++){
                if(checkedList.indexOf(i+1)!=-1)
                {
                    document.getElementById(i+props.tag).checked = true;
                }else{
                    document.getElementById(i+props.tag).checked = false;
                }
            }
            },[checkedList]);
        var click = function(e){
            e.target.firstChild.checked = (e.target.firstChild.checked)?false:true;
            var el = props.filterList.indexOf(e.target.firstChild.labels[0].innerHTML)+1;
            var is = checkedList.indexOf(el); 
            if(is == -1) { 
                checkedList.push(el);
                props.setCheckedList(Array.from(checkedList));//checkedList.push(el); //
            } else { 
                checkedList.splice(is,1)
                props.setCheckedList(Array.from(checkedList));//checkedList.splice(is, 1); //
            }
            //console.log(checkedList);
        }
        // var click = function(e){
        //     var el = props.filterList.indexOf(e.target.labels[0].innerHTML)+1;
        //     var is = checkedList.indexOf(el); 
        //     if(is == -1) { 
        //         checkedList.push(el);
        //         props.setCheckedList(Array.from(checkedList));//checkedList.push(el); //
        //     } else { 
        //         checkedList.splice(is,1)
        //         props.setCheckedList(Array.from(checkedList));//checkedList.splice(is, 1); //
        //     }
        //     //console.log(checkedList);
        // }
        var index = function(mes){ return(props.filterList.indexOf(mes)+props.tag); }
        return(
            <div className={"filter_box"}>
                <div className={"filter_box_title"}>{props.title}</div>
                <div className={"filter_box_info_container"}>
                    {props.filterList.map((el) => <div className="filter_element" onClick={click}>
                        <input className={"check_box_filter"} type="checkbox" id={index(el)} /*onClick={click}*//>
                        <label className={"label_filter"} for={index(el)}>{el}</label>
                    </div>)}
                </div>
            </div>
        );
    }
    //#endregion

    //#region Search
// <Search searchEnter={Enter funtion} searchOnCanhe{}/>
function SearchSort(props){

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
            onKeyUp={props.searchEnter} onChange={props.searchOnChange}
            ref={ref} onFocus={() => setFocus(true)} onBlur={() => setFocus(false) }/>
            <img className={"search-img img"} src={"/assets/img/search-glass.svg"}/>
        </div>
    );
}
//#endregion

//#endregion

window.onload=firstLoad();

//console.log((p.get("region")!=null)? {"region":p.get("region").split(",")}:null);