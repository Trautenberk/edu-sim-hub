import { FC } from "react"
import { AreaChart, XAxis, YAxis, Tooltip, Area, Brush, CartesianGrid, Label, LabelList } from "recharts"


  export type GraphProps = {
    xKey : string,
    xLabel : string,
    yKey : string,
    yLabel: string,
    data : any,
}

export const GRAPH_COLOR = "#0088FE"; 

/**
 * React komponenta pro vykreslení disrétního grafu
 * @param props 
 * @returns 
 */
export  const DiscreteGraph : FC<GraphProps> = (props) => {

  return (
          <AreaChart width={650} height={670} data={props.data}  >
              <defs>
              <linearGradient id="Gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="rgba(0, 136, 254, 0.8)" />
                  <stop offset="95%" stopColor="rgba(0, 136, 254, 0)" />
              </linearGradient>
              </defs>
              <XAxis dataKey={props.xKey} height={40}  type="number" domain={['auto', 'auto']}>
                  <Label value={props.xLabel}  position="insideBottom"  />
              </XAxis>
              <YAxis type="number" width={40}>
                <Label value={props.yLabel}  position="insideLeft"  angle={90} />
              </YAxis>
              <Tooltip />
              <Area 
                  type="stepAfter"
                  dataKey={props.yKey}
                  stroke={GRAPH_COLOR}
                  fill={GRAPH_COLOR}
                  fillOpacity={0.2}
                  dot={true}
                  offset={10}
                />


              <Brush  dataKey={props.xKey} startIndex={0}>
                  <AreaChart>
                      <CartesianGrid />
                      <YAxis hide domain={['auto', 'auto']} />
                      <Area dataKey={props.yKey} type="stepAfter" stroke={GRAPH_COLOR} fill={GRAPH_COLOR} dot={false} />
                  </AreaChart>
              </Brush>
          </AreaChart>
    )
}