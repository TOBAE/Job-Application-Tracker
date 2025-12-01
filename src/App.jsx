import { useState, useMemo } from 'react'
import useLocalStorage from './hooks/useLocalStorage'
import JobForm from './components/JobForm'
import JobList from './components/JobList'


const STATUS = ['All','Applied','Interviewing','Rejected','Offer']


export default function App(){
  const [jobs, setJobs] = useLocalStorage('jobs_v3', [])
  const [editing, setEditing] = useState(null)
  const [activeTab, setActiveTab] = useState('All')
  const [q, setQ] = useState('')
  const [locationFilter, setLocationFilter] = useState('')
  const [sortField, setSortField] = useState('date')
  const [showToast, setShowToast] = useState(false)


  function save(job){
    setJobs(prev => {
      const exists = prev.some(p => p.id === job.id)
      return exists ? prev.map(p => p.id === job.id ? job : p) : [job, ...prev]
    })
    setEditing(null)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 2000)
  }

  function remove(id){
    if (!confirm('Delete this entry?')) return
    setJobs(prev => prev.filter(p => p.id !== id))
  }

  function clearAll(){
    if (!confirm('Clear all entries?')) return
    setJobs([])
  }

  const filtered = useMemo(() => {
    let out = jobs.filter(j => {
      if (activeTab !== 'All' && j.status !== activeTab) return false
      if (locationFilter && !j.location.toLowerCase().includes(locationFilter.toLowerCase())) return false
      if (q && !(j.company + ' ' + j.role + ' ' + (j.notes||'')).toLowerCase().includes(q.toLowerCase())) return false
      return true
    })

    // sort
    return [...out].sort((a,b) => {
      if (sortField === 'date') return new Date(b.date) - new Date(a.date)
      return (a[sortField] || '').toString().localeCompare((b[sortField] || '').toString())
    })
  }, [jobs, activeTab, locationFilter, q, sortField])

  function exportCSV(){
    const rows = [
      ['Company','Location','Role','Job Type','Date','Status','Notes'],
      ...filtered.map(j => [j.company, j.location, j.role, j.jobType, j.date, j.status, j.notes])
    ]
    const csv = rows.map(r => r.map(c => '"' + (''+ (c||'')) + '"').join(',')).join('')
    const blob = new Blob([csv], { type:'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'job-tracker.csv'
    a.click()
  }


  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="container">
        <header className="text-center">
          <h1 className="text-2xl font-medium">Job Application Tracker</h1>
        </header>

        <div className="flex items-center gap-3 justify-between mt-9 mb-4">
          <div className="relative">
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search" className="input w-48" />
          </div>
          <button onClick={() => exportCSV()} className="button bg-white border px-3 py-2 tab">Export CSV</button>
        </div>

        <div className="grid layout-grid gap-4">
          {/* Left column: form */}
          <div className="card">
            <div className="mb-3">
              <JobForm onSave={save} initial={editing} onCancel={() => setEditing(null)} />
            </div>
          </div>

          {/* Right column: controls, tabs, table */}
          <div>
            <div className="card mb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <label className="text-sm">Sort:</label>
                    <select value={sortField} onChange={e => setSortField(e.target.value)} className="input w-40">
                      <option value="date">Date</option>
                      <option value="company">Company</option>
                      <option value="role">Role</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <input value={locationFilter} onChange={e => setLocationFilter(e.target.value)} placeholder="Filter by location" className="input w-48" />
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Showing <strong>{filtered.length}</strong> of <strong>{jobs.length}</strong> entries</p>
                </div>
              </div>

              {/* Tabs centered like sketch */}
              <div className="tabs mt-4">
                {STATUS.map(s => (
                  <div key={s} onClick={() => setActiveTab(s)} className={`tab ${activeTab === s ? 'tab-active' : ''}`}>{s}</div>
                ))}

                <div onClick={() => { setJobs([]) }} className="tab">ClearAll</div>
              </div>
            </div>

            <JobList jobs={filtered} onEdit={(j) => setEditing(j)} onDelete={remove} />
          </div>
        </div>

        {/* Toast */}
        {showToast && (
          <div className="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-2 rounded shadow-lg">Saved ✅</div>
        )}

      </div>
    </div>
  )
}


{/* <div className="mt-3 flex gap-2">
<button onClick={() => { setEditing(null); setQ(''); setLocationFilter(''); setActiveTab('All'); }} className="button button-ghost">Clear All</button>
<button onClick={() => clearAll()} className="button bg-red-100 text-red-700">Delete All</button>
</div> */}