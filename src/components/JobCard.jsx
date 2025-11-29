import { EditIcon, TrashIcon } from '../components/Icons'

export default function JobCard({ job, onEdit, onDelete }) {
    return (
        <div className="card flex items-center justify-between">
            <div>
                <h3 className="font-semibold">{job.company} — <span className="text-sm font-normal">{job.role}</span></h3>
                <p className="text-xs text-gray-500">Applied: {job.date} • Status: <strong>{job.status}</strong></p>
                 {job.notes && <p className="mt-2 text-sm whitespace-pre-wrap">{job.notes}</p>}
            </div>

            <div className="flex gap-2 items-center">
                <button onClick={() => onEdit(job)} className="p-2 hover:bg-gray-100 rounded"><EditIcon /></button>
                <button onClick={() => onDelete(job.id)} className="p-2 hover:bg-red-50 rounded text-red-600"><TrashIcon /></button>
            </div>
        </div>
    )
}