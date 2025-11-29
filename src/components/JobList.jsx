import { EditIcon, TrashIcon } from './Icons'


export default function JobList({ jobs, onEdit, onDelete }) {
    if (!jobs.length) return <div className="card text-center">No jobs yet — add one from the form</div>


    return (
       <div className="card overflow-auto">
        <table className="w-full table-auto">
            <thead className="table-header">
              <tr>
                <th className="px-3 py-3">Company</th>
                <th className="px-3 py-3">Location</th>
                <th className="px-3 py-3">Role</th>
                <th className="px-3 py-3">Job Type</th>
                <th className="px-3 py-3">Date</th>
                <th className="px-3 py-3">Status</th>
                <th className="px-3 py-3">Note</th>
                <th className="px-3 py-3">Actions</th>
              </tr>
            </thead>

            <tbody>
               {jobs.map(job => (
                <tr key={job.id} className="table-row border-t">
                   <td className="px-3 py-3 align-top">{job.company}</td>
                   <td className="px-3 py-3 align-top">{job.location}</td>
                   <td className="px-3 py-3 align-top">{job.role}</td>
                   <td className="px-3 py-3 align-top">{job.jobType}</td>
                   <td className="px-3 py-3 align-top">{job.date}</td>
                   <td className="px-3 py-3 align-top">
                       <span className={`badge ${job.status === 'Applied' ? 'bg-blue-500' : job.status === 'Interviewing' ? 'bg-yellow-500' : job.status === 'Rejected' ? 'bg-red-500' : 'bg-green-600'}`}>{job.status}</span>
                   </td>
                   <td className="px-3 py-3 align-top whitespace-pre-wrap">{job.notes}</td>
                   <td className="px-3 py-3 align-top">
                        <div className="flex gap-2">
                            <button onClick={() => onEdit(job)} className="px-2 py-1 border rounded"><EditIcon /></button>
                            <button onClick={() => onDelete(job.id)} className="px-2 py-1 border rounded text-red-600"><TrashIcon /></button>
                        </div>
                    </td>
                </tr>
               ))}
            </tbody>
        </table>
       </div>
    )
}