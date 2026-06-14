interface EducationProps {
  item: {
    id: string;
    institution: string;
    location: string;
    degree: string;
    field: string;
    graduationYear: number | null;

  }
}

const Education = ({ item }: EducationProps) => {
 return (
  <div className="education mb-4" id={item.id}>
    {item.institution && (
      <span className="education-institution">{item.institution}</span>
    )}

    {item.location && (
      <>, <span className="education-location">{item.location}</span></>
    )}

    {item.degree && (
      <> | <span className="education-degree font-bold">{item.degree}</span></>
    )}

    {item.field && (
      <>, <span className="education-field font-bold">{item.field}</span></>
    )}
  </div>
 );
}

export default Education;