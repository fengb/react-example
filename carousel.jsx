var KEY = {
  ENTER: 13
}

var ROTATE_DELAY = 1000

var App = React.createClass({
  getInitialState: function(){
    return {
      imgSrcs: [],
      imgSrcInput: '',
    }
  },

  handleImgSrcInputChange: function(event){
    this.setState({ imgSrcInput: event.target.value })
  },

  handleImgSrcInputKeypress: function(event){
    if(event.keyCode === KEY.ENTER){
      this.state.imgSrcs.unshift(event.target.value)
      this.setState({ imgSrcInput: '' })
    }
  },

  render: function(){
    return (
      <div className='app'>
        <input type='text' value={this.state.imgSrcInput} onChange={this.handleImgSrcInputChange} onKeyUp={this.handleImgSrcInputKeypress} />
        <Carousel imgSrcs={this.state.imgSrcs} />
      </div>
    )
  },
})

var Carousel = React.createClass({
  getInitialState: function(){
    return {
      centerIndex: 0,
      imgSrcs: this.generateImgSrcs(0, this.props.imgSrcs)
    }
  },

  componentDidMount: function(){
    this.rotateTimer = setInterval(this.rotate, ROTATE_DELAY)
  },

  componentWillUnmount: function(){
    clearInterval(this.rotateTimer)
  },

  componentWillReceiveProps: function(newProps){
    if(newProps.imgSrcs){
      this.setState({
        centerIndex: 0,
        imgSrcs: this.generateImgSrcs(0, newProps.imgSrcs)
      })
      clearInterval(this.rotateTimer)
      this.rotateTimer = setInterval(this.rotate, ROTATE_DELAY)
    }
  },

  rotate: function(){
    var newCenterIndex = this.state.centerIndex + 1
    if(newCenterIndex >= this.props.imgSrcs.length){
      newCenterIndex = 0
    }

    this.setState({
      centerIndex: newCenterIndex,
      imgSrcs: this.generateImgSrcs(this.state.centerIndex, this.props.imgSrcs)
    })
  },

  generateImgSrcs: function(centerIndex, base){
    if(base.length < 1){
      return []
    }

    return [-2, -1, 0, 1, 2].map(function(i){
      var offset = (centerIndex + i + base.length) % base.length
      return base[offset]
    })
  },

  render: function(){
    var $imgs = this.state.imgSrcs.map(function(src){
      return (
        <li>
          <h2>{src}</h2>
          <img src={src}></img>
        </li>
      )
    })

    return (
      <ul className='carousel'>{$imgs}</ul>
    )
  },
})

React.render(
  <App />,
  document.getElementById('react-root')
)
