function BlackBox(props){
    return(
        <div className="main_grid">
            <a className={"bb_title"}>Created by:</a>
            <div className={"insta_grid"}>
                <Insta insta={"@igor_19"} url={"https://instagram.com/lgor_19/"}/>
                <Insta insta={"@sergiy_f_"} url={"https://instagram.com/sergiy_f_/"}/>
                <Insta insta={"@laurrrenxx"} url={"https://instagram.com/laurrrenxx/"}/>
            </div>
            <a>NO WAR IN UKRAINE</a>
        </div>
    );
}
function Insta(props){
    return(
        <div className={"insta_container"} onClick={()=>{window.open(props.url);}}>
                <img src="/assets/img/inst.svg" style={{filter:"invert(100%)"}} className={"inst_img"}/>
                <a>{props.insta}</a>
        </div>
    );
}
ReactDOM.render(
    <BlackBox/>,
    document.getElementById("blackBox")
);