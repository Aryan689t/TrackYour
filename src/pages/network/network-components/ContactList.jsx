import ContactCard from "./ContactCard";
import "./ContactList.css";

function ContactList({ contacts, onRemove }){
    if(contacts.length===0){
        return(
            <div className="emptyState">
                <span className="emptyIcon">👥</span>
                <h3>No contacts found</h3>
                <p>Try adjusting your search or filters, or add a new contact.</p>
            </div>
        );
    }

    return(
    <div className="contactList">
        {contacts.map((contact)=>(
            <ContactCard
                key={contact.id}
                contact={contact}
                onRemove={onRemove}
            />
        ))}
    </div>
    )
}
export default ContactList
