export const scenarios = [
  {
    title: "Financial Health Assessment",
    icon: "📊",
    description: "You've discovered a free financial wellness tool online. It asks about your living situation, emergency fund, and spending habits. You're not sure if you should complete the full assessment or skip it. What do you do?",
    choices: [
      {
        text: "Skip the assessment and go straight to looking at investment products",
        points: 10,
        rating: "needs-work",
        outcome: "Without understanding your current financial health, you might make decisions that don't align with your actual needs and priorities.",
        tip: "Financial assessments help identify your strengths and weaknesses so you can focus on areas that need the most attention."
      },
      {
        text: "Complete the full financial assessment honestly",
        points: 30,
        rating: "excellent",
        outcome: "Perfect! By honestly assessing your financial situation, you get a clear picture of where you stand. This helps you set appropriate goals and take actionable steps forward.",
        tip: "Regular financial check-ins help you track progress and adjust your strategy as life changes."
      },
      {
        text: "Answer only the questions that make you look good financially",
        points: 5,
        rating: "needs-work",
        outcome: "Being dishonest with yourself about your financial situation prevents you from getting accurate recommendations and addressing real issues.",
        tip: "Financial wellness tools are there to help, not judge. Honest answers lead to better, more personalized guidance."
      },
      {
        text: "Complete half of it and come back later",
        points: 15,
        rating: "okay",
        outcome: "Starting is good, but incomplete information won't give you the full picture of your financial health.",
        tip: "Most assessments only take a few minutes and provide valuable insights. It's worth completing in one sitting for the best results."
      }
    ]
  },
  {
    title: "Managing Competing Priorities",
    icon: "⚖️",
    description: "You have $500 extra this month. You need to build your emergency fund (currently only $800), pay down $3,000 in credit card debt at 19% APR, and you haven't started saving for retirement. How do you prioritize?",
    choices: [
      {
        text: "Put it all toward the credit card debt to save on interest",
        points: 20,
        rating: "good",
        outcome: "Paying down high-interest debt is smart, but you're leaving your emergency fund dangerously low.",
        tip: "Build at least $1,000-$1,500 emergency fund first, then attack high-interest debt aggressively."
      },
      {
        text: "Split it: $250 to emergency fund, $250 to credit card debt",
        points: 30,
        rating: "excellent",
        outcome: "Excellent balance! You're building your safety net while also reducing expensive debt. This demonstrates good priority management.",
        tip: "Once your emergency fund reaches 3-6 months of expenses, you can redirect that portion to debt payoff or retirement savings."
      },
      {
        text: "Put it all in a retirement account for long-term growth",
        points: 10,
        rating: "needs-work",
        outcome: "While retirement saving is important, you're ignoring high-interest debt and leaving yourself vulnerable without an adequate emergency fund.",
        tip: "Address high-interest debt and build an emergency fund before maximizing retirement contributions. You'll pay more in interest than you'll likely earn in returns."
      },
      {
        text: "Save it all for your emergency fund",
        points: 25,
        rating: "good",
        outcome: "Building your emergency fund is wise, but that 19% credit card interest is costing you significantly each month.",
        tip: "Once you hit $1,000-$1,500 in emergency savings, shift focus to high-interest debt while maintaining minimum payments."
      }
    ]
  },
  {
    title: "Setting Specific Financial Goals",
    icon: "🎯",
    description: "You want to improve your financial situation. You're exploring goal-setting strategies. Which approach is most effective?",
    choices: [
      {
        text: "Set one vague goal: 'Be better with money'",
        points: 5,
        rating: "needs-work",
        outcome: "Vague goals are hard to track and achieve. You need specific, measurable targets to make real progress.",
        tip: "Transform 'be better with money' into specific goals like 'Save $5,000 for emergency fund by December' or 'Pay off $2,000 credit card debt in 6 months.'"
      },
      {
        text: "Set multiple specific goals with target amounts and dates (Emergency fund: $6,000 by June; Credit card: paid off by December)",
        points: 30,
        rating: "excellent",
        outcome: "Perfect! Specific, measurable goals with deadlines give you clear targets and help you track progress. This is the foundation of successful financial planning.",
        tip: "Break large goals into smaller actionable steps you can take each month to stay on track."
      },
      {
        text: "Set only one goal so you don't get overwhelmed",
        points: 20,
        rating: "good",
        outcome: "Starting with one goal is good, but financial wellness often requires managing multiple priorities simultaneously.",
        tip: "You can focus primarily on one goal while making minimum progress on others. Balance is key to financial wellness."
      },
      {
        text: "Copy someone else's financial goals from a blog",
        points: 10,
        rating: "okay",
        outcome: "Everyone's financial situation is different. Your goals should reflect YOUR priorities, circumstances, and timeline.",
        tip: "Use financial assessments to understand your unique situation, then set personalized goals that make sense for you."
      }
    ]
  },
  {
    title: "Acquiring Financial Know-How",
    icon: "📚",
    description: "You're confused about different types of insurance and investment options. You have access to financial education resources and articles. What's your approach to learning?",
    choices: [
      {
        text: "Ignore the educational resources and just pick products that sound good",
        points: 5,
        rating: "needs-work",
        outcome: "Making financial decisions without understanding them can lead to costly mistakes and products that don't fit your needs.",
        tip: "Taking time to learn about financial products helps you make informed decisions and avoid expensive errors."
      },
      {
        text: "Read relevant articles and resources before making any decisions",
        points: 30,
        rating: "excellent",
        outcome: "Excellent! Acquiring financial know-how is one of the three pillars of improving financial wellness. Understanding your options leads to better decisions.",
        tip: "Look for curated articles on retirement planning, insurance types, credit scores, and budgeting - all designed to boost your financial literacy."
      },
      {
        text: "Ask a friend what they did and do the same",
        points: 15,
        rating: "okay",
        outcome: "While seeking advice is good, your friend's financial situation and needs may be very different from yours.",
        tip: "Get educated about the basics, then seek personalized advice from financial professionals who understand YOUR specific situation."
      },
      {
        text: "Read one article and consider yourself an expert",
        points: 10,
        rating: "okay",
        outcome: "Financial literacy is an ongoing journey, not a one-time event. Keep learning as your life circumstances change.",
        tip: "Make it a habit to regularly explore financial wellness resources. Even 15 minutes a week can significantly improve your financial knowledge over time."
      }
    ]
  },
  {
    title: "Linking Your Accounts for a Complete Picture",
    icon: "🔗",
    description: "A financial management app offers account linking to see all your finances in one place - checking, savings, credit cards, loans, and investments. You're hesitant about security. What do you do?",
    choices: [
      {
        text: "Link all your accounts to get the complete financial picture",
        points: 30,
        rating: "excellent",
        outcome: "Great choice! Linking accounts helps you track spending, monitor budgets, manage debt, and see your full net worth. Most reputable apps use bank-level security to protect your data.",
        tip: "Seeing all your finances in one place helps you make better decisions and spot opportunities to improve. You can track progress toward multiple goals simultaneously."
      },
      {
        text: "Don't link anything due to security concerns",
        points: 10,
        rating: "okay",
        outcome: "While security is important, you're missing out on powerful insights. You'll have to manually track everything, making it harder to manage your complete financial picture.",
        tip: "Most financial apps use read-only access and encryption. If you're concerned, start by linking one account and see how it helps before adding more."
      },
      {
        text: "Link only your main checking account to start",
        points: 25,
        rating: "good",
        outcome: "Starting small is reasonable! You can add more accounts as you get comfortable with the platform.",
        tip: "To get the most value, gradually link credit cards, loans, and savings accounts. The more complete your picture, the better recommendations you'll receive."
      },
      {
        text: "Use Excel spreadsheets to track everything manually instead",
        points: 15,
        rating: "okay",
        outcome: "Manual tracking can work, but it's time-consuming and prone to errors. You'll also miss out on automated insights and actionable recommendations.",
        tip: "Modern financial tools can save you hours while providing real-time insights. They're designed to work securely with your existing accounts."
      }
    ]
  }
];
