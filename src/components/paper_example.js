import React from 'react'
import paper, { Path, Tool } from 'paper'

class PaperExample extends React.Component {
  componentDidMount () {
    // paperjs
    paper.setup(this.canvas)
    paper.tools.forEach(tool => tool.remove())

    // Add simple circle to canvas
    const path = new Path.Circle({
      center: [80, 50],
      radius: 35,
      fillColor: 'red'
    })

    // Mouse interaction
    const myPath = new Path()
    myPath.strokeColor = 'black'

    // Create a simple drawing tool:
    const tool = new Tool()

    // Define a mousedown and mousedrag handler
    tool.onMouseDown = event => {
      console.log('click')
      myPath.add(event.point)
    }

    // Simple frame-based animation
    const rect = new Path.Rectangle({
      point: [75, 75],
      size: [75, 75],
      fillColor: 'red'
    })

    paper.view.onFrame = () => {
      // loop
      rect.rotate(3)
      rect.fillColor.hue += 1
    }
  }

  render () {
    return (
      <canvas
        resize='true'
        style={{ width: '100%', height: '100%' }}
        ref={el => {
          this.canvas = el
        }}
      />
    )
  }
}

export default PaperExample
