/**
 * Stack icons for the Hard Skills grid. Labels stay English until i18n is added.
 */
export type StackItem = {
  id: string;
  label: string;
  iconSrc: string;
  iconAlt: string;
};

export const STACK_ITEMS: StackItem[] = [
  { id: "csharp", label: "C#", iconSrc: "/images/stacks/csharp.svg", iconAlt: "C#" },
  { id: "dotnet", label: ".NET", iconSrc: "/images/stacks/dotnet.svg", iconAlt: ".NET" },
  { id: "unit-test", label: "Unit tests", iconSrc: "/images/stacks/unit-test.svg", iconAlt: "Unit tests" },
  {
    id: "integration-test",
    label: "Integration tests",
    iconSrc: "/images/stacks/integration-test.svg",
    iconAlt: "Integration tests",
  },
  { id: "typescript", label: "TypeScript", iconSrc: "/images/stacks/typescript.svg", iconAlt: "TypeScript" },
  { id: "angular", label: "Angular", iconSrc: "/images/stacks/angular.svg", iconAlt: "Angular" },
  {
    id: "react-native",
    label: "React Native",
    iconSrc: "/images/stacks/react-native.svg",
    iconAlt: "React Native",
  },
  { id: "azure", label: "Azure", iconSrc: "/images/stacks/azure.svg", iconAlt: "Microsoft Azure" },
  { id: "react", label: "React", iconSrc: "/images/stacks/react.svg", iconAlt: "React" },
  { id: "devops", label: "DevOps", iconSrc: "/images/stacks/devops.svg", iconAlt: "DevOps" },
];
