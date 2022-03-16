var res = [];
function getData(){
    const request = new Request(`/server?`,{method: 'GET'});
    fetch(request)
        .then(response => {
            if (response.status === 200) {
            return response.json();
            } else {
            throw new Error('Что-то пошло не так на сервере.');
            }
        })
        .then(response => {
            res = response;

            ReactDOM.render(
                <Search/>,
                document.getElementById("app")
            );
        }).catch(error => {
            console.error(error);
    });
}
//getData();
function Search(props){
    var all_filters=[];
    var all_schools =  res;
    const activ_page = 0;
    const page_size = 3;
    var [pages_list,setPages] = React.useState([[]]);

    function createPages(){
        var pages_count = Math.ceil((all_schools.length-1)/ page_size);
        var p_list = [];
        console.log(all_schools);
        console.log(all_schools.length);
        for(let i=0;i<pages_count;i++){
            var schools = all_schools;
            var page = schools.splice((i*page_size), Math.min((schools.length-(i*page_size)),page_size));
            console.log(page);
            p_list.push(page);
        }
        pages_list = p_list;
        console.log(pages_list);
        // console.log(pages_count,p_list)
    }

    React.useLayoutEffect(() => {
        console.log("a");
    },[activ_page])

    React.useLayoutEffect(() => {
        createPages();
    },[all_schools]);
    return(
        <div className="search_main_grid">
            <div className="school_elements_grid">
                <div className="selected_filters_text">{"         all_filters.join()          "}</div>
                {
                [[1,2],[3,4]][0].map((school) => <a>{school}</a>
                    /*
                var maps_href = school["maps_href"];
                var internat = school["internat"];
                    //*//*
                <SchoolElement title={
                    school["name"]} 
                    rate={school["rate"]} logo={school["logo_href"]}
                    phone={school["Phone"]} email={school["Email"]}
                    address={`${school["street"]},${school["PSC"]},${school["second_name"]}`}
                    info={school["info"]} odvetie={[]}
                    website={school["website"]} 
                    odbory={(school["Odbory"].slice(1,school["Odbory"].length)).split(";")}/>
            //*/
            )}
            </div>
            <div className="Filters">
            </div>
        </div>
    );


}
//<SchoolElement title={} rate={} logo={} phone={} email={} addassetss={}info={} odvetie={} odbory={}/>
function SchoolElement(props){
    const arrow = React.useRef(null);
    const [disp,changeDisp] = React.useState("none");
    var showInfo = function(e){
        console.log(arrow.current.style.transform);
        arrow.current.style.transform = (disp == "")? "rotate(-90deg)":"";
        changeDisp((disp == "")? "none" : "");
    }
    var openSchool = function(){
        var arr = [];
        for (var [key, value] of Object.entries(props)) arr.push(key+"="+value);
        window.location.assign(`/school?${arr.join("&")}`);
    }
    return(
        <div className={"school_element"}>
            <div className={'school_element_main_grid'}>
                <img src={""+props.logo} className={"school_element_logo"} onClick={showInfo}/>
                <div className={"school_element_title_grid"}>
                    <a className={'school_element_title'} onClick={showInfo}>{props.title}</a>
                    <a className={"school_element_rate"} onClick={showInfo}>{props.rate}</a>
                    <div style={{display:disp}}><a>{props.info}</a></div>
                </div>
                <img src="/assets/img/arrow.svg" className={"arrow-img"} ref={arrow} onClick={showInfo}/>
            </div>
            <div style={{display:disp}} className={'school_element_second_grid'}>
                <div className="school_element_info_grid">
                    <div><img src="/assets/img/phone.png"/><a>{props.phone}</a></div>
                    <div><img src="/assets/img/email.png"/><a>{props.email}</a></div>
                    <div><img src="/assets/img/location.png"/><a>{props.addassetss}</a></div>
                </div>
                <div style={{display:"flex",flexDirection:"column-reverse"}}>
                    <button onClick={openSchool} className={"school_element_button_viac"}>VIAC INFORMÁCI</button>
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
        <div className={"info_box"}>
            <div className={"info_box_title"}>{props.title}</div>
            <div className={"info_box_info_container"}>
                {props.filterList.map((el) => <div className="filter_element"><label className={"label_filter"} for={index(el)}>{el}</label><input className={"check_box_filter"} type="checkbox" id={index(el)} onClick={click}/></div>)}
            </div>
        </div>
    );
}
window.onload=getData();