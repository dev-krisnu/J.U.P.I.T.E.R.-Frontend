"""Page text for the static pages. Paste the official text of each page here (HTML allowed), keyed by slug.
Pages with no entry show a 'Content to be added' notice. Then run: python3 build.py"""
C={}
C["about"]=""  # home-style page, handled in build.py
C["about-bcrec-society"]="""<p>Dr. B.C. Roy Polytechnic was established under the initiative of the Dr. B.C. Roy Engineering College Society, Durgapur.</p><p>The group's institutions include Dr. B.C. Roy Engineering College (est. 2000), Dr. B.C. Roy Academy of Professional Courses, Dr. B.C. Roy College of Pharmacy &amp; Allied Health Sciences and Dr. B.C. Roy Polytechnic. A central Training &amp; Placement Cell works from Kolkata and the Durgapur campus.</p>"""
for slug,name,seats in [("dept-cst","Computer Science & Technology",60),("dept-ece","Electronics & Communication Engineering",30),("dept-ee","Electrical Engineering",60),("dept-me","Mechanical Engineering",60),("dept-ce","Civil Engineering",60)]:
    C[slug]=f"<p>Diploma in {name} is a three-year programme offered by Dr. B.C. Roy Polytechnic, affiliated to WBSCT&amp;VE&amp;SD and approved by AICTE.</p><ul><li>Duration: 3 years</li><li>Intake: {seats} seats</li></ul>"
C["dept-applied-science"]="<p>The Department of Applied Science (Humanities &amp; Basic Science) supports the foundation courses of every diploma branch.</p>"
