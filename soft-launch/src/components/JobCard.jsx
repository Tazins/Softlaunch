import { Card, CardContent } from './ui/Card.jsx';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function JobCard({ job }) {
  return (
    <motion.div
      whileHover={{ y: -6, boxShadow: '0 12px 28px rgba(0,0,0,.12)' }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Link to={`/jobs/${job.id}`}>
        <Card className="overflow-hidden">
          {/* banner image */}
          <img
            src={job.banner}
            alt=""
            className="h-40 w-full object-cover"
            loading="lazy"
          />
          <CardContent className="flex gap-4">
            {/* company logo */}
            <img
              src={job.logo}
              alt=""
              className="h-10 w-10 rounded-full object-contain"
            />

            <div className="min-w-0">
              <h3 className="text-xl font-semibold truncate">{job.title}</h3>
              <p className="text-sm text-gray-600 truncate">
                {job.company} · {job.city}
              </p>
              <p className="text-sm text-gray-500">
                {job.type} · Closes {job.closes}
              </p>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
