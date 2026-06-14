const Summary = (
  {children}: {
    children: React.ReactNode;
  }) => {
  return (
    <div className="resume-summary text-slate-700 leading-relaxed text-lg text-justify">
      {children}
    </div>
  );
}

export default  Summary;