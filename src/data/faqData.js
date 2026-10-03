// FAQ Data — Dr. Harshil Shah, Orthopaedic Surgeon
// Medically audited and structured for web accordions, search intent, and JSON-LD schema (British/Indian English)

export const FAQ_CATEGORIES = [
  'All Questions',
  'Appointments',
  'First Consultation',
  'Conditions & Treatments',
  'Surgery',
  'Recovery',
  'Second Opinion',
  'Reports & Scans',
  'Follow-up Care',
  'General',
];

export const faqData = [
  // ─── 1. APPOINTMENTS ─────────────────────────────────────────────────────────
  {
    id: 'appt-how-book',
    category: 'Appointments',
    question: 'How do I book an appointment with Dr. Harshil Shah?',
    answer:
      'You can schedule a consultation by completing the online appointment form on this website or by contacting the clinic via phone or WhatsApp at +91 78749 04030. The clinic desk will assist you in confirming a suitable date and consultation slot.',
    keywords: ['book appointment', 'online consultation', 'WhatsApp booking', 'Dr Harshil Shah appointment', 'Ahmedabad clinic'],
    featured: true,
  },
  {
    id: 'appt-walkin-vs-scheduled',
    category: 'Appointments',
    question: 'Can I visit the clinic without a prior appointment?',
    answer:
      'Booking in advance is strongly recommended to reduce waiting times and ensure sufficient time is allocated for your consultation. While walk-in patients are accommodated when clinic schedules permit, booked appointments receive priority.',
    keywords: ['walk-in appointment', 'prior booking', 'clinic timing', 'consultation slot'],
  },
  {
    id: 'appt-family-booking',
    category: 'Appointments',
    question: 'Can I book an appointment on behalf of an elderly parent or family member?',
    answer:
      'Yes, you can schedule an appointment for a family member. Please share their name, age, primary joint concern, and any mobility considerations when requesting the slot so appropriate clinic arrangements can be made.',
    keywords: ['book for parents', 'elderly care', 'family appointment', 'knee pain booking'],
  },
  {
    id: 'appt-reschedule-cancel',
    category: 'Appointments',
    question: 'What should I do if I need to reschedule or cancel my appointment?',
    answer:
      'If you need to change your consultation time, please inform the clinic at least 24 hours in advance by phone or WhatsApp message. This helps the clinic offer the slot to another patient and arrange a convenient alternate time for you.',
    keywords: ['reschedule appointment', 'cancel consultation', 'change booking timing'],
  },
  {
    id: 'appt-joint-symptoms-booking',
    category: 'Appointments',
    question: 'I have persistent knee, hip or shoulder pain. When is the right time to book a consultation?',
    answer:
      'You should consider consulting if pain persists beyond 1 to 2 weeks, restricts everyday activities such as walking, stair climbing or lifting, is accompanied by swelling or instability, or wakes you at night. Early evaluation helps determine conservative, non-surgical treatment options.',
    keywords: ['knee pain doctor', 'hip stiffness clinic', 'shoulder pain consultation', 'early joint care'],
  },
  {
    id: 'appt-same-day-urgent',
    category: 'Appointments',
    question: 'Can I request an urgent or same-day appointment for acute joint pain or a recent sports injury?',
    answer:
      'Urgent consultation requests for severe pain, sudden joint locking, or acute sports injuries are prioritized whenever the clinic schedule allows. Please contact the clinic directly by phone for urgent scheduling assistance.',
    keywords: ['urgent orthopaedic appointment', 'acute joint pain', 'emergency bone injury'],
  },
  {
    id: 'appt-outstation-patients',
    category: 'Appointments',
    question: 'How should outstation patients plan their visit to Ahmedabad for consultation?',
    answer:
      'Patients traveling from outside Ahmedabad are encouraged to contact the clinic beforehand. Sharing previous reports and scan summaries in advance allows me to coordinate consultation timing and any necessary on-day evaluations efficiently.',
    keywords: ['outstation patient appointment', 'Ahmedabad orthopaedic visit', 'travel consultation planning'],
  },
  {
    id: 'appt-sports-injury-timing',
    category: 'Appointments',
    question: 'Can I consult Dr. Harshil Shah for an acute sports injury or a long-standing old injury?',
    answer:
      'Consultations are available for fresh sports injuries, such as sudden ligament tears or shoulder dislocations, as well as chronic or poorly healed joint problems. A clinical evaluation helps establish an accurate diagnosis and appropriate recovery plan.',
    keywords: ['sports injury consultation', 'old joint injury', 'ACL tear specialist', 'rotator cuff doctor'],
  },
  {
    id: 'appt-urgent-attention',
    category: 'Appointments',
    question: 'What should I do if my joint pain or injury requires urgent attention?',
    answer:
      'For acute, severe pain or sudden injuries, contact the clinic line at +91 78749 04030 to check for an expedited consultation slot. If you experience major trauma, visible deformity, numbness, weakness, loss of sensation, a cold or pale limb, or breathing difficulty, proceed directly to the nearest hospital emergency department.',
    keywords: ['urgent orthopaedic appointment', 'acute joint pain', 'emergency bone injury'],
  },

  // ─── 2. FIRST CONSULTATION ───────────────────────────────────────────────────
  {
    id: 'first-expect',
    category: 'First Consultation',
    question: 'What should I expect during my first consultation with Dr. Harshil Shah?',
    answer:
      'Your initial visit involves a discussion of your symptoms, medical history, and daily physical demands, followed by a focused examination of joint movement, strength, stability, and function. Dr. Shah will discuss the findings in clear terms and explain appropriate next steps.',
    keywords: ['first orthopaedic visit', 'consultation process', 'joint examination', 'clinical assessment'],
    featured: true,
  },
  {
    id: 'first-bring',
    category: 'First Consultation',
    question: 'What medical reports or previous scans should I bring to my first appointment?',
    answer:
      'Please bring existing X-ray films, MRI or CT scan discs/films, written radiology reports, relevant blood tests, your current medication list, and any previous surgical summaries. Bringing previous reports and scans may help avoid unnecessary repeat investigations and gives the doctor a clearer understanding of your previous treatment.',
    keywords: ['documents to carry', 'medical records', 'MRI disc', 'previous prescriptions'],
  },
  {
    id: 'first-scan-needed',
    category: 'First Consultation',
    question: 'Should I get an X-ray or MRI done before my first visit?',
    answer:
      'Getting new scans before your visit is not mandatory. If you have previous imaging, bring it with you. If updated or specific X-ray views are needed, Dr. Shah will recommend them after completing your clinical examination.',
    keywords: ['scans before appointment', 'need MRI first', 'pre-consultation X-ray'],
  },
  {
    id: 'first-explain-symptoms',
    category: 'First Consultation',
    question: 'How can I best describe my joint pain and symptoms during the visit?',
    answer:
      'Describe when the pain began, its specific location, whether it occurs during rest or activity, and what triggers or eases it. Mentioning associated symptoms such as stiffness, swelling, clicking, or giving way helps provide an accurate clinical picture.',
    keywords: ['describing joint pain', 'symptom history', 'joint stiffness explanation'],
  },
  {
    id: 'first-tests-after',
    category: 'First Consultation',
    question: 'Will I need further diagnostic tests after the initial consultation?',
    answer:
      'Targeted tests may be suggested depending on examination findings. These can include weight-bearing X-rays to assess joint alignment, an MRI to examine soft tissues such as ligaments or cartilage, or blood tests if inflammatory joint conditions are being evaluated.',
    keywords: ['tests after consultation', 'weight-bearing X-ray', 'MRI joint evaluation'],
  },
  {
    id: 'first-treatment-start',
    category: 'First Consultation',
    question: 'Will treatment begin during my first visit?',
    answer:
      'Initial guidance frequently begins during the first consultation. This may involve pain relief medications, activity modification, supportive bracing, or home care advice. If further diagnostic imaging is required, a definitive plan is established once those results are reviewed.',
    keywords: ['start treatment day one', 'initial pain relief', 'orthopaedic prescription'],
  },
  {
    id: 'first-non-surgical-options',
    category: 'First Consultation',
    question: 'Can I discuss non-surgical treatment options before considering surgery?',
    answer:
      'Non-operative management—such as physiotherapy, targeted strengthening, lifestyle modifications, medications, and selective joint injections—is carefully evaluated and prioritised whenever clinically appropriate for your condition.',
    keywords: ['non-surgical options', 'conservative treatment', 'avoid surgery', 'physiotherapy first'],
    featured: true,
  },
  {
    id: 'first-family-member',
    category: 'First Consultation',
    question: 'Can a family member or caregiver accompany me into the consultation room?',
    answer:
      'You are welcome to bring a family member or companion. Having someone with you can provide support, help remember medical details, and participate in discussions about your treatment choices.',
    keywords: ['family member consultation', 'attendant in clinic', 'caregiver support'],
  },

  // ─── 3. CONDITIONS & TREATMENTS ──────────────────────────────────────────────
  {
    id: 'treatment-conditions',
    category: 'Conditions & Treatments',
    question: 'What orthopaedic conditions does Dr. Harshil Shah treat?',
    answer:
      'Dr. Harshil Shah focuses on joint preservation, arthroscopy, and joint reconstruction for conditions of the knee, hip, and shoulder. This includes osteoarthritis, ligament sprains and tears, meniscus injuries, rotator cuff problems, shoulder instability, frozen shoulder, and sports-related joint injuries.',
    keywords: ['orthopaedic conditions treated', 'knee specialist Ahmedabad', 'hip doctor', 'shoulder surgeon'],
    featured: true,
  },
  {
    id: 'treatment-no-surgery',
    category: 'Conditions & Treatments',
    question: 'Which knee, hip and shoulder problems can be managed without surgery?',
    answer:
      'Many joint conditions—including early-to-moderate osteoarthritis, mild rotator cuff irritation, frozen shoulder, bursitis, partial ligament sprains, and minor meniscus tears—can often be managed effectively with physiotherapy, strengthening, activity changes, medications, or selected injections.',
    keywords: ['treat joint pain without surgery', 'knee arthritis non-surgical', 'frozen shoulder treatment'],
    featured: true,
  },
  {
    id: 'treatment-joint-replacement-indication',
    category: 'Conditions & Treatments',
    question: 'When is joint replacement surgery typically considered?',
    answer:
      'Joint replacement may be considered for appropriately selected patients with advanced joint damage when pain, stiffness, and reduced mobility significantly affect everyday life and appropriate non-surgical treatment is no longer providing adequate relief.',
    keywords: ['when is knee replacement needed', 'hip replacement indication', 'advanced arthritis surgery'],
  },
  {
    id: 'treatment-arthritis-options',
    category: 'Conditions & Treatments',
    question: 'What treatment options are available for arthritis and chronic joint pain?',
    answer:
      'Treatment depends on arthritis severity. Early stages focus on weight management, low-impact exercise, and medications. Moderate symptoms may benefit from structured physiotherapy or selected joint injections. Advanced joint wear may be addressed with partial or total joint replacement when conservative care is no longer sufficient.',
    keywords: ['arthritis treatment options', 'knee arthritis relief', 'joint preservation'],
  },
  {
    id: 'treatment-sports-ligament-care',
    category: 'Conditions & Treatments',
    question: 'How are sports injuries and ligament tears evaluated and treated?',
    answer:
      'Management depends on the specific injury, joint stability, patient age, activity goals, and examination findings. Some injuries respond well to structured rehabilitation, while selected injuries that cause significant instability or loss of function may benefit from arthroscopic repair or reconstruction.',
    keywords: ['sports injury treatment', 'ACL tear repair', 'rotator cuff surgery', 'arthroscopic surgery'],
  },
  {
    id: 'treatment-shoulder-problems',
    category: 'Conditions & Treatments',
    question: 'What treatments are available for shoulder pain, stiffness or recurrent dislocations?',
    answer:
      'Treatment depends on the underlying cause. Options include targeted physiotherapy for tendon inflammation, hydrodilatation for frozen shoulder, or arthroscopic procedures such as rotator cuff repair or Bankart repair for structural instability.',
    keywords: ['shoulder pain treatment', 'frozen shoulder care', 'shoulder dislocation repair', 'Bankart repair'],
  },
  {
    id: 'treatment-surgery-vs-physio',
    category: 'Conditions & Treatments',
    question: 'How is it determined whether I need surgery or physiotherapy?',
    answer:
      'The decision is guided by clinical examination, symptom severity, functional limitation, and imaging findings. When joint mechanics and stability are preserved, physiotherapy is typically the initial choice. Surgery is discussed when structural correction is required or when non-surgical therapy is inadequate.',
    keywords: ['physiotherapy vs surgery', 'surgery decision making', 'conservative care vs operation'],
  },
  {
    id: 'treatment-personalized-plans',
    category: 'Conditions & Treatments',
    question: 'How are treatment plans customised for individual patients?',
    answer:
      'Every treatment plan is tailored to your specific diagnosis, age, physical demands, occupational requirements, and general health. This ensures recommendations are practical, safe, and aligned with your individual recovery goals.',
    keywords: ['personalised orthopaedic care', 'custom treatment plan', 'patient-centered joint care'],
  },

  // ─── 4. SURGERY ──────────────────────────────────────────────────────────────
  {
    id: 'surgery-when-indicated',
    category: 'Surgery',
    question: 'How do I know if surgery is the right option for my condition?',
    answer:
      'Surgery is considered when non-operative treatments fail to provide adequate relief, when structural instability impairs function, or when an injury requires repair of the damaged structure. Dr. Shah will review expected benefits, potential limitations, and alternatives to help you make an informed decision.',
    keywords: ['is surgery right for me', 'orthopaedic surgery decision', 'surgical options discussion'],
    featured: true,
  },
  {
    id: 'surgery-preparation-guide',
    category: 'Surgery',
    question: 'What should I do to prepare before undergoing orthopaedic surgery?',
    answer:
      'Preparation involves optimising general health, managing blood sugar and blood pressure, attending a pre-anaesthetic evaluation, and performing pre-operative exercises where recommended. You will also receive guidance regarding medication adjustments, home safety preparations, and fasting instructions.',
    keywords: ['surgery preparation', 'pre-op instructions', 'prehabilitation', 'pre-surgery checklist'],
  },
  {
    id: 'surgery-preop-tests',
    category: 'Surgery',
    question: 'What medical evaluations and laboratory tests are required prior to surgery?',
    answer:
      'Pre-operative investigations vary according to your age, medical history, planned procedure, anaesthesia requirements, and existing health conditions. Common tests may include blood counts, blood sugar/HbA1c, kidney and liver function tests, a coagulation profile, an ECG, chest imaging, and a pre-anaesthetic checkup.',
    keywords: ['pre-operative tests', 'PAC clearance', 'surgical fitness test', 'blood tests before surgery'],
  },
  {
    id: 'surgery-procedure-duration',
    category: 'Surgery',
    question: 'How long does joint replacement or arthroscopic surgery usually take?',
    answer:
      'As a general range, many arthroscopic procedures take approximately 45 to 90 minutes, while primary joint replacements commonly take 60 to 90 minutes. Operating time varies depending on procedure complexity, anatomy, and individual surgical requirements, alongside time spent in preparation and recovery monitoring.',
    keywords: ['surgery duration', 'how long knee replacement takes', 'arthroscopy surgery time'],
  },
  {
    id: 'surgery-hospital-stay',
    category: 'Surgery',
    question: 'How long will I need to stay in the hospital after surgery?',
    answer:
      'Hospital stay depends on the procedure, medical condition, mobility, pain control, and recovery progress. Many arthroscopic procedures are performed on a day-care basis or with an overnight stay, whereas joint replacement patients commonly stay 2 to 3 days until discharge criteria are comfortably met.',
    keywords: ['hospital stay duration', 'discharge after knee replacement', 'daycare arthroscopy'],
  },
  {
    id: 'surgery-early-mobility',
    category: 'Surgery',
    question: 'When can I start standing or walking after joint surgery?',
    answer:
      'Many patients are encouraged to begin supported movement relatively early after surgery when medically appropriate, under structured clinical guidance and individual evaluation. For joint replacement, guided standing or walking with a supportive aid often begins within 24 hours based on individual assessment.',
    keywords: ['walking after joint surgery', 'early mobilization', 'ERAS protocol walking'],
  },
  {
    id: 'surgery-risks-safety',
    category: 'Surgery',
    question: 'What are the potential risks and safety precautions associated with orthopaedic surgery?',
    answer:
      'Orthopaedic procedures are commonly performed using established safety protocols, but every surgical procedure carries potential risks. These may include infection, blood clots, stiffness, nerve irritation, or implant wear over time. Standard preventive measures, medications, and early rehabilitation are used to minimise these risks.',
    keywords: ['surgery risks', 'orthopaedic complications', 'surgical safety protocols'],
  },
  {
    id: 'surgery-recovery-overview',
    category: 'Surgery',
    question: 'How long does overall recovery usually take after orthopaedic surgery?',
    answer:
      'Initial wound healing typically occurs within 2 to 3 weeks. Basic daily independence is often achieved in 4 to 6 weeks, while joint strength, flexibility, and endurance continue to develop over several months. Recovery varies according to the procedure, individual health, and rehabilitation progress.',
    keywords: ['overall recovery timeline', 'healing time after surgery', 'long-term recovery'],
  },

  // ─── 5. RECOVERY ─────────────────────────────────────────────────────────────
  {
    id: 'recovery-timeline-general',
    category: 'Recovery',
    question: 'How long does recovery usually take after orthopaedic surgery?',
    answer:
      'Recovery timelines vary according to the procedure, overall health, and rehabilitation progress. Broadly, early supported mobility begins in weeks 1–2, light daily activities are commonly resumed around weeks 4–6, and strength continues to improve over 3 to 6 months.',
    keywords: ['recovery time orthopaedic surgery', 'healing milestones', 'rehabilitation timeline'],
    featured: true,
  },
  {
    id: 'recovery-walking-progression',
    category: 'Recovery',
    question: 'When can I start walking independently after surgery?',
    answer:
      'Supported walking with a walker or elbow crutches typically begins shortly after surgery under physiotherapy supervision. Progressing to a walking stick and eventually unassisted walking commonly occurs over 2 to 6 weeks, depending on joint stability, muscle strength, and clinical assessment.',
    keywords: ['walking unassisted after surgery', 'walker to stick transition', 'post-op walking steps'],
  },
  {
    id: 'recovery-return-to-work',
    category: 'Recovery',
    question: 'How soon can I return to work and normal household activities?',
    answer:
      'Patients with desk-based occupations often resume work within 2 to 4 weeks. Those with physically demanding jobs or prolonged standing requirements may require 8 to 12 weeks or longer, guided by functional recovery and clinical review.',
    keywords: ['return to work after surgery', 'resuming office work', 'daily household activities post-op'],
  },
  {
    id: 'recovery-physiotherapy-importance',
    category: 'Recovery',
    question: 'Will I need physiotherapy during my recovery?',
    answer:
      'Physiotherapy is commonly an important part of recovery, although the type, timing, and intensity of rehabilitation depend on the procedure and individual progress. It aids in improving movement, restoring muscle strength, improving walking mechanics, and supporting a safe return to daily activities.',
    keywords: ['physiotherapy after surgery', 'rehabilitation exercises', 'post-op physical therapy'],
  },
  {
    id: 'recovery-pain-swelling-control',
    category: 'Recovery',
    question: 'How can I manage pain and swelling at home after surgery?',
    answer:
      'Pain and swelling are typically managed using prescribed medications, intermittent cold therapy (15–20 minutes at a time), elevating the limb above heart level during rest, and performing gentle circulatory exercises such as ankle pumps as instructed by me during your care.',
    keywords: ['manage pain at home', 'swelling control after surgery', 'ice therapy post-op'],
  },
  {
    id: 'recovery-precautions-dos-donts',
    category: 'Recovery',
    question: 'What movements or activities should I avoid during early recovery?',
    answer:
      'Avoid high-impact activities, sudden twisting movements, heavy lifting, and low floor seating unless specifically cleared. Keep the surgical dressing clean and dry until wound healing is confirmed during your clinical review.',
    keywords: ['activities to avoid after surgery', 'post-surgery precautions', 'joint movement restrictions'],
  },
  {
    id: 'recovery-driving-sports-timeline',
    category: 'Recovery',
    question: 'When is it safe to resume driving, exercise, or sports?',
    answer:
      'Driving is generally resumed when you have regained adequate leg strength, emergency braking reflexes, and are no longer taking sedating medications, commonly around 4 to 6 weeks. Low-impact exercise begins earlier, while sports participation requires tailored clinical clearance.',
    keywords: ['driving after knee surgery', 'return to sports timeline', 'exercise after joint replacement'],
  },
  {
    id: 'recovery-warning-signs-contact',
    category: 'Recovery',
    question: 'What warning signs should prompt me to contact the doctor during recovery?',
    answer:
      'Contact the clinic promptly if you notice persistent high fever, severe pain not relieved by medication, spreading redness or continuous drainage from the surgical site, sudden calf pain or swelling, or unexpected breathing difficulty.',
    keywords: ['post-surgery warning signs', 'complications after surgery', 'when to call doctor'],
  },

  // ─── 6. SECOND OPINION ───────────────────────────────────────────────────────
  {
    id: 'second-opinion-when',
    category: 'Second Opinion',
    question: 'When should I consider seeking a second orthopaedic opinion?',
    answer:
      'A second opinion can be helpful when surgery has been advised, if your diagnosis remains unclear, when current treatments have not provided relief, or when you wish to explore whether non-surgical options remain suitable for your joint condition.',
    keywords: ['second opinion orthopaedics', 'confirm surgery need', 'second opinion doctor Ahmedabad'],
    featured: true,
  },
  {
    id: 'second-opinion-surgery-decision',
    category: 'Second Opinion',
    question: 'Can I seek a second opinion before deciding on joint surgery?',
    answer:
      'A second opinion can provide another specialist perspective on your diagnosis, available treatment options, and whether surgery may be appropriate, helping you make a well-informed decision with confidence.',
    keywords: ['second opinion before surgery', 'elective joint surgery review', 'confirming diagnosis'],
  },
  {
    id: 'second-opinion-records-needed',
    category: 'Second Opinion',
    question: 'What documents, scans, and records should I bring for a second opinion consultation?',
    answer:
      'Bring your available X-rays, MRI or CT scans with discs and reports, previous prescription notes, and any discharge summaries or operative notes from previous procedures to facilitate a comprehensive review.',
    keywords: ['documents for second opinion', 'bring MRI scans', 'medical records review'],
  },
  {
    id: 'second-opinion-review-external-advice',
    category: 'Second Opinion',
    question: 'Can Dr. Harshil Shah review a surgical recommendation given by another doctor?',
    answer:
      'Dr. Shah regularly provides objective clinical reviews of previous treatment recommendations, evaluating your current symptoms, physical examination findings, and diagnostic imaging.',
    keywords: ['review doctor recommendation', 'independent surgical opinion', 'unbiased second opinion'],
  },
  {
    id: 'second-opinion-explore-conservative',
    category: 'Second Opinion',
    question: 'Can a second opinion help me understand non-surgical alternatives?',
    answer:
      'A second opinion can help clarify whether non-operative management—such as structured physiotherapy, lifestyle changes, or targeted joint injections—remains a viable initial approach before proceeding with surgery.',
    keywords: ['explore non-surgical options', 'avoid unnecessary surgery', 'conservative alternatives'],
  },
  {
    id: 'second-opinion-different-advice',
    category: 'Second Opinion',
    question: 'What should I do if the second opinion differs from my previous doctor’s advice?',
    answer:
      'If recommendations differ, Dr. Shah can explain the reasoning behind his assessment, discussing the advantages, limitations, and evidence for each approach so you can better understand the available choices.',
    keywords: ['differing medical opinions', 'choosing treatment path', 'medical reasoning explanation'],
  },
  {
    id: 'second-opinion-post-surgery-issues',
    category: 'Second Opinion',
    question: 'Can I get a second opinion for persistent pain or stiffness following a previous surgery?',
    answer:
      'Patients experiencing ongoing discomfort, stiffness, or functional limitations after previous orthopaedic procedures can arrange an evaluation to investigate possible causes and discuss appropriate rehabilitation or corrective management.',
    keywords: ['pain after previous surgery', 'stiffness after knee surgery', 'revision consultation'],
  },
  {
    id: 'second-opinion-repeat-scans-needed',
    category: 'Second Opinion',
    question: 'Will I need to repeat all my X-rays, MRI scans, or blood tests for a second opinion?',
    answer:
      'Not necessarily. If existing scans are clear and recent, they can generally be used. Repeat or additional tests are only recommended if previous imaging is inconclusive or if your symptoms have significantly changed.',
    keywords: ['repeat tests second opinion', 'avoid duplicate scans', 'using existing MRI'],
  },

  // ─── 7. REPORTS & SCANS ──────────────────────────────────────────────────────
  {
    id: 'reports-checklist-to-bring',
    category: 'Reports & Scans',
    question: 'Which reports and scans should I bring to my orthopaedic consultation?',
    answer:
      'Bring all available original X-ray films, MRI or CT scan discs and films, written radiology reports, relevant blood investigation results, and past doctor prescriptions or medical summaries.',
    keywords: ['reports checklist', 'what scans to bring', 'MRI CD', 'radiology reports'],
  },
  {
    id: 'reports-fresh-scans-requirement',
    category: 'Reports & Scans',
    question: 'Do I need a new X-ray, MRI, or CT scan before attending my appointment?',
    answer:
      'You do not need to arrange new scans prior to your appointment. Bring your existing reports; if updated or specific X-ray views are needed, Dr. Shah will advise the specific views required after your clinical examination.',
    keywords: ['fresh scans before appointment', 'do I need new MRI', 'pre-visit imaging'],
  },
  {
    id: 'reports-external-imaging-review',
    category: 'Reports & Scans',
    question: 'Can Dr. Harshil Shah review imaging and scan reports done at another hospital or diagnostic centre?',
    answer:
      'Diagnostic imaging, digital X-rays, and MRI or CT scans performed at any accredited hospital or diagnostic centre can be reviewed during your consultation.',
    keywords: ['review external scans', 'scans from another hospital', 'diagnostic centre MRI'],
  },
  {
    id: 'reports-xray-mri-ct-differences',
    category: 'Reports & Scans',
    question: 'What is the difference between an X-ray, MRI, and CT scan for joint problems?',
    answer:
      'An X-ray shows bones, joint alignment, fractures, and many arthritis-related changes. An MRI provides detailed information about soft tissues including ligaments, tendons, menisci, and cartilage. A CT scan provides detailed cross-sectional bone imaging and may help with complex fractures, deformities, or surgical planning.',
    keywords: ['difference between X-ray and MRI', 'CT scan vs MRI joint', 'imaging modalities explained'],
  },
  {
    id: 'reports-scan-validity-timeline',
    category: 'Reports & Scans',
    question: 'How recent should my X-rays or MRI scans be to remain clinically useful?',
    answer:
      'How recent an X-ray, MRI, or CT scan needs to be depends on the condition being assessed, whether your symptoms have changed, the quality of the existing images, and whether there has been a new injury. If symptoms are stable, previous imaging may still be useful. Updated imaging may be advised when symptoms have significantly changed or when existing scans do not provide sufficient information.',
    keywords: ['how old can MRI be', 'validity of X-ray', 'recent scan requirement'],
  },
  {
    id: 'reports-treatment-planning-from-scans',
    category: 'Reports & Scans',
    question: 'Can a treatment plan be determined solely based on scan reports?',
    answer:
      'Treatment decisions should not be based on imaging alone; symptoms, examination findings, and functional limitations are considered together to determine the most suitable care plan.',
    keywords: ['treating patient not scan', 'clinical correlation', 'physical exam vs MRI'],
  },
  {
    id: 'reports-inconclusive-scans-approach',
    category: 'Reports & Scans',
    question: 'What happens if my MRI or X-ray report does not clearly explain my symptoms?',
    answer:
      'When scan findings do not clearly match symptoms, clinical joint examination remains central to decision-making. Dr. Shah may perform specialised physical tests, evaluate how the joint moves and functions, or recommend targeted views to pinpoint the source of pain.',
    keywords: ['unclear MRI report', 'normal scan but pain', 'clinical joint diagnosis'],
  },
  {
    id: 'reports-images-and-written-report-together',
    category: 'Reports & Scans',
    question: 'Should I bring both the scan images (films/CD) and the written radiology report?',
    answer:
      'Bringing both is helpful. The written report provides the radiologist’s interpretation, while an orthopaedic surgeon routinely reviews the actual image slices directly to correlate specific anatomical findings with your physical examination and surgical planning.',
    keywords: ['bring films and report', 'DICOM CD review', 'radiology report with images'],
    featured: true,
  },

  // ─── 8. FOLLOW-UP CARE ───────────────────────────────────────────────────────
  {
    id: 'followup-first-visit-timing',
    category: 'Follow-up Care',
    question: 'When should I schedule my first follow-up appointment after surgery or treatment?',
    answer:
      'After surgery, the first review is commonly planned around 10 to 14 days for wound inspection and dressing or suture review. For non-surgical treatments, a follow-up at 2 to 4 weeks is typical to evaluate symptom response and adjust physiotherapy.',
    keywords: ['first follow-up after surgery', 'suture removal timing', 'post-op wound check'],
  },
  {
    id: 'followup-checklist-to-bring',
    category: 'Follow-up Care',
    question: 'What should I bring to my follow-up consultation?',
    answer:
      'Please bring your hospital discharge summary, current medication list, any recent check X-rays or test reports, and a brief note of your rehabilitation progress or questions.',
    keywords: ['what to carry for follow-up', 'discharge summary review', 'follow-up checklist'],
  },
  {
    id: 'followup-frequency-schedule',
    category: 'Follow-up Care',
    question: 'How often will I need follow-up visits during my recovery?',
    answer:
      'Follow-up schedules vary according to the procedure and individual recovery. I will advise when reviews are required, with common milestones after joint surgery including visits around 2 weeks, 6 weeks, 3 months, and periodically thereafter as needed.',
    keywords: ['follow-up visit schedule', 'post-op review frequency', 'recovery checkups'],
  },
  {
    id: 'followup-repeat-xrays-scans',
    category: 'Follow-up Care',
    question: 'Will I need repeat X-rays or scans during my follow-up visits?',
    answer:
      'Check X-rays may be advised at specific recovery stages to evaluate bone healing, implant alignment, or tissue integration. Additional imaging is only recommended if new or unexpected symptoms occur.',
    keywords: ['check X-rays after surgery', 'implant monitoring X-ray', 'bone healing review'],
  },
  {
    id: 'followup-progress-assessment-methods',
    category: 'Follow-up Care',
    question: 'How will my recovery progress be assessed during follow-up visits?',
    answer:
      'Assessment involves examining wound healing, joint range of motion, muscle strength, walking stability, and reduction in pain compared to pre-treatment levels.',
    keywords: ['assessing recovery progress', 'joint range of motion test', 'post-op evaluation'],
  },
  {
    id: 'followup-adjusting-meds-physio',
    category: 'Follow-up Care',
    question: 'Can my medications or physiotherapy plan be adjusted during follow-up?',
    answer:
      'Follow-up visits allow your doctor to taper pain medications as healing progresses, adjust therapeutic exercises, and advance your rehabilitation program toward higher activity levels.',
    keywords: ['tapering pain medicines', 'adjusting physiotherapy exercises', 'rehab progression'],
  },
  {
    id: 'followup-symptoms-to-report-early',
    category: 'Follow-up Care',
    question: 'What symptoms should I report to the clinic before my next scheduled follow-up?',
    answer:
      'Contact the clinic promptly between scheduled appointments if you experience escalating pain, persistent fever, unexpected wound discharge or redness, new calf swelling, or sudden loss of joint mobility.',
    keywords: ['early symptom reporting', 'post-op concerns', 'contact clinic between visits'],
  },
  {
    id: 'followup-activity-clearance-assessment',
    category: 'Follow-up Care',
    question: 'When can I receive clearance to return to driving, work, or sports?',
    answer:
      'Clearances for driving, work resumption, swimming, gym, and sports are determined during follow-up reviews based on clinical assessments of muscle strength, joint mobility, reaction time, and stability.',
    keywords: ['activity clearance', 'driving clearance', 'return to work approval', 'sports clearance'],
  },

  // ─── 9. GENERAL ─────────────────────────────────────────────────────────────
  {
    id: 'general-specialty-scope',
    category: 'General',
    question: 'What types of orthopaedic problems does Dr. Harshil Shah specialise in?',
    answer:
      'Dr. Harshil Shah specialises in joint preservation, arthroscopy, and joint reconstruction of the knee, hip, and shoulder. His practice includes arthritis management, joint replacement, sports ligament injuries, rotator cuff disorders, and joint trauma care.',
    keywords: ['Dr Harshil Shah specialty', 'joint replacement Ahmedabad', 'arthroscopy specialist'],
  },
  {
    id: 'general-when-to-see-specialist',
    category: 'General',
    question: 'When should I consult an orthopaedic specialist rather than managing pain at home?',
    answer:
      'Consider an orthopaedic assessment when joint pain persists, progressively worsens, affects sleep or daily activity, or is accompanied by swelling, instability, locking, or difficulty bearing weight.',
    keywords: ['when to see orthopaedic doctor', 'chronic joint pain specialist', 'joint swelling advice'],
  },
  {
    id: 'general-conservative-success',
    category: 'General',
    question: 'Can most joint problems be managed effectively without surgery?',
    answer:
      'Many orthopaedic conditions respond well to non-surgical treatments—including structured physiotherapy, muscle strengthening, weight management, medications, and targeted injections—reserving surgery for specific structural or advanced conditions.',
    keywords: ['managing joint pain without surgery', 'conservative orthopaedic care', 'avoiding surgery'],
  },
  {
    id: 'general-age-factor-treatment',
    category: 'General',
    question: 'Does patient age affect orthopaedic treatment options?',
    answer:
      'Treatment decisions are based on the diagnosis, overall health, bone and joint condition, activity level, symptoms, functional needs, and personal goals rather than age alone. Age is one factor considered as part of the overall clinical assessment.',
    keywords: ['age factor in orthopaedics', 'joint replacement age limits', 'young patient joint care'],
  },
  {
    id: 'general-lifestyle-joint-health',
    category: 'General',
    question: 'Can lifestyle modifications and exercise help reduce joint pain?',
    answer:
      'Maintaining a healthy body weight reduces mechanical stress on weight-bearing joints like the knees and hips. Low-impact activities such as swimming, cycling, and walking help maintain joint flexibility and strengthen supporting muscles.',
    keywords: ['lifestyle for joint health', 'weight loss for knee pain', 'exercise for arthritis'],
  },
  {
    id: 'general-preventing-injuries',
    category: 'General',
    question: 'How can I prevent joint and sports-related injuries during daily activities or exercise?',
    answer:
      'Injury prevention includes proper warm-ups, progressive exercise conditioning, strengthening core and joint stabilizer muscles, using supportive footwear, and avoiding sudden, unaccustomed spikes in physical training.',
    keywords: ['prevent sports injury', 'joint protection tips', 'safe exercise habits'],
  },
  {
    id: 'general-serious-pain-indicators',
    category: 'General',
    question: 'How do I know if my joint pain indicates a serious underlying problem?',
    answer:
      'Joint pain is more concerning if accompanied by joint deformity, inability to bear weight, significant swelling, fever, localised warmth, or a sensation of the joint locking or giving way. These signs warrant timely medical evaluation.',
    keywords: ['serious joint pain signs', 'joint locking', 'cannot walk knee pain'],
  },
  {
    id: 'general-sudden-symptom-worsening',
    category: 'General',
    question: 'What should I do if my joint symptoms suddenly become noticeably worse?',
    answer:
      'Rest the joint, apply cold packs, elevate the limb, and contact the clinic for advice. If accompanied by severe trauma, inability to bear weight, or visible deformity, seek urgent emergency medical attention.',
    keywords: ['sudden joint pain worsening', 'acute knee flareup', 'emergency joint care'],
  },
];

// Featured questions shown in the "Most Asked" section
export const featuredFaqIds = [
  'appt-how-book',
  'first-expect',
  'treatment-conditions',
  'treatment-no-surgery',
  'surgery-when-indicated',
  'second-opinion-when',
];
