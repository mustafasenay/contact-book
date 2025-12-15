import {useState} from 'react'

function AddContact() {
  
  const  [contacts, setContacts] = useState([]);
  const [newContactName, setNewContactName] =  useState('');
  const [newContactCity, setNewContactCity] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editCity, setEditCity] = useState('');

  const handleSubmitContact = (e) => {
    e.preventDefault();

    if (newContactName !== '' || newContactCity !== '') {
      const newContact = {
        id: `contact-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: newContactName,
        city: newContactCity,
      };

      setContacts(prevContacts => [...prevContacts, newContact]);
      setNewContactName('');
      setNewContactCity('');  
    }
  }

  const handleEdit = (contact) => {
    setEditingId(contact.id);
    setEditName(contact.name);
    setEditCity(contact.city);
  };

  const handleSaveEdit = (id) => {
    setContacts(prevContacts => prevContacts.map(contact => contact.id === id ? {...contact, name: editName, city:editCity} : contact));
    setEditingId(null);
    setEditName('');
    setEditCity('');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditName('');
    setEditCity('');
  }

  const handleDelete = (id) => {
    setContacts(prevContacts => prevContacts.filter(contact => contact.id !== id));
  }

  return (
    <>
      <form onSubmit={handleSubmitContact}>
        <div className="container" style={{marginTop:'1rem'}}>
          <h1 style={{textAlign:'center'}}>Contact Book</h1>
          <div className="card" style={{padding:'1rem',marginBottom:'1rem'}} >
            <div className="row">
              <div className="col-6" style={{textAlign:'-webkit-center'}}>
                <input 
                  type="text" 
                  name="Name" 
                  placeholder="Name" 
                  value={newContactName} 
                  onChange={(e) => setNewContactName(e.target.value)}
                />
              </div>
              <div className="col-6" style={{textAlign:'-webkit-center'}}>
                <input 
                  type="text" 
                  name="City" 
                  placeholder="City" 
                  value={newContactCity} 
                  onChange={(e) => setNewContactCity(e.target.value)} 
                />
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
          <div className="card" style={{width:'50%', marginBottom: '1rem'}}>
            <div className="col-12">
              {editingId === contact.id ? (
                <div style={{padding:'1rem'}}>
                  <div style={{marginBottom: '0.5rem'}}>
                    <input 
                      type="text" 
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      style={{width: '100%', padding: '0.5rem'}}
                    />
                  </div>
                  <div style={{marginBottom: '1rem'}}>
                    <input 
                      type="text" 
                      value={editCity}
                      onChange={(e) => setEditCity(e.target.value)}
                      style={{width: '100%', padding: '0.5rem'}}
                    />
                  </div>
                  <div className="row flex-right">
                    <div className="sm-3 col" style={{padding:'0px', textAlign:'right'}}>
                      <button 
                        className="btn-small"
                        onClick={() => handleSaveEdit(contact.id)}
                        style={{marginRight: '0.5rem'}}
                      >
                        Save
                      </button>
                      <button 
                        className="btn-small"
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div style={{padding:'1rem'}}>
                    <h4 style={{margin:'0px'}}>{contact.name}</h4>
                    <h5 style={{margin:'0px'}}>{contact.city}</h5>
                  </div>
                  <div className="row flex-right">
                    <div className="sm-2 col">
                      <button 
                        className="btn-small"
                        onClick={() => handleEdit(contact)}
                        style={{marginRight: '0.5rem'}}
                      >
                        Edit
                      </button>
                      <button 
                        className="btn-small"
                        onClick={() => handleDelete(contact.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default AddContact;
