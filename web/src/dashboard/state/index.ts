import { UI } from './ui';

export namespace State {

  export type StorySize = 1 | 2 | 3;
  export type StoryNumber = string;

  export interface Story {
    num: StoryNumber;
    size: StorySize;
    title: string;
  }

  export interface Milestone {
    name: string;
    after: StoryNumber;
  }

  export interface Deadline {
    name: string;
    date: string;
  }

  export interface Marker {
    name: string;
    after: StoryNumber;
    date: string;
    type: 'deadline' | 'milestone';
  }

  export interface Estimation {
    date: string;
  }

  export type Stories = Story[];

  export interface Sprint {
    stories: Stories;
    start: string;
    end: string;
  }

  export interface Settings {
    velocity: number;
  }

  export type Backlog = Stories;

  export interface Dashboard {
    settings: Settings;
    backlog: Backlog;
    currentSprint: Sprint;
    milestones: Milestone[];
    deadlines: Deadline[];
    edited?: StoryNumber;
  }
}

export type State = State.Dashboard & UI.State;

export const initial: State = {
  settings: {
    velocity: 6
  },
  backlog: [],
  currentSprint: {
    stories: [],
    start: '2017-11-05',
    end: '2017-11-12'
  },
  milestones: [],
  deadlines: [],

  ui: {
    dragInProgress: false
  }
};
