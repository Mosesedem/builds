import { CreditCard, DoorOpen, Repeat, CheckCircle, Crown, Cog } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: CreditCard,
    text: "Affordability",
    description: "Premium quality at competitive prices"
  },
  {
    icon: DoorOpen,
    text: "Accessibility",
    description: "Easy to use, anywhere, anytime"
  },
  {
    icon: Repeat,
    text: "Flexibilty",
    description: "Adaptable to your unique needs"
  },
  {
    icon: CheckCircle,
    text: "Reliability",
    description: "Consistent performance you can trust"
  },
  {
    icon: Crown,
    text: "Exclusivity",
    description: "Unique features just for you"
  },
  {
    icon: Cog,
    text: "Efficiency",
    description: "Unique features just for you"
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

function Feature({ icon: Icon, text, description }) {
  return (
    
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.02 }}
      className="group relative p-6 rounded-lg bg-gradient-to-r from-teal-300/10 via-blue-500/10 to-teal-500/10 transition-all duration-300 hover:shadow-lg "
    >
      <div className="space-y-4">
        <div
          className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 via-teal-300 to-teal-500 flex items-center justify-center group-hover:shadow-inner transition-all duration-300"
          aria-label={text}
        >
          <Icon className="h-6 w-6 text-blue-900 group-hover:scale-110 transition-transform duration-300" />
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-primary tracking-tight">
            {text}
          </h3>
          <p className="text-sm text-gray-500 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
}

export default function FeaturesSection() {
  return (
<section className="w-full py-16 md:py-24 bg-accent/5 hidden md:block">
<div className="container px-4 mx-auto max-w-6xl">
<h2 className="text-3xl font-bold tracking-tighter text-center mb-8 text-primary">See What sets us Apart</h2>
<p className="text-center text-gray-500 mb-6">
            Trusted by industry-leading companies around the world
          </p>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {features.map((feature, index) => (
            <Feature key={index} {...feature} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}