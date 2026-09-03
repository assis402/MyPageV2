/**
 * Hard Skills tiles. Labels stay English until i18n is added.
 *
 * Icons: `react-icons/si` (tree-shaken per named import).
 *
 * react-icons 5.7.0 Simple Icons has no C# or Azure marks — fallback to Tabler
 * (`react-icons/tb`) so tiles stay `currentColor` components from the same library.
 *
 * Stand-in brands (no generic Simple Icons glyph for the skill name):
 * - Unit tests → SiJest
 * - Integration tests → SiPostman
 * - DevOps → SiDocker
 * - React Native → SiReact (same mark as React)
 */
import type { IconType } from "react-icons";
import {
  SiAngular,
  SiDocker,
  SiDotnet,
  SiJest,
  SiPostman,
  SiReact,
  SiTypescript,
} from "react-icons/si";
import { TbBrandAzure, TbBrandCSharp } from "react-icons/tb";

export type StackItem = {
  id: string;
  label: string;
  Icon: IconType;
};

export const STACK_ITEMS: StackItem[] = [
  { id: "csharp", label: "C#", Icon: TbBrandCSharp },
  { id: "dotnet", label: ".NET", Icon: SiDotnet },
  { id: "unit-test", label: "Unit tests", Icon: SiJest },
  { id: "integration-test", label: "Integration tests", Icon: SiPostman },
  { id: "typescript", label: "TypeScript", Icon: SiTypescript },
  { id: "angular", label: "Angular", Icon: SiAngular },
  { id: "react-native", label: "React Native", Icon: SiReact },
  { id: "azure", label: "Azure", Icon: TbBrandAzure },
  { id: "react", label: "React", Icon: SiReact },
  { id: "devops", label: "DevOps", Icon: SiDocker },
];
