export interface Project {
  title: string;
  outcome: string;
  tasks: string[];
  tags: string[];
  id: string;
}

export interface SkillColumn {
  title: string;
  items: string[];
  icons: string[];
}

export interface NavigationItem {
  label: string;
  path: string;
  icon: string;
}