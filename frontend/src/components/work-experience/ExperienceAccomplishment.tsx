interface ExperienceAccomplishmentProps {
  highlights: string[];
}

const ExperienceAccomplishment = ({ highlights }: ExperienceAccomplishmentProps) => {
    return (
    <ul className="experience__accomplishments list-disc list-outside ml-6 space-y-2">
      {highlights.map((highlight, index) => (
        <li key={index} className="experience__bullet-point text-slate-600 leading-relaxed">
          {highlight}
        </li>
      ))}
    </ul>
    )
  };
 export default ExperienceAccomplishment;