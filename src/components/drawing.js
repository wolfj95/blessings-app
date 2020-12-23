import React from 'react'
import paper, { Point, Path } from 'paper'

const canvasSize = 400

const pathData = 'm 144.18017,386.91283 c -23.50334,-44.91232 -42.88138,-126.00469 15.94006,-155.4154 7.86724,-3.93362 35.69207,5.97752 41.8426,5.97752 53.27928,0 3.98501,136.9218 3.98501,137.48282 0,2.10028 1.99251,-3.87721 1.99251,-5.97752 0,-16.8486 21.72903,-27.518 29.88757,-43.83509 5.76439,-11.52881 73.49206,-58.24385 93.64772,-17.93255 29.94972,59.89943 -53.77993,101.61776 -87.67021,101.61776 -10.50144,0 29.88756,-0.53891 29.88756,9.96253 0,12.58843 33.87259,31.78669 33.87259,75.71517 0,9.20224 -57.78263,23.71812 -57.78263,-3.98501 0,-17.53453 -21.91757,-65.35466 -21.91757,-47.8201 0,44.43705 2.90146,126.97853 -39.85008,105.60276 -43.56681,-21.7834 -0.96612,-117.55781 13.94753,-117.55781 1.54787,0 -18.30403,22.28904 -19.92507,23.91006 -14.74808,14.74813 -81.37409,15.94005 -117.557775,15.94005 -5.265607,0 -4.554864,-55.79013 35.865095,-55.79013 4.58433,0 51.80514,-1.7076 51.80514,1.99249 0,0.73049 -47.71094,-5.86831 -71.730194,-29.88755 -31.079385,-31.07941 41.647424,-29.48368 63.760144,0 z'

class Drawing extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      drawing: 'scribble',
      onPath: false,
      numPoints: 1000,
      gapPoints: 20,
      currOffset: 0,
      speed: 4,
      direction: 1
    }
    this.paths = {
      line: null,
      boundingCirc: null,
      shape: null
    }
  }

  changeDrawing (props) {
    this.setState({ drawing: props.drawing })
  }

  setupLinePathInCircle ({ numPoints, boundingCircSize }) {
    this.paths.line = new Path()
    this.paths.line.strokeColor = 'black'
    for (let i = 0; i < numPoints; i++) {
      const angleDeg = 360 / numPoints * i
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
    if (this.state.onPath) {
      this.setState({ currOffset: (this.state.currOffset + (this.paths.shape.length / (this.state.numPoints + this.state.gapPoints))) % this.paths.shape.length })
      const nextPoint = this.paths.shape.getPointAt(this.state.currOffset)
      segment.point = nextPoint
      // followPath
    // if the line needs to find the path of the shape
    } else {
      const nearestPoint = this.paths.shape.getNearestPoint(segment.point)
      nearestPoint.selected = true
      let vectToNearestPoint = nearestPoint.subtract(segment.point)
      // if the leading point can move to the path in one step, do so
      if (vectToNearestPoint.length <= this.state.speed) {
        segment.point = segment.point.add(vectToNearestPoint)
        this.setState({ onPath: true })
        this.setState({ currOffset: this.paths.shape.getOffsetOf(nearestPoint) })
      // else, move towards the shape's path
      } else {
        vectToNearestPoint = vectToNearestPoint.normalize().multiply(this.state.speed)
        segment.point = segment.point.add(vectToNearestPoint)
      }
    }
  }

  updateLeadingPoint ({ segment }) {
    // if drawing is set to scribble
    if (this.state.drawing === 'scribble') {
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

    const boundingCircSize = canvasSize / 2 - 50
    this.paths.boundingCirc = new Path.Circle(paper.view.center, boundingCircSize)
    const numPoints = 1000
    this.setupLinePathInCircle({ numPoints: numPoints, boundingCircSize: boundingCircSize })

    this.paths.shape = new Path(pathData)
    this.paths.shape.translate(0, -191.16665)

    paper.view.onFrame = (event) => {
      if (event.count % 3 === 0) {
        for (let i = 0; i < numPoints; i++) {
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
