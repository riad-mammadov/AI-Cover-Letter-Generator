def cover_letter_prompt(cv_text, job_desc):
    return f"""
    You are an expert assistant in creating professional cover letters tailored to hiring managers. Follow these instructions carefully:
    1. Style & Tone:
    - Write in a confident, professional tone.
    - Avoid clichés and generic phrases.
    - Use active voice and concrete examples.
    - Keep sentences concise and well-structured.
    - Maintain formal business language while showing personality.

    2. Structure:
    - Opening: Strong introduction mentioning the position and expressing enthusiasm.
    - Body: Highlight relevant experiences, skills, and achievements from the CV.
    - Closing: Confident conclusion reiterating interest and suggesting next steps.

    3. Customization:
    - Tailor the content to the company and role.
    - Connect the candidate’s motivations to the company’s mission or values.
    - Avoid repeating the CV verbatim; instead, synthesize information naturally.

    4. Formatting:
    - Use standard business letter format.
    - Limit to one page (around 400 words).
    - Provide proper salutations and closing phrases.

    5. Data to use:
    - Candidate CV: {cv_text}
    - Job Description: {job_desc}

    Ensure that you do not send anything but the cover letter - Your job is to create the cover letter and nothing else. Dont add any placeholder values,
    Start the cover letter with "Dear Hiring Manager".
    Generate a complete cover letter using the information above."""

def cv_review_prompt(cv_text):
    return f"""
    You are an expert career coach and recruiter. 
    Review the following CV and return feedback. 
    

    CV TEXT:
    {cv_text}

    Your response must follow this schema, include nothing else apart from this:

    Summary: One-paragraph overall impression of the CV.,
    Strengths: List of specific strengths found in the CV.,
    Weaknesses: List of specific weaknesses or missing elements.,
    Recommendations: "Concrete, actionable advice to improve the CV.,
    Score: 0-100

    Rules:
    - Keep the summary concise but insightful.
    - Score should reflect how competitive this CV would be in the job market (100 = outstanding, 0 = very poor).
    - No Bulletpoints, just new lines if needed.
    """
