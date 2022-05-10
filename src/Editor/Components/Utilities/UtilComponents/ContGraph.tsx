import { FC } from "react"
import { LineChart, XAxis, YAxis, Tooltip, Line, Brush, AreaChart, CartesianGrid, Area, Label } from "recharts"
import { GraphProps, GRAPH_COLOR } from "./DiscreteGraph"

/**
 * React komponenta pro vykreslení spojitého grafu
 * @param props 
 * @returns  React komponenta
 */
  export const ContGraph : FC<GraphProps> = (props) => {
    return (
          <LineChart
              width={650} height={670} data={props.data}>
              <XAxis dataKey={props.xKey}  type="number" height={40} domain={['auto', 'auto']} >
                  <Label value={props.xLabel}  position="insideBottom"  />
              </XAxis>
              <YAxis domain={['auto', 'auto']} type="number" width={60} >
                  <Label value={props.yLabel}  position="insideLeft"  angle={90} />
              </YAxis>
              <Tooltip />
              <Line type="linear" dataKey={props.yKey} stroke={GRAPH_COLOR} dot={false} />
              <Brush dataKey={props.xKey} type="number" startIndex={0} >
                  <AreaChart>
                      <CartesianGrid />
                      <YAxis hide domain={['auto', 'auto']} />
                      <Area dataKey={props.yKey} stroke={GRAPH_COLOR} fill={GRAPH_COLOR} dot={false} />
                  </AreaChart>
              </Brush>
          </LineChart>
    )
}
