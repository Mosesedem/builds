export const plans = [
    { id: "901dca29-d514-415d-abd9-1d2b9c532828", 
      name: "ZenCare Prime", 
      basePrice: 150,
      type: "medicarePlans",
      description: "Original Medicare coverage for essential health services",
      features: [
        "Hospital Insurance (Part A)",
        "Medical Insurance (Part B)",
        "Covers most medically necessary services",
        "Accepted by most doctors and hospitals"
      ],
      additionalBenefits: [
        "Preventive services coverage",
        "Lab tests coverage",
        "Home health care",
        "Durable medical equipment",
        "Mental health services",
        "Limited prescription coverage"
      ]
    },
    { id: "cf74abd4-4727-43dc-b8d5-ca6fd824538b", 
      name: "ZenCare Plus", 
      type: "medicarePlans",
      basePrice: 250,
      description: "All-in-one Medicare coverage with additional benefits",
      features: [
        "All Basic features",
        "Prescription drug coverage (Part D)",
        "Dental, vision, and hearing coverage",
        "Fitness and wellness programs",
        "Telehealth services"
      ],
      additionalBenefits: [
        "Over-the-counter medications",
        "Transportation services",
        "Meal delivery",
        "Personal emergency response system",
        "Chronic care management"
      ]
    },
    { id: "7b6f82a3-c4bc-446d-9b81-4fa0849a1de1", 
      name: "ZenCare", 
      type: "medicarePlans",
      basePrice: 150,
      description: "Additional coverage to fill gaps in Original Medicare",
      features: [
        "All Basic features",
        "Covers deductibles and copayments",
        "No network restrictions",
        "Renewable coverage for life"
      ],
      additionalBenefits: [
        "Coverage for foreign travel emergencies",
        "Guaranteed acceptance",
        "No referrals needed",
        "Predictable costs"
      ]
     },
    { id: "0521ffe3-e7c1-4bfa-b90e-d69ab311ec98", 
      name: "PrimeCare Plus", 
      type: "standardPlans",
      basePrice: 250,
      description: "Stand-alone coverage for prescription medications",
      features: [
        "Covers generic and brand name drugs",
        "Preferred pharmacy networks",
        "Mail-order prescription services",
        "Medication therapy management"
      ],
      additionalBenefits: [
        "Coverage for specialty drugs",
        "Financial assistance programs",
        "Medication delivery services",
        "Medication adherence support"
      ]
     },
    { id: "9786b349-3819-4fe3-8987-96b4d6214143", 
      name: "PrimeCare", 
      type: "standardPlans",
      basePrice: 150,
      description: "Universal healthcare coverage for all Americans",
      features: [
        "Comprehensive health services",
        "No deductibles or copayments",
        "No out-of-pocket costs",
        "No network restrictions"
      ],
      additionalBenefits: [
        "Long-term care coverage",
        "Mental health and addiction services",
        "Dental, vision, and hearing care",
        "Prescription drug coverage",
        "Home and community-based services"
      ]
     },
    { id: "4917c6ea-90f6-4bee-8d37-7e0cfd44f026", 
      name: "FlexiCare Plus", 
      type: "medicarePlans",
      basePrice: 250,
      description: "Enhanced Medicare coverage with premium benefits",
      features: [
        "All Advantage features",
        "Unlimited prescription coverage",
        "Private room coverage",
        "Specialized care coverage",
        "Extended hospital stay"
      ],
      additionalBenefits: [
        "Dental implants coverage",
        "Hearing aids coverage",
        "Vision correction surgery",
        "Cosmetic surgery",
        "Alternative medicine"
      ]
     },
    { id: "f7b4bca1-b870-4648-8704-11c1802a51d0", 
      name: "FlexiCare Mini", 
      basePrice: 150,
      type: "medicarePlans",
      description: "Enhanced Medicare coverage with premium benefits",
      features: [
        "All Advantage features",
        "Unlimited prescription coverage",
        "Private room coverage",
        "Specialized care coverage",
        "Extended hospital stay"
      ],
      additionalBenefits: [
        "Dental implants coverage",
        "Hearing aids coverage",
        "Vision correction surgery",
        "Cosmetic surgery",
        "Alternative medicine"
      ]
     },
    { id: "e6b4bca1-b870-4648-8704-11c1802a51d0", 
      name: "FlexiCare", 
      basePrice: 250,
      type: "medicarePlans",
      description: "Enhanced Medicare coverage with premium benefits",
      features: [
        "All Advantage features",
        "Unlimited prescription coverage",
        "Private room coverage",
        "Specialized care coverage",
        "Extended hospital stay"
      ],
      additionalBenefits: [
        "Dental implants coverage",
        "Hearing aids coverage",
        "Vision correction surgery",
        "Cosmetic surgery",
        "Alternative medicine"
      ]
     },
    { id: "a8b4bca1-b870-4648-8704-11c1802a51d0", 
      name: "ZenCare Senior Citizens", 
      type: "standardPlans",
      basePrice: 150,
      description: "Enhanced Medicare coverage with premium benefits",
      features: [
        "All Advantage features",
        "Unlimited prescription coverage",
        "Private room coverage",
        "Specialized care coverage",
        "Extended hospital stay"
      ],
      additionalBenefits: [
        "Dental implants coverage",
        "Hearing aids coverage",
        "Vision correction surgery",
        "Cosmetic surgery",
        "Alternative medicine"
      ]
     },
    { id: "fab6bda1-b870-4648-8704-11c1802a51d0", 
      name: "Malaria Cover", 
      basePrice: 250,
      type: "medicarePlans",
      description: "Enhanced Medicare coverage with premium benefits",
      features: [
        "All Advantage features",
        "Unlimited prescription coverage",
        "Private room coverage",
        "Specialized care coverage",
        "Extended hospital stay"
      ],
      additionalBenefits: [
        "Dental implants coverage",
        "Hearing aids coverage",
        "Vision correction surgery",
        "Cosmetic surgery",
        "Alternative medicine"
      ] },
      { id: "002",
        name: "Essential Maternity",
        type: "maternityPlans",
        description: "Basic coverage for pregnancy and childbirth",
        basePrice: 300,
        features: [
          "Prenatal care visits",
          "Labor and delivery coverage",
          "Postnatal care",
          "Basic newborn care"
        ],
        additionalBenefits: [
          "Childbirth education classes",
          "Breast pump coverage",
          "Lactation consultant support",
          "Postpartum depression screening"
        ]
      },
      { id: "001",
        name: "Premium Maternity",
        type: "maternityPlans",
        description: "Comprehensive pregnancy and family care",
        basePrice: 350,
        features: [
          "All Essential features",
          "Private room coverage",
          "Extended hospital stay",
          "Specialized care coverage"
        ],
        additionalBenefits: [
          "Doula services",
          "Genetic testing",
          "3D/4D ultrasounds",
          "Fertility treatments",
          "Home care visits"
        ]
      },
      { id: "003",
        name: "Basic Health",
        type: "standardPlans",
        description: "Affordable coverage for everyday health needs",
        basePrice: 300,
        features: [
          "Primary care visits",
          "Urgent care access",
          "Preventive care",
          "Generic medications"
        ],
        additionalBenefits: [
          "Telemedicine services",
          "Annual wellness exam",
          "Immunizations",
          "Basic lab work",
          "Specialist referrals"
        ]
      },
      { id: "004",
        name: "Premium Health",
        type: "maternityPlans",
        description: "Comprehensive coverage for individuals and families",
        basePrice: 600,
        features: [
          "Low deductibles",
          "Broad provider network",
          "Specialty care coverage",
          "Brand name medications"
        ],
        additionalBenefits: [
          "Mental health services",
          "Physical therapy",
          "Alternative medicine",
          "Vision coverage",
          "Dental coverage"
        ]
      },
  ];
  
  export const durations = [
    { label: "1 Month", value: "1", discount: 0 },
    { label: "3 Months", value: "3", discount: 0.1 },
    { label: "6 Months", value: "6", discount: 0.15 },
    { label: "1 Year", value: "12", discount: 0.2 },
  ];
  
  export const maritalStatus = [
    { id: 1, label: "Single", value: "single" },
    { id: 2, label: "Married", value: "married" },
    { id: 3, label: "Widowed", value: "widowed" },
  ];
  
  