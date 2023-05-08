interface EventClassMapping {
  [key: string]: string;
}

export const eventClassMapping: EventClassMapping = {
  testCreate: 'bg-blue-300',
  report: 'bg-yellow-300',
  reportResponse: 'bg-lime-300',
  evaluationStarted: 'bg-orange-300',
  evaluationEnded: 'bg-green-300',
  evaluationChanged: 'bg-rose-300',
};
