import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
} from '@react-pdf/renderer';
import resumeData from '../json/resume-live.json';

const styles = StyleSheet.create({
  page: {
    paddingTop: 40,
    paddingRight: 24,
    paddingBottom: 40,
    paddingLeft: 24,
    fontSize: 12,
    fontFamily: 'Helvetica',
    lineHeight: 1.4,
    backgroundColor: '#ffffff',
  },
  header: {
    textAlign: 'center',
    marginBottom: 10,
    paddingBottom: 4,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#0f172a',
  },
  contact: {
    fontSize: 9,
    color: '#475569',
    marginTop: 4,
    marginBottom: 2,
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 8,
    letterSpacing: 1,
    color: '#0f172a',
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
    paddingBottom: 3,
  },
  summaryText: {
    fontSize: 12,
    lineHeight: 1.5,
    color: '#1e293b',
  },
  experienceItem: {
    marginBottom: 10,
  },
  companyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  experienceHeading: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  companyLocation: {
    fontSize: 8,
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  positionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 0,
  },
  positionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#334155',
    marginTop: 4,
  },
  experienceMeta: {
    fontSize: 10,
    color: '#475569',
    marginBottom: 4,
  },
  bullet: {
    flexDirection: 'row',
    marginBottom: 3,
    paddingLeft: 4,
  },
  bulletPoint: {
    width: 6,
    fontSize: 12,
    lineHeight: 1.4,
    color: '#1e293b',
  },
  bulletText: {
    fontSize: 12,
    lineHeight: 1.4,
    color: '#334155',
    flex: 1,
  },
  skillSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  skillColumn: {
    width: '48%',
    marginBottom: 2,
  },
  skillHeading: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  skillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 3,
    marginBottom: 8,
  },
  skillChip: {
    fontSize: 12,
    color: '#000000',
    lineHeight: 1.05,
    marginBottom: 1,
  },
  timeline: {
    fontStyle: 'italic'
  }
});

const formatDate = (value?: string | null) => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleString('en-US', { month: 'short', year: 'numeric' });
};

const formatDateRange = (startDate?: string | null, endDate?: string | null, current?: boolean) => {
  const start = formatDate(startDate);
  const end = current ? 'Present' : formatDate(endDate);
  if (!start && !end) return '';
  if (!start) return end;
  if (!end) return start;
  return `${start} – ${end}`;
};

const getCompanyPositions = (exp: typeof resumeData.experience[number]) => {
  if (Array.isArray(exp.position) && exp.position.length > 0) {
    return exp.position;
  }

  return [{
    title: exp.title,
    type: exp.type,
    startDate: exp.startDate,
    endDate: exp.endDate,
    current: exp.current,
    highlights: exp.highlights,
  }];
};

const PdfDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.name}>{resumeData.personal.name}</Text>
        <Text style={styles.contact}>
          {[resumeData.personal.location, resumeData.personal.phone, resumeData.personal.email]
            .filter(Boolean)
            .join('  |  ')}
            {resumeData.personal.linkedin && (
          <Text style={styles.contact}> | {resumeData.personal.linkedin}</Text>
        )}
        </Text>

      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Summary</Text>
        <Text style={styles.summaryText}>{resumeData.summary}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Experience</Text>
        {resumeData.experience.map((exp) => {
          const positions = getCompanyPositions(exp);

          return (
            <View key={exp.id} style={styles.experienceItem}>
              <View style={styles.companyRow}>
                <Text style={styles.experienceHeading}>{exp.company}</Text>
                <Text style={styles.companyLocation}>{exp.location}</Text>
              </View>
              {positions.map((position, index) => (
                <View key={`${exp.id}-${index}`}>
                  <View style={styles.positionRow} break>
                    <Text style={styles.positionTitle}>{position.title || ''}</Text>
                    {position.startDate || position.endDate || position.current || position.type ? (
                      <Text style={styles.experienceMeta}>
                        {formatDateRange(position.startDate, position.endDate, position.current)}
                        {position.type && (
                          <>&nbsp;<Text style={styles.timeline}>({position.type})</Text></>
                        )}
                      </Text>
                    ) : null}
                  </View>
                  {(position.highlights ?? []).map((highlight, highlightIndex) => (
                    <View key={`${exp.id}-${index}-${highlightIndex}`} style={styles.bullet}>
                      <Text style={styles.bulletPoint}>•</Text>
                      <Text style={styles.bulletText}>{highlight}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          );
        })}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Education</Text>
        {resumeData.education.map((edu) => (
          <View key={edu.id} style={styles.experienceItem}>
            <Text style={styles.experienceHeading}>{edu.institution}</Text>
            <View style={styles.companyRow}>
              <Text style={styles.experienceMeta}>
                {edu.degree}{edu.field ? `, ${edu.field}` : ''} • {edu.location}
              </Text>
              {edu.startDate || edu.endDate || edu.current ? (
                <Text style={styles.experienceMeta}>{formatDateRange(edu.startDate, edu.endDate, edu.current)}</Text>
              ) : null}
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section} break>
        <Text style={styles.sectionTitle}>Technical Skills</Text>
        <View style={styles.skillSection}>
          {resumeData.skills.map((skill) => (
            <View key={skill.heading} style={styles.skillColumn}>
              <Text style={styles.skillHeading}>{skill.heading}</Text>
              <View style={styles.skillRow}>
                {skill.items.map((item, index) => (
                  <Text key={item} style={styles.skillChip}>{item}{index < skill.items.length - 1 ? ', ' : ' '}</Text>
                ))}
              </View>
            </View>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);

const PdfRenderer = () => (
  <PDFViewer style={{ width: '100%', height: '100vh' }}>
    <PdfDocument />
  </PDFViewer>
);

export default PdfRenderer;
