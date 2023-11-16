let textType = {
  meta: { uuid: "018bd2ff-c219-ebf3-c287-cfed443662b9", errors: [] },
  response: {
    $id: "c_advisorNickname",
    $schema: "https://schema.yext.com/config/km/field/v1",
    description: "",
    displayName: "Advisor Nickname",
    group: "NONE",
    localization: "PRIMARY_ONLY",
    type: { stringType: { stereotype: "SIMPLE" } },
    typeId: "string",
  },
};

let checkbox = 
{
  meta: { uuid: "018bd2fe-cb05-ba40-8d49-ea2baa1da496", errors: [] },
  response: {
    $id: "c_clientFocuses",
    $schema: "https://schema.yext.com/config/km/field/v1",
    description:
      "DO NOT CHANGE API OR DISPLAY NAME. No longer used on pages, but used as options repo for c_clientFocusesReorder.  DO NOT DELETE.",
    displayName: "Client Focuses",
    group: "GROUP6",
    localization: "PRIMARY_ONLY",
    type: {
      listType: {
        typeId: "option",
        minLength: 3,
        maxLength: 10,
        type: {
          optionType: {
            option: [
              {
                displayName: "College Education Planning",
                textValue: "FINANCIAL_PLANNING",
              },
              {
                displayName: "Corporate Benefits",
                textValue: "PERSONAL_RETIREMENT",
              },
              {
                displayName: "Corporate Executive Services",
                textValue: "SAVING_FOR_EDUCATION",
              },
              {
                displayName: "Corporate Retirement Plan Services",
                textValue: "ESG_INVESTING",
              },
              {
                displayName: "Divorce Transition Planning",
                textValue: "PHILANTHROPHY_&_CHARITABLE_GIVING",
              },
              {
                displayName: "Education Planning",
                textValue: "INVESTING_ADVICE",
              },
              {
                displayName: "Employee Benefits Planning",
                textValue: "EMPLOYEE_BENEFITS_PLANNING",
              },
              {
                displayName: "Executive Compensation",
                textValue: "EXECUTIVE_COMPENSATION",
              },
              {
                displayName: "Equity Compensation Services",
                textValue: "EQUITY_COMPENSATION_SERVICES",
              },
              {
                displayName: "Family Wealth Management Strategies",
                textValue: "FAMILY_WEALTH_MANAGEMENT_STRATEGIES",
              },
              {
                displayName: "Institutional and Corporate Benefit Services",
                textValue: "INSTITUTIONAL_AND_CORPORATE_BENEFIT_SERVICES",
              },
              {
                displayName: "Institutional Consulting",
                textValue: "INSTITUTIONAL_CONSULTING",
              },
              {
                displayName: "Institutional Investment Consulting",
                textValue: "INSTITUTIONAL_INVESTMENT_CONSULTING",
              },
              {
                displayName:
                  "Services for Endowments, Foundations, and Non-profits",
                textValue:
                  "SERVICES_FOR_ENDOWMENTS,_FOUNDATIONS,_AND_NON-PROFITS",
              },
              {
                displayName: "Services for Defined Benefit Plans",
                textValue: "SERVICES_FOR_DEFINED_BENEFIT_PLANS",
              },
              {
                displayName:
                  "Investment Consulting for Defined Contribution Plans",
                textValue:
                  "INVESTMENT_CONSULTING_FOR_DEFINED_CONTRIBUTION_PLANS",
              },
              {
                displayName: "Employee Financial Health",
                textValue: "EMPLOYEE_FINANCIAL_HEALTH",
              },
              {
                displayName: "International Wealth Management",
                textValue: "INTERNATIONAL_WEALTH_MANAGEMENT",
              },
              { displayName: "Legacy Planning", textValue: "LEGACY_PLANNING" },
              {
                displayName: "LGBT Wealth Planning",
                textValue: "LGBT_WEALTH_PLANNING",
              },
              {
                displayName: "Liquidity Management",
                textValue: "LIQUIDITY_MANAGEMENT",
              },
              {
                displayName: "Managing New Wealth",
                textValue: "MANAGING_NEW_WEALTH",
              },
              {
                displayName: "Personal Retirement Planning",
                textValue: "PERSONAL_RETIREMENT_PLANNING",
              },
              {
                displayName: "Philanthropic Planning",
                textValue: "PHILANTHROPIC_PLANNING",
              },
              {
                displayName: "Portfolio Management Services",
                textValue: "PORTFOLIO_MANAGEMENT_SERVICES",
              },
              {
                displayName: "Small Business Strategies",
                textValue: "SMALL_BUSINESS_STRATEGIES",
              },
              {
                displayName:
                  "Socially Responsible, Values Based, and ESG Investing*",
                textValue:
                  "SOCIALLY_RESPONSIBLE,_VALUES_BASED,_AND_ESG_INVESTING*",
              },
              {
                displayName: "Special Needs Planning Strategies",
                textValue: "SPECIAL_NEEDS_PLANNING_STRATEGIES",
              },
              {
                displayName: "Women and Wealth",
                textValue: "WOMEN_AND_WEALTH",
              },
              {
                displayName: "Sports & Entertainment",
                textValue: "SPORTS_&_ENTERTAINMENT",
              },
              {
                displayName: "Individual and Corporate Investment Strategy",
                textValue: "INDIVIDUAL_AND_CORPORATE_INVESTMENT_STRATEGY",
              },
              {
                displayName: "Tax Minimization",
                textValue: "TAX_MINIMIZATION",
              },
              {
                displayName: "Retirement Income",
                textValue: "RETIREMENT_INCOME",
              },
            ],
          },
        },
      },
    },
    typeId: "list",
  },
} 
let textList = {
  meta: { uuid: "018bd301-f33b-214d-9f51-9c8c32c0e947", errors: [] },
  response: {
    $id: "c_organizationsDisplay",
    $schema: "https://schema.yext.com/config/km/field/v1",
    description: "",
    displayName: "Organizations Display",
    group: "NONE",
    localization: "PRIMARY_ONLY",
    type: {
      listType: {
        typeId: "string",
        minLength: 1,
        type: { stringType: { stereotype: "SIMPLE" } },
      },
    },
    typeId: "list",
  },
};


