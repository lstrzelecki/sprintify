
export namespace State {

  export type StorySize = 1 | 2 | 3;

  export type StoryNumber = number;

  export interface Story {
    num: StoryNumber;
    size: StorySize;
    title: string;
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
    edited?: StoryNumber;
  }
}

export type State = State.Dashboard;

let lastId = 1;

const story = (title: string, size: State.StorySize = 1) => {
  return { num: lastId++, title, size };
};

export const initial: State = {
  settings: {
    velocity: 6
  },
  backlog: [
    story('Changing velocity', 2),
    story('Closing Sprint', 2),
    story('Setup of backend'),
    story('Sync with GraphQL endpoints', 2),
    story('Storage in Elasticsearch'),
    story('Stories On Board integration', 3)
  ],
  currentSprint: {
    stories: [
      story('Data model as ADT'),
      story('Initial Layout', 2),
      story('Adding new Story'),
      story('Re-prioritizing Story', 2),
    ],
    start: '2017-11-05',
    end: '2017-11-12'
  }
};
