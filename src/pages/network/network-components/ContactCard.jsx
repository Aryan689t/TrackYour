import "./ContactCard.css";

function initials(name){
    return name
        .split(" ")
        .map(p=>p[0])
        .slice(0,2)
        .join("")
        .toUpperCase();
}

const REL_COLORS = {
    "Friend":"#4ade80",
    "Mentor":"#22c55e",
    "Senior":"#60a5fa",
    "Recruiter":"#f59e0b",
    "Alumni":"#a78bfa"
};

const REMINDER_COLORS = {
    "Follow up":"#f59e0b",
    "Wish birthday":"#ec4899"
};

function ContactCard({ contact, onRemove }){
    return(
    <div className="contactCard">
        <div className="contactCardHead">
            <div className="avatar">{initials(contact.name)}</div>
            <div className="contactHeadInfo">
                <h3>{contact.name}</h3>
                <p className="contactRole">{contact.role}</p>
                <span className="contactCompany">🏢 {contact.company}</span>
            </div>
            <span
                className="relBadge"
                style={{ background:`${REL_COLORS[contact.relationship] || "#22c55e"}22`, color:REL_COLORS[contact.relationship] || "#22c55e" }}
            >
                {contact.relationship}
            </span>
        </div>

        <div className="tagRow">
            {contact.tags.map((tag,index)=>(
                <span className="contactTag" key={index}>#{tag}</span>
            ))}
        </div>

        {(contact.reminders && contact.reminders.length>0) && (
            <div className="reminderRow">
                {contact.reminders.map((rem,index)=>(
                    <span
                        className="reminderBadge"
                        key={index}
                        style={{ background:`${REMINDER_COLORS[rem] || "#22c55e"}22`, color:REMINDER_COLORS[rem] || "#22c55e" }}
                    >
                        ⏰ {rem}
                    </span>
                ))}
            </div>
        )}

        <div className="contactActions">
            <a className="actionBtn primary" href={contact.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a className="actionBtn" href={`mailto:${contact.email}`}>Email</a>
            <button className="actionBtn ghost" onClick={()=>onRemove(contact.id)}>Remove</button>
        </div>
    </div>
    )
}
export default ContactCard
