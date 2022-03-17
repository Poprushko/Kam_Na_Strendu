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