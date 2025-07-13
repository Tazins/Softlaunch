import { useState } from 'react';
import JobCard from '../components/JobCard.jsx';

// temporary data (replace with API fetch later) -------
const JOBS = [

  

];

export default function JobsPage() {
  /* simplistic filter state */
  const [filters, setFilters] = useState({
    role: '',
    type: '',
    city: '',
    company: '',
  });

  const filtered = JOBS.filter((j) =>
    Object.entries(filters).every(
      ([key, val]) => !val || j[key].toLowerCase().includes(val.toLowerCase()),
    ),
  );

  const handleChange = (field) => (e) =>
    setFilters({ ...filters, [field]: e.target.value });

  const reset = () =>
    setFilters({ role: '', type: '', city: '', company: '' });

  return (
    <div className="min-h-screen px-6 py-12">
      {/* heading */}
      <h1 className="text-5xl font-extrabold text-center mb-16">Jobs</h1>

      {/* filter bar */}
      <div className="flex flex-wrap gap-4 justify-center mb-10">
        <select
          value={filters.role}
          onChange={handleChange('role')}
          className="w-40 rounded-md border-gray-300"
        >
          <option value="">Role</option>
          <option>Law</option>
          <option>Software</option>
          <option>Design</option>
        </select>

        <select
          value={filters.type}
          onChange={handleChange('type')}
          className="w-40 rounded-md border-gray-300"
        >
          <option value="">Type</option>
          <option>Internship</option>
          <option>Graduate</option>
        </select>

        <select
          value={filters.city}
          onChange={handleChange('city')}
          className="w-40 rounded-md border-gray-300"
        >
          <option value="">Location</option>
          <option>Sydney</option>
          <option>Melbourne</option>
          <option>Perth</option>
        </select>

        <select
          value={filters.company}
          onChange={handleChange('company')}
          className="w-40 rounded-md border-gray-300"
        >
          <option value="">Company</option>
          {[...new Set(JOBS.map((j) => j.company))].map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <button
          onClick={reset}
          className="rounded-md px-6 py-2 ring-1 ring-gray-300 hover:bg-gray-50"
        >
          Reset
        </button>

        <button className="bg-primary text-white rounded-md px-6 py-2 hover:opacity-90">
          Post Job
        </button>
      </div>

      {/* cards grid */}
      <div className="grid gap-8 md:grid-cols-3">
        {filtered.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full text-center text-gray-500">
            No jobs match your filters.
          </p>
        )}
      </div>
    </div>
  );
}
