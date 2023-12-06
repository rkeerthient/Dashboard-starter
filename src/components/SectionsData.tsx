export const SectionData = [
  // {
  //   description:
  //     "Please review the attestation below and confirm your agreement in order to receive leads from Advisor Match.",
  //   name: "Test - picklist",
  //   tasks: [
  //     {
  //       field: "c_attestation",
  //       name: "Attestation*",
  //       question:
  //         'To participate in receiving leads from the Advisor Match Program , you must read and agree to be bound by the <a href="http://policy.bankofamerica.com/content/vcm/static/pmt08020001/GWIM%20Procedure%20Manuals/MLWM%20US%20Procedure%20Manual/Misc%20Processing/DefinedProgramForTheDistributionOfLeadsAndReferralsToGWIM.pdf" target="_blank"> Lead-Referral Distribution Program Policy Document </a>and the <a href="http://resourcecentral.bankofamerica.com/GrowthandAcquisitionDocuments/Bank%20Referral%20Program_Terms_and_Conditions_07-10-2020.pdf" target="_blank">Agreement for Participation in Bank Referral Programs</a> (the "Terms and Conditions" document). You have an obligation to determine the most suitable solution for each prospect/client by assessing client needs, client preference for advice, and client investable asset level. Prospects/clients who prefer a self-directed solution or an advised solution with limited oversight should be referred to Consumer Investments.\n\nIn addition, you agree to 1) attempt to contact the lead within 48 hours and 2) update the ‘Lead Status” field within Salesforce after attempting initial contact.\n\nSelect “I agree” if you have reviewed the materials and understand your obligations.',
  //     },
  //   ],
  // },
  // {
  //   description:
  //     "Please review the attestation below and confirm your agreement in order to receive leads from Advisor Match.",
  //   name: "Test Texttbox",
  //   tasks: [
  //     {
  //       description: "Edit your nickname or preferred display name.",
  //       field: "c_preferredFirstName",
  //       name: "Preferred First Name",
  //     },
  //   ],
  // },
  // {
  //   description:
  //     "Please review the attestation below and confirm your agreement in order to receive leads from Advisor Match.",
  //   name: "Test Checkbox",
  //   tasks: [
  //     {
  //       description:
  //         "This field allows you to select and rank your top 3 Client Focuses.  Once you select them, drag and drop in the order you want them displayed.  Note: your top 3 focuses will be displayed on the results page, but your full list will be displayed on your profile page.",
  //       field: "c_clientFocuses",
  //       name: "Client Focuses*",
  //     },
  //   ],
  // },
  // {
  //   description:
  //     "Please review the attestation below and confirm your agreement in order to receive leads from Advisor Match.",
  //   name: "Test Boolean",
  //   tasks: [
  //     {
  //       field: "c_inGoodStanding",
  //       name: "In Good Standing",
  //       question: "In good standing?",
  //     },
  //   ],
  // },
  // {
  //   description:
  //     "Please review the attestation below and confirm your agreement in order to receive leads from Advisor Match.",
  //   name: "Test Date",
  //   tasks: [
  //     {
  //       field: "c_currentPositionStartDate",
  //       name: "Current Position Start Date",
  //       question: "Select thr best date for Test",
  //     },
  //   ],
  // },
  // {
  //   description:
  //     "Select your hobbies and answer the interview questions to help personalize your profile.",
  //   name: "Test compound field RTD, Picklist",
  //   tasks: [
  //     {
  //       description:
  //         "Select from the pre-approved interview prompts and write a short response (2-3 sentences). This will help prospects get to know both personally and professionally.",
  //       field: "c_fAQs",
  //       name: "Interview Questions*",
  //     },
  //   ],
  // },
  // {
  //   description:
  //     "Select your hobbies and answer the interview questions to help personalize your profile.",
  //   name: "Test compound field Date, text, text",
  //   tasks: [
  //     {
  //       description: "This is your designations list from PMAC data.",
  //       field: "c_designations",
  //       name: "Designations",
  //     },
  //   ],
  // },
  // {
  //   description:
  //     "Please review the attestation below and confirm your agreement in order to receive leads from Advisor Match.",
  //   name: "Test Data",
  //   tasks: [
  //     {
  //       description:
  //         "Choose any awards received from the pre-approved list and select the years received.",
  //       field: "c_awardsDashboard",
  //       name: "Awards",
  //     },
  //   ],
  // },
  {
    description:
      "Please review the attestation below and confirm your agreement in order to receive leads from Advisor Match.",
    name: "Attestation",
    tasks: [
      {
        field: "c_attestation",
        name: "Attestation*",
        question:
          'To participate in receiving leads from the Advisor Match Program , you must read and agree to be bound by the <a href="http://policy.bankofamerica.com/content/vcm/static/pmt08020001/GWIM%20Procedure%20Manuals/MLWM%20US%20Procedure%20Manual/Misc%20Processing/DefinedProgramForTheDistributionOfLeadsAndReferralsToGWIM.pdf" target="_blank"> Lead-Referral Distribution Program Policy Document </a>and the <a href="http://resourcecentral.bankofamerica.com/GrowthandAcquisitionDocuments/Bank%20Referral%20Program_Terms_and_Conditions_07-10-2020.pdf" target="_blank">Agreement for Participation in Bank Referral Programs</a> (the "Terms and Conditions" document). You have an obligation to determine the most suitable solution for each prospect/client by assessing client needs, client preference for advice, and client investable asset level. Prospects/clients who prefer a self-directed solution or an advised solution with limited oversight should be referred to Consumer Investments.\n\nIn addition, you agree to 1) attempt to contact the lead within 48 hours and 2) update the ‘Lead Status” field within Salesforce after attempting initial contact.\n\nSelect “I agree” if you have reviewed the materials and understand your obligations.',
      },
    ],
  },
  {
    description: "Review your core information and edit as needed.",
    name: "Core Information",
    shouldScore: true,
    tasks: [
      {
        description: "Edit your nickname or preferred display name.",
        field: "c_preferredFirstName",
        name: "Preferred First Name",
      },
      {
        description:
          "This is your corporate title (e.g. vice president, managing director, etc.), which is sourced from HR data.",
        field: "c_recognitionTitle",
        name: "Recognition Title",
      },
      {
        description: "This is your functional title from HR data",
        field: "c_jobTitle",
        name: "Functional Title",
      },
      {
        description:
          "Edit how your title will be displayed next to your name. You may choose from your pre-approved HR titles",
        field: "c_titleDisplay",
        name: "Title Display*",
      },
      {
        description:
          "This field allows you to select and rank your top 3 Client Focuses.  Once you select them, drag and drop in the order you want them displayed.  Note: your top 3 focuses will be displayed on the results page, but your full list will be displayed on your profile page.",
        field: "c_clientFocuses",
        name: "Client Focuses*",
      },
      {
        description:
          "This is your headline, which prospects will initially see. TIP: Keep this short and punchy. Describe yourself in 1-2 sentences.",
        field: "c_aboutAdvisorShortDescription",
        name: "Short Description About Me*",
      },
      {
        description:
          "This is your full bio. Highlight your practice, key attributes, and accomplishments. TIP: infuse your personality (e.g. personal interests, hobbies, or passions).",
        field: "c_expertiseCommentsRTv2",
        name: "Full Biography*",
      },
      {
        description:
          "You can delegate your profile management to a team member, except for the Matching Questionnaire. To add a delegate, enter a valid bank email address. They will receive an invitation within 24 hours after approval.",
        field: "c_profileDelegates",
        name: "Profile Delegates",
      },
      {
        description:
          "This is your main team name and website.  If you have more than one, select your preferred team.  If you would like a different team website displayed, please reach out to Broadridge: ml@broadridge.com.",
        field: "c_teamNameAndSite",
        name: "Preferred Team Name",
      },
      {
        description:
          'If "Yes" then your preferred team will be displayed on your Match profile.',
        field: "c_displayTeamName",
        name: "Display Team Name",
      },
      {
        description:
          "Select all languages that you're fluent in. Re-order as necessary on the right side and hit 'Save'. This information is originally sourced from Social Profile Manager (your LinkedIn profile). Remember to keep your compliant LinkedIn profile up to date, as well.",
        field: "c_languagesV2",
        name: "Languages Spoken",
        slider: false,
      },
      {
        description: "This is your email address from HR data.",
        field: "location.emails",
        name: "Email",
        newSectionHeading: "You can review this core information below.",
        question:
          "The below fields are generated from other pre-approved sources, such as HR and Social Profile Manager, and cannot be edited.",
        slider: false,
      },
      {
        description: "This is your main phone number from HR data.",
        field: "location.main_phone",
        name: "Phone Number",
        slider: false,
      },
      {
        description: "This is your mailing address from HR data.",
        field: "virtual.address",
        name: "Address",
      },
      // {
      //   description: "This is your state registration(s) from RILR data",
      //   field: "c_registrations",
      //   name: "State Registrations",
      //   slider: false,
      // },
      {
        description: "This is your LinkedIn profile link.",
        field: "c_linkedInURL",
        name: "LinkedIn Page",
        slider: false,
      },
    ],
  },
  {
    description:
      "Review and confirm your education, volunteering, organizations, and awards.",
    name: "Education & Experience",
    tasks: [
      {
        description:
          "Enter any education you would like to highlight. Education must be verifiable through the firm’s standard process. Pre-filled education is coming from Social Profiles. For any issues, contact AdvisorMatch@ml.com.",
        field: "c_educationDisplay",
        name: "Education",
      },
      {
        description:
          "Review or add any volunteer positions you have and would like to highlight.",
        field: "c_volunteeringDisplay",
        name: "Volunteering",
      },
      {
        description:
          "Review or add any organizations you are affiliated with and would like to highlight.",
        field: "c_organizationsDisplay",
        name: "Organizations",
      },
      {
        description:
          "Choose any awards received from the pre-approved list and select the years received.",
        field: "c_awardsDashboard",
        name: "Awards",
      },
      {
        description:
          "Your Industry Level of Experience is pre-populated from HR, but can be edited.",
        field: "c_industryLevelOfExperience",
        name: "Years of Experience",
        slider: false,
      },
      {
        description: "This is your designations list from PMAC data.",
        field: "c_designations",
        name: "Designations",
      },
    ],
  },
  {
    description:
      "Select your hobbies and answer the interview questions to help personalize your profile.",
    name: "About Me",
    tasks: [
      {
        description:
          "Choose at least 3 hobbies. This will help prospects get to know you outside of work.",
        field: "c_hobbiesAndInterests",
        name: "Hobbies and Interests*",
      },
      {
        description:
          "Select from the pre-approved interview prompts and write a short response (2-3 sentences). This will help prospects get to know both personally and professionally.",
        field: "c_fAQs",
        name: "Interview Questions*",
      },
    ],
  },
  {
    description:
      "As an advisor, we know that client satisfaction is always top of mind, and you may adapt your communication or meeting style to better suit those of your clients.\n\nFor the following questions, know that there are no right or wrong answers. Please answer with how you would typically respond with the majority of your clients. Consider your baseline preferences and what feels most comfortable to you as an advisor.",
    name: "Matching Questionnaire",
    shouldScore: true,
    tasks: [
      {
        field: "c_assetRanges",
        name: "Asset Range*",
        question:
          "When Advisor Match is publicly live, prospects will complete a similar match questionnaire. Prospects will be asked to self-select their range of investable assets. Please select the minimum level of investable assets to which you would like to be considered for a match.\n\nNOTE: Should you select a minimum, you may not be eligible as a match for a prospect who selects a range lower than your selection.\n\nExample: If you select $1M+ as your minimum, you will not match with a prospect who selects they have $250k - $1M to invest.",
        slider: false,
      },
      {
        field: "c_meetingPreference",
        name: "Meeting Preference*",
        newSectionHeading:
          "Meeting with clients is an important part of your financial relationship, but there’s more than one way to do it. Tell us more about how you typically engage with your clients. Keep in mind, these questions are referring to typical, normal circumstances and do not reflect how your behaviors or preferences may change in times of unusual activity (like increased market volatility).",
        question:
          "1) Consider an environment where we are able to meet safely in person.\nHow do you typically meet with most clients?",
        slider: true,
        sliderHighText:
          "Mostly remote meetings (e.g. video calls, phone calls)",
        sliderLowText: "Mostly in person",
      },
      {
        field: "c_meetingPlacePreference",
        name: "Meeting Place Preference*",
        question:
          "2) Where do you typically meet clients when you have in person meetings?",
        slider: true,
        sliderHighText: "My clients come to me",
        sliderLowText: "I usually go to my clients",
      },
      {
        field: "c_inTouchPreference",
        name: "In Touch Preference*",
        question:
          "3) Consider typical, average clients (not your largest or most complex relationship). Outside of annual reviews, about how often do you schedule meetings with most of your clients?",
      },
      {
        field: "c_conversationPreference",
        name: "Conversation Preference*",
        question:
          "4) Outside of scheduled meetings, who tends to initiate ad hoc conversations?",
        slider: true,
        sliderHighText: "I typically initiate",
        sliderLowText: "My clients typically initiate",
      },
      {
        field: "c_conversationFocus",
        name: "Conversation Focus*",
        newSectionHeading:
          "Here we want to learn more about your communication style. These questions will explore how you typically communicate with your clients, how involved they tend to be, and how you come to decisions.",
        question:
          "5) Building a relationship with your clients can look a lot of different ways. Some people want to be friendly outside of their working relationship (like play tennis together or go to a neighborhood BBQ) and some people want to keep the relationship solely on business/financial topics. What balance would you prefer?",
        slider: true,
        sliderHighText:
          "It’s not essential, but it would be great to have a more social relationship with my clients",
        sliderLowText: "Let’s keep it all business",
      },
      {
        field: "c_meetingTime",
        name: "Meeting Time*",
        question:
          "6) When talking about financial topics with a client, how do you typically spend time during the meeting?",
        slider: true,
        sliderHighText:
          "We catch up on a number of financial topics, like market activity, current events and what’s happening in the industry",
        sliderLowText:
          "We jump right in and get right to the reason for meeting",
      },
      {
        field: "c_disagreements",
        name: "Disagreements*",
        question:
          "7) There may be times when you and your client have different points of view about investing decisions. Understanding that you have a duty to act in the best interest of your client, how do you typically respond?",
        slider: true,
        sliderHighText: "I am firm",
        sliderLowText: "I am flexible",
      },
      {
        field: "c_recommendations",
        name: "Recommendations*",
        question:
          "8) As the advisor, you will always explain the rationale for investment recommendations and answer any questions clients may have. In general, what’s your style for delivering an investment recommendation?",
        slider: true,
        sliderHighText:
          "I typically start with a direct and succinct reasoning of my recommendation",
        sliderLowText:
          "I typically start by providing all the details and reasoning of my recommendation",
      },
      {
        field: "c_charts",
        name: "Charts*",
        question:
          "9) When discussing a client’s portfolio/investments, how do you typically present information?",
        slider: true,
        sliderHighText: "I provide examples",
        sliderLowText: "I use visuals, like graphs or charts",
      },
      {
        field: "c_introvertedOrExtroverted",
        name: "Introverted or Extroverted*",
        newSectionHeading:
          "Finally, we’d like to get to know more about your personality. There’s no right or wrong answer, we just want to learn more about you.",
        question: "10) Are you more introverted or extroverted?",
        slider: true,
        sliderHighText: "Extroverted",
        sliderLowText: "Introverted",
      },
      {
        field: "c_planning",
        name: "Planning*",
        question:
          "11) Are you more of a planner, or do you prefer to be more spontaneous?",
        slider: true,
        sliderHighText: "I’m a planner through and through",
        sliderLowText: "I’m spontaneous and take things as they come",
      },
      {
        field: "c_laidBack",
        name: "Laid Back*",
        question: "12) Would your close friends say you are laid back?",
        slider: true,
        sliderHighText: "Not at all",
        sliderLowText: "Definitely",
      },
      {
        field: "c_homeRepairs",
        name: "Home Repairs*",
        question:
          "13) If something in your house breaks, what’s your typical response?",
      },
    ],
  },
  {
    description:
      "Upload a profile photo and select approved videos to be displayed on your Advisor Match profile.",
    name: "Your Media",
    tasks: [
      {
        description:
          "Upload photos to this section that you’d like displayed on your Match Page.  Once approved, you can add one as your Advisor Match Photo.",
        field: "c_photoGallery",
        name: "All Photos",
      },
      {
        description:
          "Choose a photo from your approved display photos to highlight in Advisor Match.",
        field: "c_matchFinderPhoto",
        name: "Advisor Match Photo*",
      },
      // {
      //   description:
      //     "Select the approved video(s) you want displayed on your Advisor Match profile page. To display a pop-up video that’s launched from your headshot, select “Yes” in the “Main Profile Video” drop-down.",
      //   field: "c_kalturaVideo",
      //   name: "Videos",
      // },
    ],
  },
];
