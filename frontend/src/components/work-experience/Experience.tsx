import ExperienceEmployer from "./ExperienceEmployer";
import ExperienceAccomplishment from "./ExperienceAccomplishment";
import ExperiencePosition from "./ExperiencePosition";

interface ExperienceProps {
  item: {
    id: string;
    company: string;
    location: string;
    title: string;
    type: string;
    startDate: string;
    endDate: string | null;
    current: boolean;
    highlights: string[];
  }
}

const Experience = ({ item }: ExperienceProps) => {
 return (
  <div className="experience mb-4">
    <div>
      <ExperienceEmployer name={item.company} location={item.location} />
      <ExperiencePosition
        title={item.title}
        timeline={{ start: item.startDate, end: item.endDate, current: item.current, type: item.type }}
      />
      <ExperienceAccomplishment highlights={item.highlights} />
    </div>
  </div>
 );
}

export default Experience;