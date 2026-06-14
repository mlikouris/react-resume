import { useState } from "react";
import { motion } from "framer-motion";
import Experience from "./work-experience/Experience";
import Education from "./Eduction";
import ResumeSection from "./ResumeSection";
import Skills from "./Skills";
import Summary from "./Summary";
import resumeData from '../json/resume.json';
import ContactModal from "./ContactModal";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -25 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const Resume = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="resume max-w-5xl mx-auto p-12 bg-white shadow-2xl min-h-screen my-10 text-slate-800 font-sans border border-slate-100 rounded-sm">
      <div className="resume-lead mb-10 text-center">
        <h1 className="resume-lead__name text-5xl font-extrabold tracking-tight text-slate-900 mb-2">{resumeData.personal.name}</h1>
        <div className="resume-lead__info text-slate-500 font-medium">
          <span className="resume-lead__location">{resumeData.personal.location}</span> | &nbsp;
          <span className="resume-lead__site"><a href={resumeData.personal.linkedin} className="text-blue-600 hover:underline">{resumeData.personal.linkedin}</a></span>&nbsp;
          <button
            className="resume-lead__contact ml-2 px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md text-sm font-bold transition-colors cursor-pointer"
            type="button"
            onClick={() => setIsModalOpen(true)}
          >Contact</button>
        </div>
      </div>
        <ResumeSection heading="Summary">
          <motion.div variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Summary>{resumeData.summary}</Summary>
          </motion.div>
        </ResumeSection>
        <ResumeSection heading="Experience">
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {resumeData.experience.map((exp) => (
              <motion.div key={exp.id} variants={itemVariants} className="mb-6 last:mb-0">
                <Experience item={exp} />
              </motion.div>
            ))}
          </motion.div>
        </ResumeSection>
        <ResumeSection heading="Education">
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {resumeData.education.map((edu) => (
              <motion.div key={edu.id} variants={itemVariants}>
                <Education item={edu} />
              </motion.div>
            ))}
          </motion.div>
        </ResumeSection>
        <ResumeSection heading="Technical Skills">
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
            {resumeData.skills.map((skl) => (
              <motion.div key={skl.heading} variants={itemVariants}>
                <Skills item={skl} />
              </motion.div>
            ))}
          </motion.div>
        </ResumeSection>
        <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
export default Resume;