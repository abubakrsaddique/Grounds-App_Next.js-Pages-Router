import { useState } from "react";

const useEditProfile = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [lengthUnit, setLengthUnit] = useState<string>("cm");
  const [weightUnit, setWeightUnit] = useState<string>("kg");
  const [feetInches, setFeetInches] = useState<{
    feet: string;
    inches: string;
  }>({ feet: "", inches: "" });
  const [cmValue, setCmValue] = useState<string>("");
  const [height, setHeight] = useState<(string | null)[]>(["", null]);
  const [age, setAge] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [selectedGoal, setSelectedGoal] = useState<string>("");
  const [selectedMeal, setSelectedMeal] = useState<string>("");
  const [kgValue, setKgValue] = useState<string>("");
  const [lbsValue, setLbsValue] = useState<string>("");

  const handleLengthUnitChange = (unit: string) => {
    setLengthUnit(unit);
    if (unit === "ft" && cmValue !== "") {
      const cmValueNumber = parseFloat(cmValue);
      const feet = Math.floor(cmValueNumber / 30.48);
      const inches = ((cmValueNumber / 30.48) % 1) * 12;
      setFeetInches({ feet: feet.toString(), inches: inches.toFixed(2) });
      setHeight([feet.toString(), inches.toFixed(2)]);
      setCmValue("");
    } else if (
      unit === "cm" &&
      feetInches.feet !== "" &&
      feetInches.inches !== ""
    ) {
      const feetValue = parseFloat(feetInches.feet);
      const inchesValue = parseFloat(feetInches.inches);
      const cm = feetValue * 30.48 + inchesValue * 2.54;
      setCmValue(cm.toFixed(2));
      setHeight([cm.toFixed(2), null]);
      setFeetInches({ feet: "", inches: "" });
    }
  };

  const handleWeightUnitChange = (unit: string) => {
    setWeightUnit(unit);
    if (unit === "lbs" && kgValue !== "") {
      const kgNumber = parseFloat(kgValue);
      const lbs = kgNumber * 2.20462;
      setLbsValue(lbs.toFixed(2));
      setKgValue("");
    } else if (unit === "kg" && lbsValue !== "") {
      const lbsNumber = parseFloat(lbsValue);
      const kg = lbsNumber / 2.20462;
      setKgValue(kg.toFixed(2));
      setLbsValue("");
    }
  };

  const handleFeetInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFeet = e.target.value;
    setFeetInches({ ...feetInches, feet: newFeet });
    setHeight([newFeet, feetInches.inches]);
  };

  const handleInchesInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newInches = e.target.value;
    setFeetInches({ ...feetInches, inches: newInches });
    setHeight([feetInches.feet, newInches]);
  };

  const handleCmInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCmValue = event.target.value;
    setCmValue(newCmValue);
    setHeight([newCmValue, null]);
  };

  const handleKgInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKgValue(event.target.value);
  };

  const handleLbsInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLbsValue(event.target.value);
  };

  const handleGoalChange = (goal: string) => {
    setSelectedGoal(goal);
  };

  const handleMealChange = (meal: string) => {
    setSelectedMeal(meal);
  };

  const formatHeight = () => {
    if (lengthUnit === "ft") {
      return `${height[0]}ft${height[1]}inch`;
    } else if (lengthUnit === "cm") {
      return `${height[0]}cm`;
    }
    return "";
  };

  const formatWeight = () => {
    if (weightUnit === "kg") {
      return `${kgValue}kg`;
    } else if (weightUnit === "lbs") {
      return `${lbsValue}lbs`;
    }
    return "";
  };

  return {
    loading,
    lengthUnit,
    weightUnit,
    feetInches,
    cmValue,
    height,
    age,
    weight,
    selectedGoal,
    selectedMeal,
    kgValue,
    lbsValue,
    setAge,
    setWeight,
    setLengthUnit,
    setFeetInches,
    setCmValue,
    setWeightUnit,
    setKgValue,
    setLbsValue,
    setHeight,
    handleLengthUnitChange,
    handleWeightUnitChange,
    handleFeetInputChange,
    handleInchesInputChange,
    handleCmInputChange,
    handleKgInputChange,
    handleLbsInputChange,
    handleGoalChange,
    handleMealChange,
    formatHeight,
    formatWeight,
  };
};

export default useEditProfile;
