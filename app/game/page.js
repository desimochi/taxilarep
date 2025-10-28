import { Gamepad, Briefcase, Calculator, TrendingUp, Users, FolderKanban, Lightbulb, Target, DollarSign, ShoppingCart, Brain, PuzzleIcon, MessageSquare, Mic, ChevronRight } from "lucide-react";

const iconMap = {
  "Startup Simulation": Lightbulb,
  "Guesstimation": Brain,
  "Finance": Calculator,
  "Sales and Marketing": TrendingUp,
  "Human Resource Development": Users,
  "Project Management": FolderKanban,
  "Critical Thinking": Brain,
  "Strategy": Target,
  "Economics": DollarSign,
  "Consumer Behaviour": ShoppingCart,
  "Consulting/Business Analytics": Briefcase,
  "Quality Management": Target,
  "Wordify": PuzzleIcon,
  "Interview": MessageSquare,
  "Public Speaking": Mic,
};

const simulations = [
  {
    label: "Startup Simulation",
    path: "/game/simulation",
  },
  {
    label: "Guesstimation",
    path: "/game/guesstimations",
  },
  {
    label: "Finance",
    subMenu: [
      { label: "Accounting Cycle", path: "/game/accounting-cycle" },
      { label: "Rat Race 3D", path: "/game/rat-race" },
      { label: "Project Titan", path: "/game/titan" },
    ],
  },
  {
    label: "Sales and Marketing",
    subMenu: [
      { label: "Sector Shaker", path: "/game/sector-shaker" },
      { label: "Marketing Strategy", path: "/game/marketing-strategy" },
    ],
  },
  {
    label: "Human Resource Development",
    subMenu: [
      { label: "Netritva", path: "/game/netrvita" },
    ],
  },
  {
    label: "Project Management",
    subMenu: [
      { label: "Project Taxila", path: "/game/project-management" },
      { label: "Leadership Challenge", path: "/game/leadership-challange" },
    ],
  },
  {
    label: "Critical Thinking",
    subMenu: [
      { label: "Last City", path: "/game/lastcity" },
      { label: "Idea Generation", path: "/game/idea-generator" },
    ],
  },
  {
    label: "Strategy",
    subMenu: [
      { label: "Taxila Capital Quest", path: "/game/quest" },
      { label: "Indian Business Strategy", path: "/game/indian-business" },
    ],
  },
  {
    label: "Economics",
    subMenu: [
      { label: "Airthniti", path: "/game/airthniti" },
    ],
  },
  {
    label: "Consumer Behaviour",
    subMenu: [
      { label: "Consumer Simulation", path: "/game/consumer-behaviour" },
    ],
  },
  {
    label: "Consulting/Business Analytics",
    subMenu: [
      { label: "Taxila Ecosystem", path: "/game/taxila-eco" },
      { label: "Taxila Solve", path: "/game/taxila-solve" },
      { label: "Sariska Hills", path: "/game/sariska" },
      { label: "Samudra Rakshak", path: "/game/samudra-rakshak" },
      { label: "Market Research - New Product Launch", path: "/game/product-launch" },
    ],
  },
  {
    label: "Quality Management",
    subMenu: [
      { label: "Six Sigma Simulation", path: "/game/six-sigma" },
    ],
  },
  {
    label: "Wordify",
    path: "/game/wordfy",
  },
  {
    label: "Interview",
    path: "/game/interview-preparation",
  },
  {
    label: "Public Speaking",
    path: "/game/public-speaking",
  },
];

export default function SimulationsPage() {
  const getIcon = (label) => {
    const Icon = iconMap[label] || Gamepad;
    return Icon;
  };

  return (
    <div className="min-h-screen ">
      <div className=" p-6 md:p-8 lg:p-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl mb-4 shadow-lg">
            <Gamepad className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold  mb-3">
            Taxila Business School - Simulations
          </h1>
          <p className="text-gray-600 text-lg">
            Interactive learning experiences to enhance your business skills
          </p>
        </div>

        {/* Simulations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3">
          {simulations.map((category, index) => {
            const Icon = getIcon(category.label);
            
            return (
              <div
                key={index}
                className="group bg-white shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                {/* Category Header */}
                <div className="bg-gray-950 p-6">
                  <div className="flex items-center space-x-3">
                    <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-white">
                      {category.label}
                    </h2>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  {category.subMenu ? (
                    <div className="space-y-2">
                      {category.subMenu.map((item, idx) => (
                        <a
                          key={idx}
                          href={item.path}
                          className="flex items-center justify-between p-3 rounded-lg hover:bg-blue-50 transition-colors group/item"
                        >
                          <span className="text-gray-700 font-medium group-hover/item:text-blue-600 transition-colors">
                            {item.label}
                          </span>
                          <ChevronRight className="h-4 w-4 text-gray-400 group-hover/item:text-blue-600 group-hover/item:translate-x-1 transition-all" />
                        </a>
                      ))}
                    </div>
                  ) : (
                    <a
                      href={category.path}
                      className="flex items-center justify-center p-4  bg-gradient-to-r from-red-500 to-indigo-600 text-white font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
                    >
                      Start Simulation
                      <ChevronRight className="h-5 w-5 ml-2" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Stats */}
        <div className="mt-16 grid grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">15+</div>
            <div className="text-sm text-gray-600">Categories</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-600 mb-1">30+</div>
            <div className="text-sm text-gray-600">Simulations</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">100%</div>
            <div className="text-sm text-gray-600">Interactive</div>
          </div>
        </div>
      </div>
    </div>
  );
}