# Lab Explainer - Patient-Facing Lab Result Analysis Tool

![Lab Explainer](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## Overview

**Lab Explainer** is a patient-facing web application designed to demystify medical lab results and empower patients to have more informed conversations with their healthcare providers. The application translates complex medical jargon into simple, easy-to-understand language while maintaining scientific accuracy.

### Key Features

- **Simplified Explanations**: Translates complex medical terminology into patient-friendly language
- **Comprehensive Test Database**: Includes detailed information for 20+ common lab tests
- **MedlinePlus Integration**: Links to reputable medical resources for further reading
- **Smart Result Analysis**: Automatically highlights abnormal results and explains their significance
- **Doctor Visit Preparation**: Generates personalized questions to ask your healthcare provider
- **Printable Summary**: Creates a clean, professional handout to take to appointments
- **Educational Focus**: Explains what each test measures and why it matters
- **Empathetic Design**: Built with a compassionate, non-alarming tone to reduce anxiety

## Screenshots

### Main Input Interface
The application provides an intuitive form for entering lab results, with quick-select options for common tests.

### Analysis View
Results are categorized as normal or requiring attention, with detailed explanations for each test.

### Printable Summary
A professional PDF-ready summary that can be taken to doctor appointments.

## Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Type Safety**: Full TypeScript support

## Installation

### Prerequisites

- Node.js 18 or higher
- npm or yarn package manager

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/DPropst-Creatine/Claude-Code.git
   cd Claude-Code
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

## Usage Guide

### For Patients

1. **Enter Your Lab Results**
   - Use the input form to add your test results
   - You can either:
     - Type the test name manually
     - Use the quick-select dropdown to choose common tests
   - Fill in your value, unit, and the reference range (found on your lab report)

2. **Review Your Analysis**
   - View results categorized as "Normal" or "Need Attention"
   - Read plain-language explanations of what each test measures
   - Understand what high or low values might indicate
   - Access MedlinePlus links for additional trusted information

3. **Prepare for Your Doctor Visit**
   - Review the automatically generated questions
   - Print the summary to take with you
   - Use the notes section to record information during your appointment

4. **Print Your Summary**
   - Click the "Print Summary" button
   - Save as PDF or print a physical copy
   - Bring to your healthcare appointment

### Understanding Results

The application categorizes results into three statuses:

- **✓ Normal**: Your value falls within the expected healthy range
- **↑ High**: Your value is above the reference range
- **↓ Low**: Your value is below the reference range

Each abnormal result includes:
- What the test measures (in simple terms)
- Why the test is important
- What high/low values may indicate
- Links to authoritative medical resources

## Supported Lab Tests

The Lab Explainer currently includes detailed information for:

### Complete Blood Count (CBC)
- Hemoglobin (Hgb)
- Hematocrit (Hct)
- White Blood Cell Count (WBC)
- Platelet Count

### Metabolic Panel
- Blood Glucose
- Hemoglobin A1c (HbA1c)
- Sodium
- Potassium

### Kidney Function
- Creatinine
- Blood Urea Nitrogen (BUN)
- Estimated Glomerular Filtration Rate (eGFR)

### Liver Function
- Alanine Aminotransferase (ALT)
- Aspartate Aminotransferase (AST)
- Bilirubin

### Lipid Panel
- Total Cholesterol
- HDL Cholesterol ("Good" Cholesterol)
- LDL Cholesterol ("Bad" Cholesterol)
- Triglycerides

### Thyroid Function
- Thyroid Stimulating Hormone (TSH)
- Thyroxine (T4)

### Other Tests
- Vitamin D

## Build for Production

To create a production-ready build:

```bash
npm run build
```

The optimized files will be in the `dist` directory and can be deployed to any static hosting service.

### Deployment Options

- **Netlify**: Drag and drop the `dist` folder
- **Vercel**: Connect your repository for automatic deployments
- **GitHub Pages**: Use GitHub Actions to deploy
- **AWS S3**: Upload to an S3 bucket configured for static hosting

## Development

### Project Structure

```
Claude-Code/
├── src/
│   ├── components/
│   │   ├── LabResultInput.tsx      # Form for entering results
│   │   ├── LabResultAnalysis.tsx   # Main analysis display
│   │   ├── DoctorQuestions.tsx     # Generated questions
│   │   └── PrintableSummary.tsx    # Printable report
│   ├── data/
│   │   └── labTestDatabase.ts      # Medical test information
│   ├── types/
│   │   └── index.ts                # TypeScript type definitions
│   ├── App.tsx                      # Main application component
│   ├── main.tsx                     # Application entry point
│   └── index.css                    # Global styles
├── public/                          # Static assets
├── index.html                       # HTML template
├── package.json                     # Dependencies and scripts
├── tsconfig.json                    # TypeScript configuration
├── vite.config.ts                   # Vite configuration
└── tailwind.config.js               # Tailwind CSS configuration
```

### Adding New Tests

To add a new lab test to the database:

1. Open `src/data/labTestDatabase.ts`
2. Add a new entry following this structure:

```typescript
'test-key': {
  name: 'Full Test Name',
  commonNames: ['Abbreviation', 'Alternate Name'],
  description: 'What this test measures in simple terms',
  purpose: 'Why this test is important',
  normalRange: 'Normal values',
  highMeaning: 'What elevated levels might indicate',
  lowMeaning: 'What low levels might indicate',
  medlinePlusUrl: 'https://medlineplus.gov/...',
  category: 'blood' | 'metabolic' | 'kidney' | 'liver' | 'thyroid' | 'cardiac' | 'other'
}
```

### Running Tests

```bash
npm run lint    # Run ESLint
npm run build   # Build for production
```

## Important Disclaimers

### For Users

- **This tool is for educational purposes only**
- **It does not provide medical advice, diagnosis, or treatment**
- **Always consult with a qualified healthcare provider** about your lab results
- Lab results should be interpreted in the context of your complete medical history
- Some results may be affected by medications, recent meals, time of day, or other factors
- "Normal" results don't always mean everything is fine, and "abnormal" results don't always indicate a problem

### For Developers

- This application is intended to supplement, not replace, professional medical advice
- All medical information should be reviewed by qualified healthcare professionals
- The application should not be used for diagnostic purposes
- Consider adding appropriate legal disclaimers and privacy policies if deploying publicly
- Ensure compliance with healthcare regulations (HIPAA, GDPR, etc.) if handling real patient data

## Privacy and Security

The current version of Lab Explainer:

- **Does NOT store any data** on servers
- **Processes all information locally** in your browser
- **Does NOT transmit lab results** to any third party
- **Does NOT require login** or collect personal information

All data entered into the application exists only in your browser session and is cleared when you close the page.

### For Production Deployment

If you plan to deploy this application:

- Consider adding HTTPS encryption
- Implement proper privacy policies
- Ensure compliance with relevant healthcare regulations
- Consider adding data encryption if you add server-side features
- Add appropriate security headers

## Contributing

Contributions are welcome! Areas for improvement include:

- Adding more lab tests to the database
- Improving the question generation algorithm
- Adding multi-language support
- Implementing data export functionality (CSV, PDF)
- Adding visualizations for trends over time
- Creating a mobile app version

## Roadmap

Future enhancements planned:

- [ ] Support for uploading PDF lab reports with OCR
- [ ] Trend analysis for tests repeated over time
- [ ] Personalized recommendations based on age, sex, and health conditions
- [ ] Integration with electronic health records (EHR)
- [ ] Multi-language support
- [ ] Mobile native applications
- [ ] Educational videos and infographics
- [ ] Medication interaction checking

## License

MIT License - see LICENSE file for details

## Acknowledgments

- Medical information sourced from [MedlinePlus](https://medlineplus.gov/) - a trusted resource from the National Library of Medicine
- Built with modern web technologies to ensure accessibility and usability
- Designed with input from healthcare professionals and patient advocates

## Support

For questions, issues, or suggestions:

- Open an issue on GitHub
- Contact the development team
- Review the FAQ section (coming soon)

## Medical Resources

For more information about lab tests:

- [MedlinePlus Lab Tests](https://medlineplus.gov/lab-tests/)
- [National Institutes of Health](https://www.nih.gov/)
- [Centers for Disease Control and Prevention](https://www.cdc.gov/)

---

**Remember**: This tool is designed to help you understand your health better, but it's not a substitute for professional medical advice. Always discuss your results with your healthcare provider.

**Empowering patients through understanding** 💙
