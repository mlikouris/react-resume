interface TechnicalSkillProps {
  item: {
    heading: string;
    items: string[];
  }
}

const TechnicalSkill = ({ item }: TechnicalSkillProps) => {
 return (
  <div className="skills mb-4">
    <h3 className="skills__heading font-bold text-slate-900">{item.heading}:</h3>
     {item.items.map((skill, index) => (
        <span key={skill}>
          {skill}{index < item.items.length - 1 ? ', ' : ' '}
        </span>
    ))}
  </div>
 );
}

export default TechnicalSkill;