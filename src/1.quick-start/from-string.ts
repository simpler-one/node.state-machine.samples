import { StateMachine } from '@working-sloth/state-machine';
import { AutoIndex } from '@working-sloth/statechart-interface';
import { PumlWriter } from '@working-sloth/puml-writer';



enum SlothAction {
    Eat = 'Eat',
    Sleep = 'Sleep',
    Wake = 'Wake',
    Stop = 'Stop'
}

enum SlothState {
    Idle = 'Idle',
    Eating = 'Eating',
    Sleeping = 'Sleeping'
}

// You can create generic typing state machine
const fsm = StateMachine.fromString<SlothState, SlothAction>(
    'Sloth State', // state machine name
    SlothState.Idle, // start state
    {
        state: SlothState.Idle,
        transitions: [
            [SlothAction.Sleep, SlothState.Sleeping],
            [SlothAction.Eat, SlothState.Eating],
        ]
    }, {
        state: SlothState.Sleeping,
        transitions: [
            [SlothAction.Wake, SlothState.Idle],
        ]
    }, {
        state: SlothState.Eating,
        transitions: [
            [SlothAction.Sleep, SlothState.Sleeping],
            [SlothAction.Stop, SlothState.Idle],
        ]
    }
);

fsm.start(); // Don't forget

console.log(fsm.current); // You can get current state

// You can check action availability
if (fsm.can(SlothAction.Sleep)) {
    fsm.do(SlothAction.Sleep);
}

// export to console
console.log(fsm.export(PumlWriter.getWriter({autoIndex: AutoIndex.LargeAlphaNumIndex})));
