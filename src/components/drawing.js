import React from 'react'
import paper, { Point, Path } from 'paper'

const canvasSize = 400

class Drawing extends React.Component {
  constructor( props ) {
    super(props)
    this.state = { drawing: 'scribble' }
  }

  changeDrawing( props ) {
    this.setState({ drawing: props.drawing })
  }

  componentDidMount () {
    // paperjs
    paper.setup(this.canvas)
    paper.tools.forEach(tool => tool.remove())

    const boundingCircSize = canvasSize / 2 - 50
    const boundingCirc = new Path.Circle(paper.view.center, boundingCircSize)

    const numPoints = 1000

    const line = new Path()
    line.strokeColor = 'black'
    for (let i = 0; i < numPoints; i++) {
      const angleDeg = 360 / numPoints * i
      const angleRad = angleDeg * (Math.PI / 180)
      const x = boundingCircSize * Math.cos(angleRad)
      const y = boundingCircSize * Math.sin(angleRad)
      line.add(new Point(paper.view.center.x + x, paper.view.center.y + y))
    }

    let direction = 1

    paper.view.onFrame = (event) => {
      if (event.count % 3 === 0) {
        console.log(this.state.drawing)
        for (let i = 0; i < numPoints; i++) {
          const segment = line.segments[i]
          if (i === line.segments.length - 1) {
            const prevSegment = line.segments[i - 2]
            let vector = segment.point.subtract(prevSegment.point)
            const newPoint = segment.point.add(vector)
            if (!boundingCirc.contains(newPoint)) {
              vector.angle += 20 * direction
            } else {
              if (Math.random() < 0.05) {
                direction *= -1
              }
              vector.angle += 2 * direction
            }
            vector = vector.normalize().multiply(4)
            segment.point = segment.point.add(vector)
          } else {
            const nextSegment = line.segments[i + 1]
            segment.point = nextSegment.point
          }
        }
      }
    }
  }

  render () {
    return (
      <canvas
        resize='true'
        style={{ width: canvasSize, height: canvasSize }}
        ref={el => {
          this.canvas = el
        }}
      />
    )
  }
}

export default Drawing
