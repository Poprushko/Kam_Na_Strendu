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
    const page = 0;
    const page_size = 6;

    function createPages(){
        var pages_count = Math.ceil(all_schools.length / page_size);
        var pages_list = [];
        for(let i=0;i<pages_count;i++){
            var schools = all_schools;
            var page = schools.splice((i*page_size), Math.min((((i+1)*12)-all_schools.length),page_size))
            pages_list.push([page]);
        }
        console.log(pages_count,pages_list)
    }
    React.useLayoutEffect(() => {
        console.log("aaaaa");
    },[page])
    createPages();
    React.useLayoutEffect(() => {

    },[page]);
    return(
        <div>
            <div className={"bar"}>
                <img id="logo" src={"/assets/img/logo.svg"}/>
                <input id={"search"} className={"search"} placeholder={"VYHLADAT SKOLU"}/>
                <div id={"bar"}></div>
            </div>
            <div className="search_main_grid">
                <div className="school_elements_grid">
                    <div className="selected_filters_text">{"         all_filters.join()          "}</div>
                    {pages_list[0].map((message) =>{
                    var school = schools[school_index];
                    var address = `${school["street"]},${school["PSC"]},${school["second_name"]}`;
                    var phone = school["Phone"];
                    var email = school["Email"];
                    var maps_href = school["maps_href"];
                    var website = school["website"];
                    var name = school["name"];
                    var info = school["info"];
                    var rate = school["rate"]
                    var logo = school["logo_href"]
                    var internat = school["internat"];
                    var odbory = (school["Odbory"].slice(1,school["Odbory"].length)).split(";");

                    //<SchoolElement title={} rate={} logo={} phone={} email={} addassetss={}info={} odvetie={} odbory={}/>
                })}
                </div>
                <div className="Filters">
                </div>
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