import * as moment from 'moment';
import { UI } from './ui';

export namespace State {

  export type StorySize = 1 | 2 | 3;

  export type StoryNumber = number;

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

let lastId = 1;

const story = (title: string, size: State.StorySize = 1) => {
  return { num: lastId++, title, size };
};

let mvp: State.Story;

export const initial: State = {
  settings: {
    velocity: 6
  },
  backlog: [
    story('Changing velocity', 2),
    story('Closing Sprint', 2),
    story('Setup of backend'),
    story('Sync with GraphQL endpoints', 2),
    mvp = story('Storage in Elasticsearch'),
    story('Stories On Board integration', 3),
    story('Support for Milestones', 2),
    story('Support for Deadlines', 2),
    story('Removing Stories'),
    story('Removing Milestones'),
    story('Removing Deadlines'),
    story('Sync progress indicator', 2),
    story('GraphQL subscriptions', 3),
    story('AWS Lambda deployment', 3),
  ],
  currentSprint: {
    stories: [
      story('Data model as ADT'),
      story('Initial layout', 2),
      story('Fluent grid layout', 2),
      story('Adding new Story'),
      story('Re-prioritizing Story', 2),
    ],
    start: '2017-11-05',
    end: '2017-11-12'
  },
  milestones: [
    { name: 'MVP', after: mvp.num }
  ],
  deadlines: [
    { name: 'Critical deadline', date: moment().add(14, 'days').format('YYYY-MM-DD') }
  ],

  ui: {
    dragInProgress: false
  }
};
