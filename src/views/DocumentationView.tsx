import styled from "styled-components";

import DocumentComponent from "../components/documentation/DocumentComponent";

import Loading from "../components/generic/Loading";
import Countdown from "../components/timers/Countdown";
import Stopwatch from "../components/timers/Stopwatch";
import Tabata from "../components/timers/Tabata";
import XY from "../components/timers/XY";

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Title = styled.div`
  font-size: 2rem;
`;

/**
 * You can document your components by using the DocumentComponent component
 */
const Documentation = () => {
  return (
    <Container>
      <div>
        <Title>Documentation</Title>
        <DocumentComponent
          title="Loading spinner "
          component={<Loading size="medium" color="#ffa2bf" />}
          propDocs={[
            {
              prop: "size",
              description: "Changes the size of the loading spinner",
              type: "string",
              defaultValue: "medium",
            },
            {
              prop: "color",
              description: "Specifies the color of the loading spinner",
              type: "string",
              defaultValue: `"#ffa2bf"`,
            },
          ]}
        />

        <DocumentComponent
          title="Countdown Timer"
          component={<Countdown />}
          propDocs={[
            {
              prop: "initialTime",
              description: "The time (in seconds) from which the countdown starts",
              type: "number",
              defaultValue: "0",
            },
            {
              prop: "isPaused",
              description: "Controls whether the timer is paused",
              type: "boolean",
              defaultValue: "false",
            },
            {
              prop: "onComplete",
              description: "Callback function when the countdown reaches zero",
              type: "function",
              defaultValue: "undefined",
            },
          ]}
        />

        <DocumentComponent
          title="Stopwatch Timer"
          component={<Stopwatch />}
          propDocs={[
            {
              prop: "startImmediately",
              description: "Starts the stopwatch immediately on render",
              type: "boolean",
              defaultValue: "false",
            },
            {
              prop: "lapInterval",
              description: "Defines intervals for recording laps",
              type: "number",
              defaultValue: "undefined",
            },
            {
              prop: "onStop",
              description: "Callback function when the stopwatch is stopped",
              type: "function",
              defaultValue: "undefined",
            },
          ]}
        />

        <DocumentComponent
          title="Tabata Timer"
          component={<Tabata />}
          propDocs={[
            {
              prop: "workTime",
              description: "Duration of the work phase in seconds",
              type: "number",
              defaultValue: "20",
            },
            {
              prop: "restTime",
              description: "Duration of the rest phase in seconds",
              type: "number",
              defaultValue: "10",
            },
            {
              prop: "rounds",
              description: "Total number of work/rest cycles",
              type: "number",
              defaultValue: "8",
            },
            {
              prop: "onComplete",
              description: "Callback function when all rounds are completed",
              type: "function",
              defaultValue: "undefined",
            },
          ]}
        />

        <DocumentComponent
          title="XY Timer"
          component={<XY />}
          propDocs={[
            {
              prop: "roundDuration",
              description: "Time for each round in seconds",
              type: "number",
              defaultValue: "60",
            },
            {
              prop: "rounds",
              description: "Total number of rounds",
              type: "number",
              defaultValue: "5",
            },
            {
              prop: "onRoundComplete",
              description: "Callback function called at the end of each round",
              type: "function",
              defaultValue: "undefined",
            },
            {
              prop: "onComplete",
              description: "Callback function when all rounds are completed",
              type: "function",
              defaultValue: "undefined",
            },
          ]}
        />

      </div>
    </Container>
  );
};

export default Documentation;
