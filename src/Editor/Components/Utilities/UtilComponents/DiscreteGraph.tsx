import { FC } from "react"
import { AreaChart, XAxis, YAxis, Tooltip, Area, Brush, CartesianGrid } from "recharts"


  export type GraphProps = {
    xKey : string,
    yKey : string,
    data : any,
}

export const GRAPH_COLOR = "#0088FE"; 

export  const DiscreteGraph : FC<GraphProps> = (props) => {

  return (
      <div style={{background: "white"}}>
          <AreaChart
              width={700} height={700} data={props.data}
              margin={{ left: -30 }}
              >
              <defs>
              <linearGradient id="Gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="rgba(0, 136, 254, 0.8)" />
                  <stop offset="95%" stopColor="rgba(0, 136, 254, 0)" />
              </linearGradient>
              </defs>
              <XAxis dataKey={props.xKey}  type="number" domain={['auto', 'auto']}/>
              <YAxis type="number" />
              <Tooltip />
              <Area 
                  type="stepAfter"
                  dataKey={props.yKey}
                  stroke={GRAPH_COLOR}
                  fill={GRAPH_COLOR}
                  fillOpacity={0.2}
                  dot={true}/>

              <Brush  dataKey={props.xKey} startIndex={0}>
                  <AreaChart>
                      <CartesianGrid />
                      <YAxis hide domain={['auto', 'auto']} />
                      <Area dataKey={props.yKey} type="stepAfter" stroke={GRAPH_COLOR} fill={GRAPH_COLOR} dot={false} />
                  </AreaChart>
              </Brush>
          </AreaChart>
      </div>
  )
}