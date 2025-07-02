import { Card, CardContent } from "@workspace/ui/components/card";
import { motion } from "framer-motion";
import { UseFormRegister } from "react-hook-form";
import { itemVariants, listVariants } from "@/lib/framer-miotion";
import { FormValues } from "../OnBoardingPage";

type StepTwoProps = {
  purposeOptions: {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
  }[];
  selectedUsage: string;
  handlePurposeSelect: (purposeId: string) => void;
  register: UseFormRegister<FormValues>;
};

const StepTwo = ({ purposeOptions, selectedUsage, handlePurposeSelect, register }: StepTwoProps) => (
  <div className="space-y-8">
    <div className="text-center space-y-2">
      <h1 className="text-2xl font-semibold text-white">How do you want to use Geeni AI?</h1>
      <p className="text-gray-400">This helps us customize your experience</p>
    </div>

    <motion.div className="space-y-4 max-w-2xl mx-auto" variants={listVariants}>
      {purposeOptions.map((option) => (
        <motion.div key={option.id} variants={itemVariants}>
          <Card
            className={`cursor-pointer transition-all duration-200 border-2 bg-neutral-900/50 hover:bg-neutral-700/50 ${
              selectedUsage === option.id
                ? "border-neutral-700 bg-neutral-700/70"
                : "border-neutral-600 hover:border-neutral-500"
            }`}
            onClick={() => handlePurposeSelect(option.id)}
            {...register("purpose")}
          >
            <CardContent className="p-6 flex items-center space-x-4">
              <div className="text-gray-300">{option.icon}</div>
              <div className="flex-1">
                <h3 className="font-semibold text-white mb-1">{option.title}</h3>
                <p className="text-sm text-gray-400">{option.description}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  </div>
);
export default StepTwo;
