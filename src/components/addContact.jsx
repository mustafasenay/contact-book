import {useState} from 'react'

function AddContact() {
  
  const  [contacts, setContacts] = useState([]);
  const [newContactName, setNewContactName] =  useState('');
  const [newContactCity, setNewContactCity] = useState('');

  const handleSubmitContact = (e) => {
    e.preventDefault();

    const newContact = {
      id: `contact-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: newContactName,
      city: newContactCity,
    };

    setContacts(prevContacts => [...prevContacts, newContact]);
    setNewContactName('');
    setNewContactCity('');
  }

  return (
    <>
      <form onSubmit={handleSubmitContact}>
        <div className="container" style={{marginTop:'1rem'}}>
          <div className="card" style={{padding:'1rem',marginBottom:'1rem'}} >
            <div className="row">
              <div className="col-6" style={{textAlign:'-webkit-center'}}>
                <input type="text" name="Name" placeholder="Name" value={newContactName} onChange={(e) => setNewContactName(e.target.value)}/>
              </div>
              <div className="col-6" name="City" style={{textAlign:'-webkit-center'}}>
                <input type="text" name="City" placeholder="City" value={newContactCity} onChange={(e) => setNewContactCity(e.target.value)} />
              </div>
              <div className="col-12" style={{textAlign:'center', marginTop:'1rem'}}>
                <button className="btn-small">Add Contact</button> 
              </div>
            </div>
          </div>
        </div>
      </form>
      {contacts.map((contact) => (
        <div key={contact.id} className="row flex-center">
          <div className="card" style={{width:'50%'}}>
            <div className="col-12" style={{justifyContent: 'center'}}>
              <div style={{padding:'1rem'}}>
                <h4 style={{margin:'0px'}}>{contact.name}</h4>
                <h5 style={{margin:'0px'}}>{contact.city}</h5>
              </div>
              <div className="row flex-right">
                <div className="sm-2 col">
                  <button className="btn-small">Edit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default AddContact;
