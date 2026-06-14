interface ExperienceEmployerProps {
  name: string;
  location: string;
}

const ExperienceEmployer = ({ name, location }: ExperienceEmployerProps) => {
 return (
  <div className="experience__employer flex justify-between items-baseline mb-1">
    <span className="experience__employer-name font-bold text-xl text-slate-900">{name}</span>
    <span className="experience__employer-location text-slate-500 font-semibold uppercase text-xs tracking-wider">{location}</span>
  </div>
 )
};
export default ExperienceEmployer;
