var p = new URLSearchParams(document.location.search);
//import { InfoBox } from '/assets/jsx/components/infobox';
function InfoBox(props){
    return(
        <div className={"info_box"}>
            <div className={"info_box_title"}>{props.title}</div>
            <div className={"info_box_info_container"}>
                {props.info.map((message) => <a className={"info_box_info"}>-{message}</a>)}
            </div>
        </div>
    );
}
function AboutSchool(props){
    //window.history.pushState({}, document.title, "/" + "");
    React.useEffect(() => { document.title = props.name; },[]);
    // LOADER
    React.useLayoutEffect(()=>{window.setTimeout(()=>{document.getElementById("loader").style.display="none"}, 1000)},[]);
    return (
        <div>
            <div className={'school_title_main_grid'}>
                <img src={props.logo} className={"school_element_logo"}/>
                <div className={"school_title_info_grid "}>
                    <div>
                        <a className={"school_title_info_name"}>{props.name}</a>
                        <div className={"school_title_info_rate"}><img className={"img"} src="/assets/img/star.svg"/><a>{props.rate}</a></div>
                        <div className={"school_title_info_contact_grid"}>
                            <div className={"school_title_info_contact_container"}><img className={"img"} src="/assets/img/phone.svg"/><a>{"+"+props.phone.replace(' ','')}</a></div>
                            <div className={"school_title_info_contact_container"}><img className={"img"} src="/assets/img/email.svg"/><a>{props.email}</a></div>
                            <div className={"school_title_info_contact_container"}><img className={"img"} src="/assets/img/location.svg"/><a>{props.address}</a></div>      
                        </div>
                    </div>
                </div>
            </div>

            <div className={"school_about_flex"}>
            <div className={"school_about_info"} dangerouslySetInnerHTML={{__html: props.info}}></div>
            <div className={"school_info"}>
                <InfoBox title={"ŠTUDIJNÉ ODBORY"} info={props.odbory} />
                <InfoBox title={"ODVETIE"} info={props.odvetie} />
            </div>
            </div>

            <a className={"school_info_website"}>{props.website}</a>

        </div>
    );
    
}
ReactDOM.render(
    //title logo phone email address info
    <AboutSchool 
    name={p.get("title")} phone={p.get("phone")}
    email={p.get("email")} address={p.get("address")} 
    info={p.get("info")} rate={p.get("rate")} odbory={p.getAll("odbory")}
    odvetie={p.getAll("odvetie")} logo={p.getAll("logo")} website={p.getAll("site")} />,
    document.getElementById("app")
);