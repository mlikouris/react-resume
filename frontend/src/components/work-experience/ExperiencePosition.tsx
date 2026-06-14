interface ExperiencePositionProps {
  title: string;
  timeline: {
    start: string;
    end: string | null;
    current: boolean;
    type: string;
  }
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr); // Append day to ensure valid parsing
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

const ExperiencePosition = ({ title, timeline }: ExperiencePositionProps) => {
  const start = formatDate(timeline.start);
  const end = timeline.current ? 'Present' : (timeline.end ? formatDate(timeline.end) : '');

 return (
  <div className="experience__position flex justify-between items-baseline mb-2">
    <span className="experience__position-title font-semibold text-slate-700 text-lg">
      {title}
    </span>
    <span className="experience__position-timeline text-slate-500 italic text-sm">
      {start} – {end} ({timeline.type})
    </span>
  </div>
  );
}
 export default ExperiencePosition;