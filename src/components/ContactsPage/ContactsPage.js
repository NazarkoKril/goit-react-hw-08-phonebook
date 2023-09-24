import React, { useState, useContext, useEffect } from 'react'
import { Navigation } from '../Navigation/Navigation'
import { useHttp } from 'components/hooks/http.hook'
import { AuthContext } from 'components/context/AuthContext'

export const ContactsPage = () => {
    const { loading, request, error, clearError } = useHttp()
    const auth = useContext(AuthContext)
    const [contacts, setContacts] = useState([])
    const [form, setForm] = useState({
        name: '', number: ''
    })
    const [updatingContact, setUpdatingContact] = useState(null)
    const [updateForm, setUpdateForm] = useState({
        name: '', number: ''
    })

    const addContactHandler = async () => {
        try {
            const data = await request('https://connections-api.herokuapp.com/contacts/', 'POST', { ...form }, { Authorization: auth.token })

            setContacts([...contacts, data])
            setForm({
                name: '',
                number: ''
            })
            console.log(data)
        } catch (e) {

        }
    }

    const deleteContactHandler = async (event) => {
        const sure = window.confirm("You sure you want to delete this contact?")
        if (!sure) return

        const contactId = event.target.name

        try {
            await request('https://connections-api.herokuapp.com/contacts/' + contactId, 'DELETE', {}, { Authorization: auth.token })

            setContacts(contacts.filter(item => item.id != contactId))
        } catch (e) {
            window.alert("Sth went wrong")
        }

    }

    const updateContacthandler = async (event) => {
        const contactId = event.target.name

        try {
            const data = await request('https://connections-api.herokuapp.com/contacts/' + contactId, 'PATCH', { ...updateForm }, { Authorization: auth.token })

            setContacts(contacts.map(item => item.id === contactId ? { ...data } : item))
            setUpdatingContact(null)
            setUpdateForm({
                name: '', number: ''
            })
        } catch (e) {
            window.alert("Sth went wrong")
        }

    }

    const changeHendler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const changeUpdateHendler = event => {
        setUpdateForm({ ...updateForm, [event.target.name]: event.target.value })
    }

    const setUpdate = event => {
        const contactId = event.target.name
        const contact = contacts.find(item => item.id === contactId)
        setUpdatingContact(contactId)
        setUpdateForm({name: contact.name, number: contact.number})
    }

    useEffect(() => {
        try {
            request('https://connections-api.herokuapp.com/contacts', 'GET', null, { Authorization: auth.token }).then(
                contactsData => setContacts(contactsData)
            )

            setUpdatingContact(null)
        } catch (e) {
            window.alert("Sth went wrong.")
        }
    }, [])

    return (
        <>
            <Navigation />
            <h1>CONTACTS</h1>

            <div>
                <input
                    placeholder="Enter Name"
                    id="name"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={changeHendler}
                />
                <label htmlFor="name">Name</label>
            </div>
            <div>
                <input
                    placeholder="Enter number"
                    id="number"
                    type="text"
                    name="number"
                    value={form.number}
                    onChange={changeHendler}
                />
                <label htmlFor="number">Number</label>
            </div>

            <button
                onClick={addContactHandler}
            >
                Add Contact
            </button>

            <ul>
                {
                    contacts.map(contact => {
                        return (
                            <>
                                {
                                    contact.id === updatingContact
                                        ? <>
                                            <div>
                                                <input
                                                    placeholder="Enter Name"
                                                    id="name"
                                                    type="text"
                                                    name="name"
                                                    value={updateForm.name}
                                                    defaultValue={contact.name}
                                                    onChange={changeUpdateHendler}
                                                />
                                                <label htmlFor="name">Name</label>
                                            </div>
                                            <div>
                                                <input
                                                    placeholder="Enter number"
                                                    id="number"
                                                    type="text"
                                                    name="number"
                                                    value={updateForm.number}
                                                    defaultValue={contact.number}
                                                    onChange={changeUpdateHendler}
                                                />
                                                <label htmlFor="number">Number</label>
                                            </div></>
                                        : <li>{contact.name} : {contact.number}</li>
                                }
                                <button
                                    onClick={deleteContactHandler}
                                    name={contact.id}
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={contact.id === updatingContact ? updateContacthandler : setUpdate}
                                    name={contact.id}
                                >
                                    Update
                                </button>
                            </>
                        )
                    })
                }
            </ul>
        </>
    )
}