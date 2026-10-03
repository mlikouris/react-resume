interface EducationProps {
  item: {
    id: string;
    institution: string;
    location: string;
    degree: string;
    field: string;
    graduationYear: number | null;
    startDate: string;
    endDate: string;
    current: boolean;

  }
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr); // Append day to ensure valid parsing
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};


const Education = ({ item }: EducationProps) => {
const start = formatDate(item.startDate);
const end = item.current ? 'Present' : (item.endDate ? formatDate(item.endDate) : '');

return (
  <div className="education mb-4" id={item.id}>
    <div className="education-info">
      {item.institution && (
        <span className="education-institution font-bold">{item.institution}</span>
      )}

      {item.location && (
        <>, <span className="education-location font-bold">{item.location}</span></>
      )}
    </div>
    <div className="education-info-degree flex justify-between items-baseline">
      <div>
        {item.degree && (
          <><span className="education-degree">{item.degree}</span></>
        )}

        {item.field && (
          <>, <span className="education-field">{item.field}</span></>
        )}
      </div>
      {start && end && (
        <><span className="education-timeline text-slate-500 italic text-sm">{start} – {end}</span></>
      )}
    </div>
  </div>
 );
}

export default Education;