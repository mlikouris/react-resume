const ResumeSection = (
  {
    heading,
    children
  }: {
    heading: string;
    children: React.ReactNode;
  }) => {
  return (
    <div className="resume-section mb-8">
      <h2 className="resume-section__heading text-xl font-bold text-slate-900 border-b-2 border-slate-800 pb-1 mb-4 uppercase tracking-widest">
      {heading}
      </h2>
      <div className="resume-section__content">
        {children}
      </div>
    </div>
  )
}

export default ResumeSection