var KEY = {
  ENTER: 13
}

var ROTATE_DELAY = 1000

var App = React.createClass({
  getInitialState: function(){
    return {
      imgSrcInput: '',
    }
  },

  handleImgSrcInputChange: function(event){
    this.setState({ imgSrcInput: event.target.value })
  },

  handleImgSrcInputKeypress: function(event){
    if(event.keyCode === KEY.ENTER){
      this.props.imgSrcs.unshift(event.target.value)
      this.setState({ imgSrcInput: '' })
    }
  },

  render: function(){
    return (
      <div className='app'>
        <input type='text' value={this.state.imgSrcInput} onChange={this.handleImgSrcInputChange} onKeyUp={this.handleImgSrcInputKeypress} />
        <Carousel imgSrcs={this.props.imgSrcs} />
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
    var $imgs = this.state.imgSrcs.map(function(src, i){
      return (
        <li key={src}>
          <img src={src}></img>
        </li>
      )
    })

    return (
      <ul className='carousel'>{$imgs}</ul>
    )
  },
})

var srcs = [
  'http://ia.media-imdb.com/images/M/MV5BODE1MDczNTUxOV5BMl5BanBnXkFtZTcwMTA0NDQyNA@@._V1_SX214_AL_.jpg',
  'http://ia.media-imdb.com/images/M/MV5BNzM4OTcyMjEyNl5BMl5BanBnXkFtZTcwMzEwNDI4OA@@._V1_SX214_AL_.jpg',
  'http://ia.media-imdb.com/images/M/MV5BMTI2ODMzODA0Ml5BMl5BanBnXkFtZTYwNTM3NzY5._V1._CR17,27,308,447_SY317_CR2,0,214,317_AL_.jpg',
  'http://ia.media-imdb.com/images/M/MV5BMTc2MTU4ODI5MF5BMl5BanBnXkFtZTcwODI2MzAyOA@@._V1_SY317_CR7,0,214,317_AL_.jpg',
  'http://ia.media-imdb.com/images/M/MV5BMTcyNzY4NjA2MF5BMl5BanBnXkFtZTcwNTkzNjk0MQ@@._V1_SY317_CR9,0,214,317_AL_.jpg',
]

React.render(
  <App imgSrcs={srcs} />,
  document.getElementById('react-root')
)
