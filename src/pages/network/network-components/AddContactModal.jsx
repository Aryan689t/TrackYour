import { useState, useEffect } from "react";
import "./AddContactModal.css";

const RELATIONSHIP_OPTIONS = ["Friend","Mentor","Senior","Recruiter","Alumni"];

const EMPTY = {
    name:"",
    company:"",
    role:"",
    linkedin:"",
    email:"",
    phone:"",
    notes:"",
    relationship:"Friend"
};

function AddContactModal({ open, onClose, onAdd }){

    const [form, setForm] = useState(EMPTY);

    useEffect(()=>{
        if(open) setForm(EMPTY);
    },[open]);

    if(!open) return null;

    const handleChange = (e)=>{
        const { name, value } = e.target;
        setForm(prev=>({ ...prev, [name]:value }));
    };

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(!form.name.trim()) return;
        onAdd({
            ...form,
            id: Date.now(),
            tags: form.tags || [],
            reminders: []
        });
        onClose();
    };

    return(
    <div className="modalOverlay" onClick={onClose}>
        <div className="premium-card modalCard" onClick={(e)=>e.stopPropagation()}>
            <div className="modalHeader">
                <h2>Add Contact</h2>
                <button className="modalClose" onClick={onClose}>×</button>
            </div>

            <form className="modalForm" onSubmit={handleSubmit}>
                <div className="formRow">
                    <label>
                        <span>Name *</span>
                        <input className="input-standard" name="name" value={form.name} onChange={handleChange} placeholder="Jane Doe" required />
                    </label>
                    <label>
                        <span>Relationship *</span>
                        <select className="input-standard" name="relationship" value={form.relationship} onChange={handleChange}>
                            {RELATIONSHIP_OPTIONS.map(r=>(
                                <option key={r} value={r}>{r}</option>
                            ))}
                        </select>
                    </label>
                </div>

                <div className="formRow">
                    <label>
                        <span>Company</span>
                        <input className="input-standard" name="company" value={form.company} onChange={handleChange} placeholder="Microsoft" />
                    </label>
                    <label>
                        <span>Role</span>
                        <input className="input-standard" name="role" value={form.role} onChange={handleChange} placeholder="Senior Engineer" />
                    </label>
                </div>

                <div className="formRow">
                    <label>
                        <span>LinkedIn</span>
                        <input className="input-standard" name="linkedin" value={form.linkedin} onChange={handleChange} placeholder="linkedin.com/in/..." />
                    </label>
                    <label>
                        <span>Email</span>
                        <input className="input-standard" name="email" type="email" value={form.email} onChange={handleChange} placeholder="jane@company.com" />
                    </label>
                </div>

                <label>
                    <span>Phone</span>
                    <input className="input-standard" name="phone" value={form.phone} onChange={handleChange} placeholder="+1 555 000 0000" />
                </label>

                <label>
                    <span>Notes</span>
                    <textarea className="input-standard" name="notes" value={form.notes} onChange={handleChange} rows={3} placeholder="Where you met, context, follow-up ideas..." />
                </label>

                <div className="modalFooter">
                    <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
                    <button type="submit" className="btn-primary">Save Contact</button>
                </div>
            </form>
        </div>
    </div>
    )
}
export default AddContactModal
