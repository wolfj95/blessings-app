import React from 'react'
import paper, { Point, Path } from 'paper'

const canvasSize = 400


class Drawing extends React.Component {
  constructor (props) {
    console.log(props)
    super(props)
    this.state = {
      drawingNum: -1,
      onPath: false,
      numPoints: 500,
      gapPoints: 10,
      currOffset: 0,
      speed: 4,
      direction: 1,
      drawingData: props.drawingData
    }
    this.paths = {
      line: null,
      boundingCirc: null,
      drawings: []
    }
  }

  changeDrawing (props) {
    this.setState({ drawingNum: props.drawing })
    this.setState({ onPath: false })
  }

  setupLinePathInCircle ({ boundingCircSize }) {
    this.paths.line = new Path()
    this.paths.line.strokeColor = 'black'
    for (let i = 0; i < this.state.numPoints; i++) {
      const angleDeg = 360 / this.state.numPoints * i
      const angleRad = angleDeg * (Math.PI / 180)
      const x = boundingCircSize * Math.cos(angleRad)
      const y = boundingCircSize * Math.sin(angleRad)
      this.paths.line.add(new Point(paper.view.center.x + x, paper.view.center.y + y))
    }
  }

  drawScribble ({ segment }) {
    this.setState({ onPath: false })
    const prevSegment = this.paths.line.segments[this.paths.line.segments.length - 3]
    let vector = segment.point.subtract(prevSegment.point)
    const newPoint = segment.point.add(vector)
    if (!this.paths.boundingCirc.contains(newPoint)) {
      vector.angle += 20 * this.state.direction
    } else {
      if (Math.random() < 0.05) {
        this.setState({ direction: this.state.direction * -1 })
      }
      vector.angle += 2 * this.state.direction
    }
    vector = vector.normalize().multiply(this.state.speed)
    segment.point = segment.point.add(vector)
  }

  followPathOfShape ({ segment }) {
    // if the line is already following the path of the shape
    const currDrawing = this.paths.drawings[this.state.drawingNum]
    if (this.state.onPath) {
      // followPath
      this.setState({ currOffset: (this.state.currOffset + (currDrawing.length / (this.state.numPoints + this.state.gapPoints))) % currDrawing.length })
      const nextPoint = currDrawing.getPointAt(this.state.currOffset)
      segment.point = nextPoint
    // if the line needs to find the path of the shape
    } else {
      console.log(currDrawing)
      console.log(segment)
      const nearestPoint = currDrawing.getNearestPoint(segment.point)
      let vectToNearestPoint = nearestPoint.subtract(segment.point)
      // if the leading point can move to the path in one step, do so
      if (vectToNearestPoint.length <= this.state.speed) {
        segment.point = segment.point.add(vectToNearestPoint)
        this.setState({ onPath: true })
        this.setState({ currOffset: currDrawing.getOffsetOf(nearestPoint) })
      // else, move towards the shape's path
      } else {
        vectToNearestPoint = vectToNearestPoint.normalize().multiply(this.state.speed)
        segment.point = segment.point.add(vectToNearestPoint)
      }
    }
  }

  updateLeadingPoint ({ segment }) {
    // if drawing is set to scribble
    if (this.state.drawingNum < 0 || this.state.drawingNum >= this.paths.drawings.length) {
      this.drawScribble({ segment: segment })
    // else if drawing is set to a shape
    } else {
      this.followPathOfShape({ segment: segment })
    }
  }

  componentDidMount () {
    // paperjs
    paper.setup(this.canvas)
    paper.tools.forEach(tool => tool.remove())

    // setup bounding circle
    const boundingCircSize = canvasSize / 2 - 50
    this.paths.boundingCirc = new Path.Circle(paper.view.center, boundingCircSize)

    // setup drawings
    for (let i = 0; i < this.state.drawingData.length; i++) {
      const drawing = new Path(this.state.drawingData[i].path)
      console.log(this.state.drawingData[i].translation)
      const translation = new Point(this.state.drawingData[i].translation.x, this.state.drawingData[i].translation.y)
      drawing.translate(translation)
      this.paths.drawings.push(drawing)
    }

    // setup line
    this.setupLinePathInCircle({ boundingCircSize: boundingCircSize })


    paper.view.onFrame = (event) => {
      if (event.count % 3 === 0) {
        for (let i = 0; i < this.state.numPoints; i++) {
          const segment = this.paths.line.segments[i]
          // if leading point in path
          if (i === this.paths.line.segments.length - 1) {
            this.updateLeadingPoint({ segment: segment })
          } else {
            const nextSegment = this.paths.line.segments[i + 1]
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
