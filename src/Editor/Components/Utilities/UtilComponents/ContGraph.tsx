import { FC } from "react"
import { LineChart, XAxis, YAxis, Tooltip, Line, Brush, AreaChart, CartesianGrid, Area } from "recharts"
import { GraphProps, GRAPH_COLOR } from "./DiscreteGraph"

  export const ContGraph : FC<GraphProps> = (props) => {
    return (
          <LineChart
              width={700} height={700} data={props.data}
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <XAxis dataKey={props.xKey}  type="number"  domain={['auto', 'auto']} />
              <YAxis domain={['auto', 'auto']} type="number" />
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
