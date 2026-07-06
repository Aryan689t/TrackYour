import './statsCard.css';
function Statscard({icon,title,value,subtitle}){
    return(
        <>
        <div className="statCard">
            <div className="cardIcon">{icon}</div>
            <h3>{title}</h3>
            <h2>{value}</h2>
            <p>{subtitle}</p>
        </div>
        </>
    );
}
export default Statscard;