import ExperienceEmployer from "./ExperienceEmployer";
import ExperienceAccomplishment from "./ExperienceAccomplishment";
import ExperiencePosition from "./ExperiencePosition";

interface PositionEntry {
  id?: string;
  title?: string;
  type?: string;
  startDate?: string;
  endDate?: string | null;
  current?: boolean;
  highlights?: string[];
}

interface ExperienceProps {
  item: {
    id: string;
    company: string;
    location: string;
    title?: string;
    type?: string;
    startDate?: string;
    endDate?: string | null;
    current?: boolean;
    highlights?: string[];
    position?: PositionEntry[];
  }
}

const Experience = ({ item }: ExperienceProps) => {
  const positions = Array.isArray(item.position) && item.position.length > 0
    ? item.position
    : [{
        id: item.id,
        title: item.title,
        type: item.type,
        startDate: item.startDate,
        endDate: item.endDate,
        current: item.current,
        highlights: item.highlights,
      }];

  return (
    <div className="experience mb-4">
      <div>
        <ExperienceEmployer name={item.company} location={item.location} />
        {positions.map((position, index) => (
          <div key={position.id ?? `${item.id}-${index}`} className="mb-4 last:mb-0">
            <ExperiencePosition
              title={position.title ?? ""}
              timeline={{
                start: position.startDate ?? "",
                end: position.endDate ?? null,
                current: !!position.current,
                type: position.type ?? "",
              }}
            />
            {position.highlights && position.highlights.length > 0 && (
              <ExperienceAccomplishment highlights={position.highlights} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Experience;