let option = {
  meta: { uuid: "018bd303-0c76-0ef8-c7f8-eb62ba808e50", errors: [] },
  response: {
    $id: "c_attestation",
    $schema: "https://schema.yext.com/config/km/field/v1",
    description: "",
    displayName: "Attestation",
    group: "GROUP4",
    localization: "PRIMARY_ONLY",
    type: {
      optionType: {
        option: [
          { displayName: "I agree", textValue: "I_AGREE" },
          {
            displayName: "I agree (Annual Review Required)",
            textValue: "I_AGREE_(ANNUAL_REVIEW_REQUIRED)",
          },
        ],
      },
    },
    typeId: "option",
  },
};


let photoGallery = {
  meta: { uuid: "018bd30c-8dc4-9774-e3b0-4de7d3a598ae", errors: [] },
  response: {
    $id: "c_photoGallery",
    $schema: "https://schema.yext.com/config/km/field/v1",
    description: "",
    displayName: "Photo Gallery",
    group: "GROUP6",
    localization: "PRIMARY_ONLY",
    type: {
      listType: {
        typeId: "image",
        maxLength: 500,
        type: {
          imageType: {
            isSimpleImage: true,
            noAllowedAspectRatios: true,
            unconstrainedAspectRatioAllowed: true,
          },
        },
      },
    },
    typeId: "list",
  },
};

let videos = {
  meta: { uuid: "018bd30d-150e-fb56-17c7-bfcc5cb4d255", errors: [] },
  response: {
    $id: "c_kalturaVideo",
    $schema: "https://schema.yext.com/config/km/field/v1",
    description: "Choose videos from your Kaltura videos library.",
    displayName: "Kaltura Video",
    group: "GROUP4",
    localization: "PRIMARY_ONLY",
    type: { listType: { typeId: "c_kalturaVideos", maxLength: 5000 } },
    typeId: "list",
  },
};
