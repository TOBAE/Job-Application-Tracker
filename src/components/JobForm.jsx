import { useState, useEffect } from 'react'

const STATUS = ['Applied', 'Interviewing', 'Rejected', 'Offer']
const JOB_TYPE = ['Remote', 'Hybrid', 'On-site']


export default function JobForm({ onSave, initial = null, onCancel }) {

    const emptyForm ={
        id: Date.now().toString(),
        company: '',
        location: '',
        role: '',
        jobType: 'Remote',
        date: new Date().toISOString().slice(0,10),
        status: 'Applied',
        notes: ''
    }

    const [form, setForm] = useState(emptyForm)

    useEffect(() => { 
        if (initial) setForm(initial) 
        else setForm (emptyForm)
    }, [initial])


    function handle(e) {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
    }


    function submit(e) {
        e.preventDefault()
        if (!form.company.trim() || !form.role.trim() || !form.location.trim()) return alert('All fields required')
        onSave(form)
        setForm({ ...emptyForm, id: Date.now().toString() })
    }

    function cancelForm() {
        setForm({ ...emptyForm, id: Date.now().toString() })
        if (onCancel) onCancel()
    }



    return (
        <form onSubmit={submit} className="space-y-3">
            <div className="grid grid-cols-1 gap-2">
                <input name="company" value={form.company} onChange={handle} placeholder="Company" className="input" />
                <input name="role" value={form.role} onChange={handle} placeholder="Role" className="input" />
                <input name="location" value={form.location} onChange={handle} placeholder="Location" className="input" />

                <div className="grid grid-cols-2 gap-2">
                    <input type="date" name="date" value={form.date} onChange={handle} className="input" />
                    <select name="status" value={form.status} onChange={handle} className="input">
                       {STATUS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>

                <select name="jobType" value={form.jobType} onChange={handle} className="input">
                    {JOB_TYPE.map(t => <option key={t} value={t}>{t}</option>)}
                </select>

                <textarea name="notes" value={form.notes} onChange={handle} placeholder="Notes" className="input h-24" />
            </div>

            <div className="flex justify-end gap-2">
               {onCancel && <button type="button" onClick={cancelForm} className="button button-ghost">Cancel</button>}
               <button type="submit" className="button button-primary">Save</button>
            </div>
        </form>
    )
}